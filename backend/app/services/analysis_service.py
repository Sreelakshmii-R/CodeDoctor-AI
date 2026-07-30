from sqlalchemy.orm import Session

from app.models.analysis import Analysis
from app.services.file_reader import read_repository
from app.services.groq_service import analyze_code


def analyze_repository(
    repository,
    db: Session
):
    files = read_repository(repository.local_path)

    if not files:
        return {
            "error": "No supported source files found"
        }

    report = analyze_code(files)

    analysis = Analysis(
        repository_id=repository.id,
        report=report
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "analysis_id": analysis.id,
        "repository": repository.name,
        "files_analyzed": len(files),
        "report": report
    }