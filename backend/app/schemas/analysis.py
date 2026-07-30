from datetime import datetime
from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    id: int
    repository_id: int
    report: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }