from sqlalchemy import Column, Integer, String, Float, ForeignKey
from .database import Base


class Well(Base):
    __tablename__ = "wells"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    s3_url = Column(String)


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(Integer)
    curve_name = Column(String)
    depth = Column(Float)
    value = Column(Float)
