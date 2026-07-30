from __future__ import annotations

from typing import List, TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


if TYPE_CHECKING:
    from app.models.analysis import Analysis


class Repository(Base):
    __tablename__ = "repositories"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(255)
    )

    github_url: Mapped[str] = mapped_column(
        String(500),
        unique=True,
        nullable=False
    )

    language: Mapped[str] = mapped_column(
        String(100)
    )

    local_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    analyses: Mapped[List["Analysis"]] = relationship(
        "Analysis",
        back_populates="repository",
        cascade="all, delete-orphan"
    )