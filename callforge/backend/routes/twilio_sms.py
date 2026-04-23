from fastapi import APIRouter, Form, Response

from ..services.twiml import sms_incoming_response

router = APIRouter(prefix="/twilio/sms", tags=["twilio-sms"])


@router.post("/incoming")
async def twilio_sms_incoming(
    from_number: str = Form(default=""),
    body: str = Form(default=""),
) -> Response:
    xml_payload = sms_incoming_response(from_number=from_number, body=body)
    return Response(content=xml_payload, media_type="application/xml")
