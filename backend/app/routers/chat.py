from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
import numpy as np

from ..database import SessionLocal
from ..models import Measurement
from ..services.chat_service import ask_chatbot

router = APIRouter(prefix="/chat", tags=["Chatbot"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/ask")
def chat_with_well(
    well_id: int,
    curve: str,
    min_depth: float,
    max_depth: float,
    question: str,
    db: Session = Depends(get_db),
):
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

    summary = {
        "mean": float(np.mean(arr)),
        "std": float(np.std(arr)),
        "min": float(np.min(arr)),
        "max": float(np.max(arr)),
        "count": len(values)
    }

    response = ask_chatbot(summary, question)

    return {
        "question": question,
        "answer": response
    }
