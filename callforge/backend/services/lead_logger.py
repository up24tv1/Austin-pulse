import logging
from datetime import UTC, datetime

logger = logging.getLogger(__name__)


def log_voice_status_event(call_sid: str, call_status: str, from_number: str) -> None:
    logger.info(
        "voice_status call_sid=%s call_status=%s from_number=%s at=%s",
        call_sid or "unknown",
        call_status or "unknown",
        from_number or "unknown",
        datetime.now(UTC).isoformat(),
    )
