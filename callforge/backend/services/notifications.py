import logging

logger = logging.getLogger(__name__)


def notify_owner_sms(message: str) -> None:
    logger.info("owner_sms_stub=%s", message)


def notify_owner_email(subject: str, message: str) -> None:
    logger.info("owner_email_stub subject=%s message=%s", subject, message)
