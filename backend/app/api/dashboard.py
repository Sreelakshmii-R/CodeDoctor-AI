import re

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database.dependencies import get_db


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    # Total repositories
    repositories = db.execute(
        text("""
            SELECT COUNT(*)
            FROM repositories
        """)
    ).scalar() or 0


    # Total actual AI analyses
    analyses = db.execute(
        text("""
            SELECT COUNT(*)
            FROM analyses
        """)
    ).scalar() or 0


    # Get the latest analysis for each repository
    latest_analyses = db.execute(
        text("""
            SELECT DISTINCT ON (repository_id)
                repository_id,
                report,
                created_at
            FROM analyses
            ORDER BY repository_id, created_at DESC
        """)
    ).fetchall()


    scores = []
    issues = 0


    for analysis in latest_analyses:

        report = analysis.report or ""


        # Extract overall AI score
        score_match = re.search(
            r"score of (\d+) out of 100",
            report,
            re.IGNORECASE
        )


        if score_match:
            scores.append(
                int(score_match.group(1))
            )


        # Count numbered findings in the
        # Bugs & Potential Errors section
        bugs_match = re.search(
            r"# Bugs & Potential Errors(.*?)(?=# Security Vulnerabilities|# Performance Issues|# Code Quality Review|# Best Practice Suggestions|# Overall Score|$)",
            report,
            re.IGNORECASE | re.DOTALL
        )


        if bugs_match:

            bugs_section = bugs_match.group(1)

            issues += len(
                re.findall(
                    r"^\s*\d+\.",
                    bugs_section,
                    re.MULTILINE
                )
            )


        # Count numbered findings in the
        # Security Vulnerabilities section
        security_match = re.search(
            r"# Security Vulnerabilities(.*?)(?=# Performance Issues|# Code Quality Review|# Best Practice Suggestions|# Overall Score|$)",
            report,
            re.IGNORECASE | re.DOTALL
        )


        if security_match:

            security_section = security_match.group(1)

            issues += len(
                re.findall(
                    r"^\s*\d+\.",
                    security_section,
                    re.MULTILINE
                )
            )


    # Average latest AI score
    if scores:
        security_score = round(
            sum(scores) / len(scores)
        )
    else:
        security_score = 0


    return {
        "repositories": repositories,
        "analyses": analyses,
        "issues": issues,
        "security_score": security_score
    }

@router.get("/activity")
def get_recent_activity(db: Session = Depends(get_db)):

    activities = db.execute(
        text("""
            SELECT DISTINCT ON (repositories.id)
                repositories.name,
                analyses.report,
                analyses.created_at
            FROM analyses
            JOIN repositories
            ON analyses.repository_id = repositories.id
            ORDER BY repositories.id, analyses.created_at DESC;
        """)
    ).fetchall()


    result = []

    for activity in activities:

        result.append({
            "repository": activity.name,
            "message": "Repository analysis completed successfully.",
            "created_at": activity.created_at
        })


    return result




@router.get("/insights")
def get_ai_insights(db: Session = Depends(get_db)):

    analyses = db.execute(
        text("""
        SELECT DISTINCT ON (repositories.id)
            repositories.name,
            analyses.report,
            analyses.created_at
        FROM analyses
        JOIN repositories
            ON analyses.repository_id = repositories.id
        ORDER BY repositories.id, analyses.created_at DESC
            """)
        ).fetchall()
        
    insights = []


    for analysis in analyses:

        report = analysis.report


        score = None


        match = re.search(
            r"score of (\d+) out of 100",
            report,
            re.IGNORECASE
        )


        if match:
            score = int(match.group(1))


        if score is not None:

            if score < 50:

                message = (
                    f"{analysis.name} needs code quality improvements. "
                    f"AI score: {score}/100."
                )

            elif score < 80:

                message = (
                    f"{analysis.name} has moderate code quality. "
                    f"AI score: {score}/100."
                )

            else:

                message = (
                    f"{analysis.name} has excellent code quality. "
                    f"AI score: {score}/100."
                )

        else:

            message = (
                f"{analysis.name} analysis completed successfully."
            )


        insights.append({
            "message": message
        })


    return insights