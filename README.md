# Virtual Professor - AI-Powered Educational Content Generator

An intelligent platform that transforms educational documents into structured courses with automatically generated video content, lesson scripts, and interactive assessments.

## 🚀 Features

- **Document Processing**: Extract content from PDF and DOCX files
- **AI-Powered Course Generation**: Automatically structure courses using OpenAI
- **Video Content Creation**: Generate educational videos using HeyGen API
- **Interactive Assessments**: Create quiz questions based on lesson content
- **Modern Frontend**: React + TypeScript interface with Ant Design components
- **RESTful API**: FastAPI backend with comprehensive documentation

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI**: High-performance REST API framework
- **OpenAI Integration**: GPT-powered content analysis and generation
- **HeyGen API**: Automated video creation from text
- **Document Processing**: PDF/DOCX text extraction
- **Report Generation**: PDF creation with ReportLab

### Frontend (React/TypeScript)
- **React 19**: Modern component-based architecture  
- **TypeScript**: Type-safe development
- **Ant Design**: Professional UI component library
- **Vite**: Fast development and build tooling
- **Internationalization**: Multi-language support

## 📋 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **OpenAI API Key**
- **HeyGen API Key** (optional, for video generation)

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd VIRTUAL_PROFESSOR
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Environment configuration
cp .env.example .env
```

Edit `.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
HEYGEN_API_KEY=your_heygen_api_key_here
```

```bash
# Start backend server
python run.py
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### 3. Frontend Setup

```bash
# Navigate to frontend directory (new terminal)
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

## 📚 API Endpoints

### Core Endpoints

- **GET /ping** - Health check endpoint
- **POST /upload** - Process educational documents and generate course structure
- **POST /generate-video** - Create videos from PDF content

### Example Usage

```bash
# Upload and process course document
curl -X POST "http://localhost:8000/upload" \
  -F "file=@course_syllabus.pdf"
```

## 🛠️ Development

### Backend Development
```bash
# Run with auto-reload
python run.py

# Install new dependencies
pip install package_name
pip freeze > requirements.txt
```

### Frontend Development  
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 📦 Project Structure

```
VIRTUAL_PROFESSOR/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Application core
│   │   └── main.py       # FastAPI app entry
│   ├── requirements.txt
│   └── run.py           # Server startup
├── Frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── features/     # Feature-specific modules
│   │   ├── services/     # API integration
│   │   └── types/        # TypeScript definitions
│   └── package.json
└── uploads/             # File storage
```

## 🔧 Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI** - GPT integration for content generation
- **HeyGen** - AI video generation
- **pdfplumber** - PDF text extraction
- **python-docx** - DOCX document processing
- **reportlab** - PDF generation
- **uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Ant Design** - UI components
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **i18next** - Internationalization

## 🚀 Deployment

### Production Build
```bash
# Backend
pip install -r requirements.txt
python run.py

# Frontend
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using cutting-edge AI technologies

