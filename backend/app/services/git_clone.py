import os

from git import Repo


def clone_repository(repo_url: str):
    repo_name = repo_url.rstrip("/").split("/")[-1]

    clone_path = os.path.join("repositories", repo_name)

    # Clone only if the repository doesn't already exist
    if not os.path.exists(clone_path):
        Repo.clone_from(repo_url, clone_path)

    return clone_path