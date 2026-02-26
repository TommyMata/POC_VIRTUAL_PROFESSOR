"""Data models and schemas for API responses."""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class GeneratedMaterial(BaseModel):
    lesson: str
    pdf_file: str


class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str


class Assessment(BaseModel):
    lesson: str
    questions: List[QuizQuestion]


class VideoInfo(BaseModel):
    lesson_title: Optional[str] = None
    video_filename: Optional[str] = None
    video_path: Optional[str] = None
    status: str
    reason: Optional[str] = None
    error: Optional[str] = None


class CourseResponse(BaseModel):
    filename: str
    course_structure: Dict[str, Any]
    generated_materials: List[GeneratedMaterial]
    assessments: List[Assessment]
    video_generation: Optional[VideoInfo] = None
    error: Optional[str] = None
    ai_response: Optional[str] = None