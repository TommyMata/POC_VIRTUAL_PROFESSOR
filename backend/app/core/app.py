from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

def create_app() -> FastAPI:
    app = FastAPI(title="Mi API")

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    UPLOADS_PATH = os.path.abspath(
        os.path.join(BASE_DIR, "..", "..", "..", "uploads")
    )

    app.mount("/uploads", StaticFiles(directory=UPLOADS_PATH), name="uploads")

    return app
