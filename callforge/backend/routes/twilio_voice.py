from fastapi import APIRouter, Form, Response

from ..services.twiml import voice_incoming_response

router = APIRouter(prefix="/twilio/voice", tags=["twilio-voice"])


@router.post("/incoming")
async def twilio_voice_incoming(
    call_sid: str = Form(default=""),
    from_number: str = Form(default=""),
    to_number: str = Form(default=""),
) -> Response:
    xml_payload = voice_incoming_response(
        call_sid=call_sid,
        from_number=from_number,
        to_number=to_number,
    )
    return Response(content=xml_payload, media_type="application/xml")
