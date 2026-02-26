
from fastapi import APIRouter, UploadFile, File, HTTPException, Body
import os
from dotenv import load_dotenv
from app.services.course_service import CourseService
from app.models.schemas import CourseResponse

load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
router = APIRouter()


@router.get("/ping")
def ping():
    """Health check endpoint."""
    return {"message": "pong"}


@router.post("/upload", response_model=CourseResponse)
async def upload_file(file: UploadFile = File(...)) -> CourseResponse:
    course_service = CourseService()
    return await course_service.process_document(file)
