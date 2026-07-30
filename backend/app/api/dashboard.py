import re

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database.dependencies import get_db


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/db-test")
def db_test(db: Session = Depends(get_db)):

    try:
        repository_count = db.execute(
            text("SELECT COUNT(*) FROM public.repositories")
        ).scalar()

        analysis_count = db.execute(
            text("SELECT COUNT(*) FROM public.analyses")
        ).scalar()

        return {
            "status": "ok",
            "repositories": repository_count,
            "analyses": analysis_count
        }

    except Exception as error:
        import traceback

        traceback.print_exc()

        return {
            "status": "error",
            "error": str(error)
        }

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    try:
        repositories = db.execute(
            text("""
                SELECT COUNT(*)
                FROM public.repositories
            """)
        ).scalar() or 0

        analyses = db.execute(
            text("""
                SELECT COUNT(*)
                FROM public.analyses
            """)
        ).scalar() or 0

        latest_analyses = db.execute(
            text("""
                SELECT DISTINCT ON (repository_id)
                    repository_id,
                    report,
                    created_at
                FROM public.analyses
                ORDER BY repository_id, created_at DESC
            """)
        ).fetchall()

        scores = []
        issues = 0

        for analysis in latest_analyses:

            report = analysis.report or ""

            score_match = re.search(
                r"score of (\d+) out of 100",
                report,
                re.IGNORECASE
            )

            if score_match:
                scores.append(int(score_match.group(1)))

            bugs_match = re.search(
                r"# Bugs & Potential Errors(.*?)(?=# Security Vulnerabilities|# Performance Issues|# Code Quality Review|# Best Practice Suggestions|# Overall Score|$)",
                report,
                re.IGNORECASE | re.DOTALL
            )

            if bugs_match:
                issues += len(
                    re.findall(
                        r"^\s*\d+\.",
                        bugs_match.group(1),
                        re.MULTILINE
                    )
                )

            security_match = re.search(
                r"# Security Vulnerabilities(.*?)(?=# Performance Issues|# Code Quality Review|# Best Practice Suggestions|# Overall Score|$)",
                report,
                re.IGNORECASE | re.DOTALL
            )

            if security_match:
                issues += len(
                    re.findall(
                        r"^\s*\d+\.",
                        security_match.group(1),
                        re.MULTILINE
                    )
                )

        security_score = (
            round(sum(scores) / len(scores))
            if scores
            else 0
        )

        return {
            "repositories": repositories,
            "analyses": analyses,
            "issues": issues,
            "security_score": security_score
        }

    except Exception as error:
        import traceback

        print("DASHBOARD STATS ERROR:")
        traceback.print_exc()

        raise error

    
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