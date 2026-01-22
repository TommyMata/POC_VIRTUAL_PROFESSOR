# POC_VIRTUAL_PROFESSOR

## Getting Started

### Prerequisites
* Python 3.10.*

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Nearlinx/AI-POC.git
```

#### 2. Backend Setup (Python)
First, go into the backend folder
```bash
cd AI-POC/backend/
```
Create venv with python 3.10
```bash
python3.10 -m venv venv
```
Activate venv
```bash
source venv/bin/activate
```
Install requirements
```bash
pip install -r requirements.txt
```
Create .env file
```bash
nano .env
```
Edit .env file with the open AI key
```
OPENAI_API_KEY=...
```
Save .env file

Run
```bash
python run.py
```
Open: http://localhost:8000/docs#/

