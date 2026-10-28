import os
from contextlib import asynccontextmanager
from statistics import mean
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from .models import Facility, Review, ReviewReport
from .schemas import FacilityCreate, FacilityOut, MessageOut, ReviewCreate, ReviewOut, ReviewReportCreate

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="RateIt API", description="API for rating university campus facilities and services.", version="0.1.0", lifespan=lifespan)
origins = [x.strip() for x in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET", "POST", "OPTIONS"], allow_headers=["*"])

def facility_out(db: Session, facility: Facility) -> FacilityOut:
    ratings = db.execute(select(Review.rating).where(Review.facility_id == facility.id, Review.is_visible.is_(True))).scalars().all()
    return FacilityOut(id=facility.id, name=facility.name, category=facility.category, location=facility.location, description=facility.description, image_url=facility.image_url, average_rating=round(mean(ratings), 1) if ratings else 0.0, review_count=len(ratings))

@app.get("/api/health", response_model=MessageOut, tags=["System"])
def health():
    return {"message": "RateIt API is running."}

@app.get("/api/facilities", response_model=list[FacilityOut], tags=["Facilities"])
def list_facilities(search: str | None = Query(None, max_length=100), category: str | None = Query(None, max_length=80), sort: str = Query("name", pattern="^(name|rating|reviews)$"), db: Session = Depends(get_db)):
    stmt = select(Facility).where(Facility.is_active.is_(True))
    if search:
        stmt = stmt.where(Facility.name.ilike(f"%{search.strip()}%"))
    if category and category.lower() != "all":
        stmt = stmt.where(Facility.category.ilike(category.strip()))
    rows = db.execute(stmt).scalars().all()
    result = [facility_out(db, f) for f in rows]
    if sort == "rating":
        result.sort(key=lambda x: (x.average_rating, x.review_count), reverse=True)
    elif sort == "reviews":
        result.sort(key=lambda x: x.review_count, reverse=True)
    else:
        result.sort(key=lambda x: x.name.lower())
    return result

@app.get("/api/facilities/{facility_id}", response_model=FacilityOut, tags=["Facilities"])
def get_facility(facility_id: int, db: Session = Depends(get_db)):
    f = db.get(Facility, facility_id)
    if not f or not f.is_active:
        raise HTTPException(404, "Facility not found.")
    return facility_out(db, f)

@app.post("/api/facilities", response_model=FacilityOut, status_code=201, tags=["Facilities"])
def create_facility(payload: FacilityCreate, db: Session = Depends(get_db)):
    # Development/demo endpoint: protect with admin authentication before public deployment.
    f = Facility(**payload.model_dump())
    db.add(f); db.commit(); db.refresh(f)
    return facility_out(db, f)

@app.get("/api/facilities/{facility_id}/reviews", response_model=list[ReviewOut], tags=["Reviews"])
def list_reviews(facility_id: int, limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), db: Session = Depends(get_db)):
    f = db.get(Facility, facility_id)
    if not f or not f.is_active:
        raise HTTPException(404, "Facility not found.")
    stmt = select(Review).where(Review.facility_id == facility_id, Review.is_visible.is_(True)).order_by(Review.created_at.desc()).offset(offset).limit(limit)
    return db.execute(stmt).scalars().all()

@app.post("/api/facilities/{facility_id}/reviews", response_model=ReviewOut, status_code=201, tags=["Reviews"])
def create_review(facility_id: int, payload: ReviewCreate, db: Session = Depends(get_db)):
    f = db.get(Facility, facility_id)
    if not f or not f.is_active:
        raise HTTPException(404, "Facility not found.")
    review = Review(facility_id=facility_id, **payload.model_dump())
    db.add(review); db.commit(); db.refresh(review)
    return review

@app.post("/api/reviews/{review_id}/reports", response_model=MessageOut, status_code=201, tags=["Moderation"])
def report_review(review_id: int, payload: ReviewReportCreate, db: Session = Depends(get_db)):
    review = db.get(Review, review_id)
    if not review or not review.is_visible:
        raise HTTPException(404, "Review not found.")
    db.add(ReviewReport(review_id=review_id, reason=payload.reason.strip()))
    db.commit()
    return {"message": "Report submitted for moderation."}
