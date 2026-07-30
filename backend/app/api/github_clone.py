from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.repository import Repository
from app.services.git_clone import clone_repository


router = APIRouter(
    prefix="/github",
    tags=["GitHub"]
)


@router.post("/clone")
def clone(
    repo_url: str,
    db: Session = Depends(get_db)
):

    print("Received:", repr(repo_url))

    path = clone_repository(repo_url)

    repository = (
        db.query(Repository)
        .filter(Repository.github_url == repo_url)
        .first()
    )

    print("Repository found:", repository)

    if repository:
        repository.local_path = path
        db.commit()
        db.refresh(repository)

    return {
        "message": "Repository cloned successfully!",
        "path": path
    }