from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
import numpy as np

from ..database import SessionLocal
from ..models import Measurement
from ..services.ai_service import analyze_curve as ai_analyze

router = APIRouter(prefix="/analysis", tags=["Analysis"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/ai-analysis")
def analyze_curve_ai(
    well_id: int,
    curve: str,
    min_depth: float,
    max_depth: float,
    db: Session = Depends(get_db),
):
    # Query data
    rows = db.query(Measurement.value).filter(
        and_(
            Measurement.well_id == well_id,
            Measurement.curve_name == curve,
            Measurement.depth >= min_depth,
            Measurement.depth <= max_depth,
        )
    ).all()

    if not rows:
        raise HTTPException(status_code=404, detail="No data found.")

    values = [r[0] for r in rows]
    arr = np.array(values)

    # Basic statistics
    mean_val = float(np.mean(arr))
    std_val = float(np.std(arr))
    min_val = float(np.min(arr))
    max_val = float(np.max(arr))

    # Anomaly detection
    z_scores = (arr - mean_val) / (std_val if std_val != 0 else 1)
    anomalies = np.where(np.abs(z_scores) > 2)[0]

    # 🔥 Call OpenAI AI service
    ai_result = ai_analyze(None, values)

    return {
        "well_id": well_id,
        "curve": curve,
        "depth_range": {
            "min": min_depth,
            "max": max_depth
        },
        "statistics": {
            "mean": mean_val,
            "std": std_val,
            "min": min_val,
            "max": max_val
        },
        "anomaly_count": int(len(anomalies)),
        "interpretation": ai_result["interpretation"]
    }
