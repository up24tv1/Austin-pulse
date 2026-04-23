from fastapi import APIRouter, Form

from ..services.lead_logger import log_voice_status_event

router = APIRouter(prefix="/twilio/voice", tags=["voice-status"])


@router.post("/status")
async def twilio_voice_status(
    call_sid: str = Form(default=""),
    call_status: str = Form(default=""),
    from_number: str = Form(default=""),
) -> dict[str, str]:
    log_voice_status_event(
        call_sid=call_sid,
        call_status=call_status,
        from_number=from_number,
    )
    return {"status": "received"}
