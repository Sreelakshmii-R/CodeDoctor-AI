from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.analysis import Analysis
from app.models.repository import Repository
from app.services.file_reader import read_repository
from app.services.groq_service import analyze_code

router = APIRouter(
    prefix="/analyze",
    tags=["Analysis"]
)


@router.post("/")
def analyze_repository(
    repository_id: int,
    db: Session = Depends(get_db)
):
    repository = (
        db.query(Repository)
        .filter(Repository.id == repository_id)
        .first()
    )

    if not repository:
        return {"error": "Repository not found"}

    files = read_repository(repository.local_path)

    if not files:
        return {"error": "No supported source files found."}

    result = analyze_code(files)

    analysis = Analysis(
        repository_id=repository.id,
        report=result
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "message": "Analysis completed successfully!",
        "analysis_id": analysis.id,
        "report": result
    }