from ..models.lead import Lead


def extract_lead_from_text(text: str, from_number: str = "") -> Lead:
    # Placeholder parser for MVP scaffold.
    raw = (text or "").strip()
    return Lead(
        from_number=from_number,
        name="",
        issue=raw,
        zip_code="",
        urgency="unknown",
        raw_text=raw,
    )
