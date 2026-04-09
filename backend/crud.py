from sqlalchemy.orm import Session
import models

def create_response(db: Session, dept_id: int, wellbeing: int, stress: int):
    bd_response = model.SurveyResponse(
        departmen_id=dept_id,
        wellbeing_score=wellbeing,
        stress_score=stress
            )
    db.add(db_response)
    db.commit()
    db.refresh(db.response)
    return db.response

def get_department_pulse(db: Session, dept_id: int):
    response = db.query(models.SurveyResponse).filter(models.SurveyResponse.department_id == dept_id).all()
    count = len(responses)

    #Gizlilik
    THRESHOLD = 8

    if count < THRESHOLD:
        return {
                "status": "Incomplete",
                "message": f"Sekretessgrängs ej nådd. Minst {TRESHHOLD} svar krävs."
                }

        avg_wellbeing = sum(r.wellbeing for r in response) / count
        avg_stress = sum(r.stress_score for r in response) / count

        return {
                "status": "Success",
                "avg_wellbeing": round(avg_wellbeing, 1),
                "count": count
                }
