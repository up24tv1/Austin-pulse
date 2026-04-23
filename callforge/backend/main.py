from fastapi import FastAPI

from .routes.twilio_sms import router as twilio_sms_router
from .routes.twilio_voice import router as twilio_voice_router
from .routes.voice_status import router as voice_status_router

app = FastAPI(title="CallForge API", version="0.1.0")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(twilio_voice_router)
app.include_router(twilio_sms_router)
app.include_router(voice_status_router)
