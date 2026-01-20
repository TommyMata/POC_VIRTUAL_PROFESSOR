from app.core.app import create_app
from app.api.api import router as ping_router

app = create_app()
app.include_router(ping_router)
