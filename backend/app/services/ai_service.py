"""AI service for OpenAI integration."""
import json
import openai
from fastapi import HTTPException
from config.prompts import PromptTemplates, PromptConfig


class AIService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=None)  # Will be set by course service
    
    def set_api_key(self, api_key: str):
        """Set OpenAI API key."""
        self.client = openai.OpenAI(api_key=api_key)
    
    async def analyze_content(self, extracted_text: str) -> dict:
        """Analyze document content and generate course structure."""
        analysis_prompt = PromptTemplates.get_course_analysis_prompt(extracted_text)
        
        try:
            openai_config = PromptConfig.get_openai_config()
            response = self.client.chat.completions.create(
                model=openai_config["model"],
                messages=[{"role": "user", "content": analysis_prompt}],
                temperature=openai_config["temperature"],
                max_tokens=openai_config["max_tokens"]
            )
            ai_response = response.choices[0].message.content
            
            try:
                course_data = json.loads(ai_response)
                return {"success": True, "data": course_data}
            except json.JSONDecodeError:
                return {
                    "success": False, 
                    "error": "Invalid JSON format from AI response",
                    "raw_response": ai_response
                }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
    
    async def generate_lesson_script(self, lesson_title: str, lesson_topics: list) -> str:
        """Generate lesson script using AI."""
        script_prompt = PromptTemplates.get_lesson_script_prompt(lesson_title, lesson_topics)
        
        try:
            openai_config = PromptConfig.get_openai_config()
            response = self.client.chat.completions.create(
                model=openai_config["model"],
                messages=[{"role": "user", "content": script_prompt}],
                temperature=openai_config["temperature"]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Script generation failed: {str(e)}"
    
    async def generate_quiz(self, lesson_content: str) -> list:
        """Generate quiz questions from lesson content."""
        quiz_prompt = PromptTemplates.get_quiz_prompt(lesson_content)
        
        try:
            openai_config = PromptConfig.get_openai_config()
            response = self.client.chat.completions.create(
                model=openai_config["model"],
                messages=[{"role": "user", "content": quiz_prompt}],
                temperature=openai_config["temperature"]
            )
            quiz_content = response.choices[0].message.content.strip()
            
            # Clean and parse quiz JSON
            if quiz_content.startswith("```"):
                quiz_content = quiz_content.strip().lstrip("`json").lstrip("`").rstrip("`")
            
            import re
            quiz_content = re.sub(r"'", '"', quiz_content)
            quiz_content = re.sub(r',\s*([}\]])', r'\1', quiz_content)
            
            match = re.search(r'(\[.*\])', quiz_content, re.DOTALL)
            if match:
                quiz_content = match.group(1)
            
            quiz_questions = json.loads(quiz_content)
            if not (isinstance(quiz_questions, list) and all(
                isinstance(q, dict) and 'question' in q and 'options' in q and 'answer' in q 
                for q in quiz_questions
            )):
                return []
            
            return quiz_questions
        except Exception:
            return []