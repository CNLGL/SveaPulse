from sqlalchemy.orm import Session
import models

def save_survey_response(db: Session, data: dict):
    # Gelen datadan rol ve departmanı ayırıyoruz, geri kalanı 'answers' içine atıyoruz
    role = data.get("role", "Unknown")
    dept = data.get("department", "Unknown")
    
    # answers içinden role ve dept'i çıkaralım ki sadece sorular kalsın
    answers_only = {k: v for k, v in data.items() if k not in ["role", "department"]}
    
    new_response = models.SurveyResponse(
        role=role,
        department=dept,
        answers=answers_only
    )
    
    db.add(new_response)
    db.commit()
    db.refresh(new_response)
    return new_response

# Dashboard için tüm verileri çeken fonksiyon
def get_all_responses(db: Session):
    return db.query(models.SurveyResponse).all()
