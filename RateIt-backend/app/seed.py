from sqlalchemy import select

from .database import Base, SessionLocal, engine
from .models import Facility


SAMPLES = [
    {
        "name": "Campus Cafeteria (West)",
        "category": "Food & Dining",
        "location": "NJUPT West Campus",
        "description": "Campus dining and meal options.",
    },
    {
        "name": "Library (Main Building)",
        "category": "Study Spaces",
        "location": "NJUPT Main Campus",
        "description": "Study spaces and library resources.",
    },
    {
        "name": "Campus Gym",
        "category": "Sports & Fitness",
        "location": "NJUPT East Campus",
        "description": "Indoor sports and exercise facilities.",
    },
    {
        "name": "Student Dormitory (Building 1)",
        "category": "Dormitories",
        "location": "NJUPT Dorm Area",
        "description": "Student housing and shared facilities.",
    },
    {
        "name": "Campus Printing Shop",
        "category": "Convenience",
        "location": "NJUPT Main Campus",
        "description": "Printing and document services for students.",
    },
    {
        "name": "Campus Shuttle Bus",
        "category": "Campus Services",
        "location": "Campus-wide",
        "description": "Transportation services around campus.",
    },
    {
        "name": "Campus Café 66",
        "category": "Food & Dining",
        "location": "NJUPT Main Campus",
        "description": "A campus cafe for drinks, snacks, and study breaks.",
    },
    {
        "name": "Outdoor Basketball Court",
        "category": "Sports & Fitness",
        "location": "NJUPT Sports Area",
        "description": "Outdoor basketball facilities for students.",
    },
]

OLD_DEMO_NAMES = {
    "University Library",
    "Campus Canteen",
    "Sports Center",
    "Campus Wi-Fi",
    "Student Dormitories",
}


def main():
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        # Hide the original generic demo facilities without deleting them.
        old_facilities = db.execute(
            select(Facility).where(Facility.name.in_(OLD_DEMO_NAMES))
        ).scalars().all()

        for facility in old_facilities:
            facility.is_active = False

        # Insert missing facilities or update their basic details.
        for item in SAMPLES:
            facility = db.execute(
                select(Facility).where(Facility.name == item["name"])
            ).scalar_one_or_none()

            if facility is None:
                db.add(Facility(**item))
            else:
                facility.category = item["category"]
                facility.location = item["location"]
                facility.description = item["description"]
                facility.is_active = True

        db.commit()

    print("RateIt facilities synchronized successfully.")


if __name__ == "__main__":
    main()