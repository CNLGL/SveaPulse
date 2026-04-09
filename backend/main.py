from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, database, crud

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="SveaPulse Backend")

@app.post("/submit")
def submit_pulse(dept_id: int, wellbeing: int, stress: int, db: Session = Depends(database.get_db)):
    return crud.create_response(db, dept_id, wellbeing, stress)

@app.get("/pulse/{dept_id}")
def read_pulse(dept_id: int, db: Session = Depends(database.get_db)):
    return crud.get_department_pulse(db, dept_id)

@app.get("/seed")
def seed_data(db: Session = Depends(database.get_db)):
    # Test için Varberg departmanlarını ekleyelim
    depts = ["Socialförvaltningen", "Kultur- och fritid", "Hamn- och gata"]
    for d in depts:
        if not db.query(models.Department).filter(models.Department.name == d).first():
            db.add(models.Department(name=d))
    db.commit()
    return {"message": "Departments seeded!"}
