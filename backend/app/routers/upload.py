from fastapi import APIRouter, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import math

from ..database import SessionLocal
from ..models import Well, Measurement
from ..services.s3_service import upload_file
from ..services.las_parser import parse_las

router = APIRouter()


# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload")
async def upload_las(file: UploadFile, db: Session = Depends(get_db)):

    # Validate file type
    if not file.filename.endswith(".las"):
        raise HTTPException(status_code=400, detail="Only .las files are allowed")

    temp_path = f"temp_{file.filename}"

    # Save temporarily
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Upload to S3 (optional if configured)
        s3_url = upload_file(open(temp_path, "rb"), file.filename)

        # Save well info
        well = Well(name=file.filename, s3_url=s3_url)
        db.add(well)
        db.commit()
        db.refresh(well)

        # Parse LAS file
        df, curves = parse_las(temp_path)

        measurements = []

        for _, row in df.iterrows():

            depth_value = row["depth"]

            # Convert numpy to Python float
            if hasattr(depth_value, "item"):
                depth_value = depth_value.item()

            if depth_value is None or (isinstance(depth_value, float) and math.isnan(depth_value)):
                continue

            for curve in curves:

                curve_value = row[curve]

                if hasattr(curve_value, "item"):
                    curve_value = curve_value.item()

                # Skip NaN values
                if curve_value is None or (isinstance(curve_value, float) and math.isnan(curve_value)):
                    continue

                measurements.append(
                    Measurement(
                        well_id=well.id,
                        curve_name=curve,
                        depth=float(depth_value),
                        value=float(curve_value)
                    )
                )

        # Bulk insert (faster than db.add inside loop)
        db.bulk_save_objects(measurements)
        db.commit()

    finally:
        # Clean temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

    return {
        "well_id": well.id,
        "curves": curves
    }
