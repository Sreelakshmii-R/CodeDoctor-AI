from fastapi import APIRouter, HTTPException

from app.services.github import get_repository_details

router = APIRouter(prefix="/github", tags=["GitHub"])


@router.get("/{owner}/{repo}")
def fetch_repository(owner: str, repo: str):
    data = get_repository_details(owner, repo)

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )

    return {
        "name": data["name"],
        "owner": data["owner"]["login"],
        "description": data["description"],
        "language": data["language"],
        "stars": data["stargazers_count"],
        "forks": data["forks_count"],
        "default_branch": data["default_branch"],
    }