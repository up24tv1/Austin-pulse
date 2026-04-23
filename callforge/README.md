# CallForge Local Scaffold

Production-minded MVP scaffold for missed-call revenue recovery workflows.

## Structure

- `backend/main.py` – FastAPI app entrypoint.
- `backend/routes/*` – Twilio webhook routes.
- `backend/services/*` – TwiML helpers and service stubs.
- `backend/models/*` – Lead model.
- `app/page.tsx` – Simple landing page content.

## Quick start (backend)

1. Create a virtualenv and install dependencies:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install fastapi uvicorn python-multipart pydantic
   ```

2. Run the API:

   ```bash
   uvicorn backend.main:app --reload --app-dir callforge
   ```

3. Check health:

   ```bash
   curl http://127.0.0.1:8000/health
   ```

## Twilio webhook routes

- `POST /twilio/voice/incoming`
- `POST /twilio/sms/incoming`
- `POST /twilio/voice/status`
- `GET /health`

Use a local tunnel URL for Twilio webhook testing during development.
