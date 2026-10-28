from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator

class FacilityCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    category: str = Field(min_length=2, max_length=80)
    location: str | None = Field(default=None, max_length=200)
    description: str | None = Field(default=None, max_length=2000)
    image_url: str | None = Field(default=None, max_length=500)

class FacilityOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    category: str
    location: str | None
    description: str | None
    image_url: str | None
    average_rating: float
    review_count: int

class ReviewCreate(BaseModel):
    rating: int = Field(ge=1, le=5)
    title: str | None = Field(default=None, max_length=120)
    comment: str = Field(min_length=3, max_length=2000)
    display_name: str = Field(default="Anonymous", min_length=1, max_length=60)

    @field_validator("comment")
    @classmethod
    def comment_not_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Comment cannot be blank.")
        return value

    @field_validator("display_name")
    @classmethod
    def clean_name(cls, value: str) -> str:
        return value.strip() or "Anonymous"

class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    facility_id: int
    rating: int
    title: str | None
    comment: str
    display_name: str
    created_at: datetime

class ReviewReportCreate(BaseModel):
    reason: str = Field(min_length=3, max_length=300)

class MessageOut(BaseModel):
    message: str
