from xml.sax.saxutils import escape


def voice_incoming_response(call_sid: str, from_number: str, to_number: str) -> str:
    safe_from = escape(from_number or "unknown")
    safe_call_sid = escape(call_sid or "unknown")
    safe_to = escape(to_number or "unknown")

    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        "<Response>"
        "<Say voice=\"alice\">"
        "Thanks for calling. Please tell us your name, issue, zip code, and urgency after the beep."
        "</Say>"
        "<Record maxLength=\"90\" playBeep=\"true\" timeout=\"3\" />"
        f"<Say>We captured your request from {safe_from} for line {safe_to}. Reference {safe_call_sid}.</Say>"
        "<Say>Thank you. We will text you shortly.</Say>"
        "</Response>"
    )


def sms_incoming_response(from_number: str, body: str) -> str:
    safe_from = escape(from_number or "unknown")
    snippet = escape((body or "").strip()[:120])

    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        "<Response>"
        f"<Message>Thanks for contacting CallForge. We received your message from {safe_from}: {snippet}</Message>"
        "</Response>"
    )
