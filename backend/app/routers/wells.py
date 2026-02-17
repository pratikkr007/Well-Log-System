from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_

from ..database import SessionLocal
from ..models import Measurement

router = APIRouter(prefix="/wells", tags=["Wells"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 Get all curve names dynamically
@router.get("/curves")
def get_curves(
    well_id: int,
    db: Session = Depends(get_db)
):
    curves = db.query(Measurement.curve_name).filter(
        Measurement.well_id == well_id
    ).distinct().all()

    return {
        "curves": [c[0] for c in curves]
    }


# 🔥 Get curve data for plotting
@router.get("/data")
def get_curve_data(
    well_id: int,
    curve: str,
    min_depth: float,
    max_depth: float,
    db: Session = Depends(get_db)
):

    results = db.query(Measurement).filter(
        and_(
            Measurement.well_id == well_id,
            Measurement.curve_name == curve,
            Measurement.depth >= min_depth,
            Measurement.depth <= max_depth
        )
    ).order_by(Measurement.depth.asc()).all()

    return {
        "depth": [float(r.depth) for r in results],
        "values": [float(r.value) for r in results]
    }
