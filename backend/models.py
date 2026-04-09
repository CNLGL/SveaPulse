from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from database import Base

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class SurveyRespose(Base):
    __tablename__ = "survey_responses"
    id = Column(Integer, primary_key=True, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    wellbeing_score = Column(Integer)
    stress_score = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
