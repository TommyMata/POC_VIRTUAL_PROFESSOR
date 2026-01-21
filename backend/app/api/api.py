
from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import pdfplumber
import docx
import openai
from dotenv import load_dotenv



load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

PROMPT = (
    "Divide the following course syllabus into lessons. "
    "For each lesson, indicate the title and the topics to be covered. "
    "Return the information in JSON format with the structure: "
    "[{'lesson': 'Lesson Title', 'topics': ['topic1', 'topic2', ...]}]. Syllabus: "
)

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'uploads'))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.get("/ping")
def ping():
    return {"message": "pong"}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filename = file.filename
    if not (filename.endswith('.pdf') or filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="Unsupported format. Only PDF and DOCX are allowed.")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    with open(filepath, "wb") as f:
        f.write(await file.read())
    extracted_text = None
    if filename.endswith('.pdf'):
        extracted_text = extract_text_from_pdf(filepath)
    elif filename.endswith('.docx'):
        extracted_text = extract_text_from_docx(filepath)

    # Send to OpenAI
    prompt = PROMPT + extracted_text
    try:
        client = openai.OpenAI(api_key=openai.api_key)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        ia_result = response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying the AI: {str(e)}")

    return {
        "filename": filename,
        "ia_result": ia_result
    }

def extract_text_from_pdf(filepath):
    text = ""
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(filepath):
    doc = docx.Document(filepath)
    return '\n'.join([p.text for p in doc.paragraphs])
