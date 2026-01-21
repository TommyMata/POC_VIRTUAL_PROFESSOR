from app.core.app import create_app
from app.api.api import router

app = create_app()
app.include_router(router)
