from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Dict, Any, List
import models, database, crud

# Veritabanı tablolarını otomatik oluştur/güncelle
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="SveaPulse Admin Backend")

# CORS AYARLARI (Dashboard ve Formun bağlanabilmesi için şart)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. VERİ GÖNDERME (Anket Formu Burayı Kullanır) ---
@app.post("/submit-survey")
async def receive_survey(data: Dict[Any, Any], db: Session = Depends(database.get_db)):
    # crud.py içindeki yeni yazacağımız fonksiyonu çağırır
    result = crud.save_survey_response(db, data)
    return {
        "status": "success",
        "message": "Data saved for analysis!",
        "db_id": result.id
    }

# --- 2. VERİ ÇEKME (Dashboard Burayı Kullanacak) ---
@app.get("/admin/responses")
def get_responses(db: Session = Depends(database.get_db)):
    # Veritabanındaki tüm anket yanıtlarını listeler
    return crud.get_all_responses(db)

# --- 3. TEST VE SEED (Opsiyonel) ---
@app.get("/")
def health_check():
    return {"status": "SveaPulse Backend is Online"}
