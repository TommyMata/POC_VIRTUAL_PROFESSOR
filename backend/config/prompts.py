"""
AI Prompt Templates Configuration
Centralized prompt management for the Virtual Professor application.
"""

from typing import Dict, Any
import json


class PromptTemplates:
    """Centralized prompt template management."""
    
    # Course analysis and structure generation
    COURSE_ANALYSIS = """
    Analyze the following educational document and generate a comprehensive course structure.
    
    Requirements:
    1. Extract and create a descriptive course title based on content analysis
    2. Generate a concise course description (2-3 sentences)
    3. Structure content into logical lessons with specific topics
    
    Output Format: Valid JSON only
    {{
        "course_title": "Descriptive title based on content",
        "course_description": "Brief overview explaining what students will learn",
        "lessons": [
            {{
                "lesson": "Clear lesson title",
                "topics": ["specific_topic_1", "specific_topic_2", "..."]
            }}
        ]
    }}
    
    Document Content:
    {document_content}
    """
    
    # Lesson script generation
    LESSON_SCRIPT = """
    Create a brief educational script for: "{lesson_title}"
    
    Topics to cover: {topics}
    
    Requirements:
    - Duration: 1 minute of spoken content (max 800 characters)
    - Style: Concise, clear, educational
    - Include key concepts only
    - Format for video narration
    
    Generate a short, focused script.
    """
    
    # Quiz generation
    QUIZ_GENERATION = """
    Generate 1 challenging multiple-choice question based on this lesson content.
    
    Requirements:
    - Focus on understanding and application, not memorization
    - 4 options labeled A, B, C, D
    - One clearly correct answer
    - Question should test comprehension of the material
    
    Content: {lesson_content}
    
    Return ONLY valid JSON:
    [{{
        "question": "Clear, specific question",
        "options": ["A: option1", "B: option2", "C: option3", "D: option4"],
        "answer": "A: correct_option"
    }}]
    """

    @classmethod
    def get_course_analysis_prompt(cls, document_content: str) -> str:
        """Get formatted course analysis prompt."""
        return cls.COURSE_ANALYSIS.format(document_content=document_content)
    
    @classmethod
    def get_lesson_script_prompt(cls, lesson_title: str, topics: list) -> str:
        """Get formatted lesson script generation prompt."""
        topics_str = ", ".join(topics) if topics else "General lesson content"
        return cls.LESSON_SCRIPT.format(
            lesson_title=lesson_title,
            topics=topics_str
        )
    
    @classmethod
    def get_quiz_prompt(cls, lesson_content: str) -> str:
        """Get formatted quiz generation prompt."""
        return cls.QUIZ_GENERATION.format(lesson_content=lesson_content)


class PromptConfig:
    """Configuration settings for AI interactions and API endpoints."""
    
    # OpenAI Configuration
    OPENAI_MODEL = "gpt-3.5-turbo"
    OPENAI_TEMPERATURE = 0.7
    OPENAI_MAX_TOKENS = 1500
    
    # HeyGen API Configuration
    HEYGEN_API_BASE_URL = "https://api.heygen.com"
    HEYGEN_VIDEO_GENERATE_URL = "https://api.heygen.com/v2/video/generate"
    HEYGEN_VIDEO_STATUS_URL = "https://api.heygen.com/v1/video_status.get"
    HEYGEN_AVATAR_ID = "Georgia_sitting_office_front"
    HEYGEN_VOICE_ID = "79cb233e53e04419aa6f86db0ce8b192"
    HEYGEN_VIDEO_DIMENSIONS = {"width": 1280, "height": 720}
    
    # Processing Configuration
    MAX_POLL_ATTEMPTS = 60  # 10 minutes for video generation
    POLL_INTERVAL = 10  # seconds
    
    # File Storage Configuration
    UPLOADS_FOLDER_NAME = "uploads"
    MAX_FILE_SIZE_MB = 50
    ALLOWED_EXTENSIONS = [".pdf", ".docx"]
    
    @classmethod
    def get_openai_config(cls) -> Dict[str, Any]:
        """Get OpenAI API configuration."""
        return {
            "model": cls.OPENAI_MODEL,
            "temperature": cls.OPENAI_TEMPERATURE,
            "max_tokens": cls.OPENAI_MAX_TOKENS
        }
    
    @classmethod
    def get_heygen_config(cls) -> Dict[str, Any]:
        """Get HeyGen API configuration."""
        return {
            "api_urls": {
                "generate": cls.HEYGEN_VIDEO_GENERATE_URL,
                "status": cls.HEYGEN_VIDEO_STATUS_URL
            },
            "avatar_id": cls.HEYGEN_AVATAR_ID,
            "voice_id": cls.HEYGEN_VOICE_ID,
            "dimensions": cls.HEYGEN_VIDEO_DIMENSIONS,
            "polling": {
                "max_attempts": cls.MAX_POLL_ATTEMPTS,
                "interval": cls.POLL_INTERVAL
            }
        }
    
    @classmethod
    def get_file_config(cls) -> Dict[str, Any]:
        """Get file handling configuration."""
        return {
            "uploads_folder": cls.UPLOADS_FOLDER_NAME,
            "max_size_mb": cls.MAX_FILE_SIZE_MB,
            "allowed_extensions": cls.ALLOWED_EXTENSIONS
        }


# Optional: Load prompts from external files for even more flexibility
def load_prompts_from_file(file_path: str) -> Dict[str, str]:
    """Load prompts from external JSON configuration file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        return {}