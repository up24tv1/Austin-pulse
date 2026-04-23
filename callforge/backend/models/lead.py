from pydantic import BaseModel, Field


class Lead(BaseModel):
    from_number: str = Field(default="")
    name: str = Field(default="")
    issue: str = Field(default="")
    zip_code: str = Field(default="")
    urgency: str = Field(default="unknown")
    raw_text: str = Field(default="")
