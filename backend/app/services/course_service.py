"""Course service for orchestrating the complete course generation process."""
import os
from typing import Dict, Any
from fastapi import UploadFile, HTTPException
from config.prompts import PromptConfig
from app.utils.file_utils import extract_text_from_pdf, extract_text_from_docx
from app.services.ai_service import AIService
from app.services.pdf_service import PDFService
from app.services.video_service import generate_video_from_text
from app.models.schemas import CourseResponse, GeneratedMaterial, Assessment, QuizQuestion, VideoInfo


class CourseService:
    def __init__(self):
        # Initialize configuration
        file_config = PromptConfig.get_file_config()
        self.upload_folder = os.path.abspath(os.path.join(
            os.path.dirname(__file__), '..', '..', '..', file_config["uploads_folder"]
        ))
        os.makedirs(self.upload_folder, exist_ok=True)
        
        # Initialize services
        self.ai_service = AIService()
        self.pdf_service = PDFService(self.upload_folder)
        
        # Set OpenAI API key
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        self.ai_service.set_api_key(openai_api_key)

    async def process_document(self, file: UploadFile) -> CourseResponse:
        """Process uploaded document and generate complete course."""
        
        # 1. Validate and save file
        filename = await self._save_uploaded_file(file)
        
        # 2. Extract text from document
        extracted_text = self._extract_text(filename)
        
        # 3. Analyze content with AI
        analysis_result = await self.ai_service.analyze_content(extracted_text)
        
        if not analysis_result["success"]:
            return CourseResponse(
                filename=filename,
                course_structure={},
                generated_materials=[],
                assessments=[],
                error=analysis_result["error"],
                ai_response=analysis_result.get("raw_response")
            )
        
        course_data = analysis_result["data"]
        
        # 4. Generate educational content
        generated_materials, assessments, video_info = await self._generate_course_content(course_data)
        
        return CourseResponse(
            filename=filename,
            course_structure=course_data,
            generated_materials=generated_materials,
            assessments=assessments,
            video_generation=video_info
        )
    
    async def _save_uploaded_file(self, file: UploadFile) -> str:
        """Validate and save uploaded file."""
        file_config = PromptConfig.get_file_config()
        filename = file.filename
        
        # Validate file extension
        if not any(filename.lower().endswith(ext) for ext in file_config["allowed_extensions"]):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format. Only {', '.join(file_config['allowed_extensions'])} files are supported."
            )
        
        # Save file
        filepath = os.path.join(self.upload_folder, filename)
        with open(filepath, "wb") as f:
            f.write(await file.read())
        
        return filename
    
    def _extract_text(self, filename: str) -> str:
        """Extract text from uploaded file."""
        filepath = os.path.join(self.upload_folder, filename)
        
        if filename.endswith('.pdf'):
            return extract_text_from_pdf(filepath)
        elif filename.endswith('.docx'):
            return extract_text_from_docx(filepath)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
    
    async def _generate_course_content(self, course_data: Dict[str, Any]) -> tuple:
        """Generate all course content - PDFs, quizzes, and video."""
        generated_materials = []
        assessments = []
        video_info = None
        
        if not course_data.get("lessons"):
            return generated_materials, assessments, video_info
        
        for lesson_index, lesson in enumerate(course_data["lessons"], 1):
            lesson_title = lesson.get("lesson", f"Lesson {lesson_index}")
            lesson_topics = lesson.get("topics", [])
            
            # Generate lesson content
            lesson_script = await self.ai_service.generate_lesson_script(lesson_title, lesson_topics)
            
            # Create PDF
            pdf_result = self.pdf_service.create_lesson_pdf(lesson_title, lesson_script, lesson_index)
            generated_materials.append(GeneratedMaterial(
                lesson=lesson_title,
                pdf_file=pdf_result["filename"]
            ))
            
            # Generate video for first lesson
            if lesson_index == 1:
                video_info = await self._generate_lesson_video(lesson_title, lesson_script)
            
            # Generate quiz
            assessment = await self._generate_lesson_quiz(lesson_title, lesson_index, pdf_result["path"], lesson_topics)
            assessments.append(assessment)
        
        return generated_materials, assessments, video_info
    
    async def _generate_lesson_video(self, lesson_title: str, lesson_script: str) -> VideoInfo:
        """Generate video for a lesson."""
        try:
            heygen_api_key = os.getenv("HEYGEN_API_KEY")
            if heygen_api_key:
                print(f"Generating video for lesson: {lesson_title}")
                video_result = await generate_video_from_text(lesson_script)
                print(f"Video generated successfully: {video_result.get('filename')}")
                
                return VideoInfo(
                    lesson_title=lesson_title,
                    video_filename=video_result.get("filename"),
                    video_path=video_result.get("path"),
                    status="generated"
                )
            else:
                print("Warning: HEYGEN_API_KEY not configured, skipping video generation")
                return VideoInfo(
                    status="skipped",
                    reason="HEYGEN_API_KEY not configured"
                )
        except Exception as e:
            print(f"Video generation failed: {str(e)}")
            return VideoInfo(
                status="failed",
                error=str(e)
            )
    
    async def _generate_lesson_quiz(self, lesson_title: str, lesson_index: int, pdf_path: str, lesson_topics: list) -> Assessment:
        """Generate quiz for a lesson."""
        try:
            extracted_script_text = extract_text_from_pdf(pdf_path)
        except Exception as e:
            extracted_script_text = f"PDF extraction error: {str(e)}"
        
        quiz_questions = []
        if extracted_script_text and lesson_topics:
            quiz_data = await self.ai_service.generate_quiz(extracted_script_text)
            
            # Format questions
            for question_index, question in enumerate(quiz_data, 1):
                quiz_questions.append(QuizQuestion(
                    question=f"Question {question_index}: {question.get('question', '')}",
                    options=question.get('options', []),
                    answer=question.get('answer', '')
                ))
        
        # Format lesson title
        clean_lesson_title = lesson_title
        expected_prefix = f"Lesson {lesson_index}: "
        if lesson_title.startswith(expected_prefix):
            clean_lesson_title = lesson_title[len(expected_prefix):]
        
        formatted_lesson_title = f"Lesson {lesson_index}: {clean_lesson_title}"
        
        return Assessment(
            lesson=formatted_lesson_title,
            questions=quiz_questions
        )