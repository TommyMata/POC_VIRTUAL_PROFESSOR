"""PDF generation service using ReportLab."""
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

class PDFService:
    def __init__(self, upload_folder: str):
        self.upload_folder = upload_folder
        os.makedirs(self.upload_folder, exist_ok=True)

    def create_lesson_pdf(self, lesson_title: str, lesson_script: str, lesson_index: int) -> dict:
        """Generate a PDF for the given lesson script."""
        pdf_filename = f"lesson_{lesson_index}.pdf"
        pdf_path = os.path.join(self.upload_folder, pdf_filename)

        c = canvas.Canvas(pdf_path, pagesize=letter)
        width, height = letter
        c.setFont("Helvetica-Bold", 14)
        c.drawString(40, height - 50, f"Lesson {lesson_index}: {lesson_title}")
        c.setFont("Helvetica", 11)

        y = height - 80
        max_width = width - 80

        from reportlab.lib.utils import simpleSplit
        for line in lesson_script.split('\n'):
            wrapped_lines = simpleSplit(line.strip(), "Helvetica", 11, max_width)
            for wline in wrapped_lines:
                if y < 60:
                    c.showPage()
                    y = height - 50
                    c.setFont("Helvetica", 11)
                c.drawString(40, y, wline)
                y -= 16

        c.save()

        return {"filename": pdf_filename, "path": pdf_path}