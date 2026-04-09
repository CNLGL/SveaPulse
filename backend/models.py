from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from database import Base

class SurveyResponse(Base):
    __tablename__ = "survey_responses"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String)  # Filtreleme için önemli
    department = Column(String)  # Filtreleme için önemli
    # Tüm q1, q2... cevaplarını buraya paketleyeceğiz:
    answers = Column(JSON) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
