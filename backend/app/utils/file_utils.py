"""File processing utilities for text extraction."""
import pdfplumber
import docx


def extract_text_from_pdf(file_path):
    """Extract text content from PDF file."""
    extracted_text = ""
    with pdfplumber.open(file_path) as pdf_document:
        for page in pdf_document.pages:
            page_text = page.extract_text()
            if page_text:
                extracted_text += page_text
    return extracted_text


def extract_text_from_docx(file_path):
    """Extract text content from DOCX file."""
    document = docx.Document(file_path)
    return '\n'.join([paragraph.text for paragraph in document.paragraphs])