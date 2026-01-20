from flask import Flask, render_template, request
import os
import pdfplumber
import docx

app = Flask(__name__)
UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'uploads'))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def extract_text_from_pdf(filepath):
    text = ""
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(filepath):
    doc = docx.Document(filepath)
    return '\n'.join([p.text for p in doc.paragraphs])

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    extracted_text = None
    filename = None
    if request.method == 'POST':
        file = request.files['file']
        if file and (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
            filename = file.filename
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            if filename.endswith('.pdf'):
                extracted_text = extract_text_from_pdf(filepath)
            elif filename.endswith('.docx'):
                extracted_text = extract_text_from_docx(filepath)
        else:
            return "Formato no soportado. Solo PDF y DOCX.", 400
    return render_template('upload.html', extracted_text=extracted_text, filename=filename)

if __name__ == '__main__':
    app.run(debug=True)
