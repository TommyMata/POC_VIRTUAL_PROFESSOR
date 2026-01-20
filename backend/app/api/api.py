from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import pdfplumber
import docx

router = APIRouter()

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'uploads'))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.get("/ping")
def ping():
    return {"message": "pong"}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filename = file.filename
    if not (filename.endswith('.pdf') or filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="Formato no soportado. Solo PDF y DOCX.")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    with open(filepath, "wb") as f:
        f.write(await file.read())
    extracted_text = None
    if filename.endswith('.pdf'):
        extracted_text = extract_text_from_pdf(filepath)
    elif filename.endswith('.docx'):
        extracted_text = extract_text_from_docx(filepath)
    return {"filename": filename, "extracted_text": extracted_text}

def extract_text_from_pdf(filepath):
    text = ""
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(filepath):
    doc = docx.Document(filepath)
    return '\n'.join([p.text for p in doc.paragraphs])
