from fastapi import FastAPI
from app.routes import upload, validate

app = FastAPI()

app.include_router(upload.router)
app.include_router(validate.router)

@app.get("/")
def home():
    return {"message": "Backend running successfully"}