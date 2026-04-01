from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.pdf_parser import extract_text
from app.services.requirement_extractor import extract_requirements

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-rfp")
async def upload_rfp(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)

    requirements = extract_requirements(text)

    return {
        "requirements": requirements
    }


@router.post("/upload-proposal")
async def upload_proposal(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(file_path)

    return {
        "proposal_text": text
    }