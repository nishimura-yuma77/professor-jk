import base64
import binascii
import json
import logging
from typing import Any

from email_validator import EmailNotValidError, validate_email

from controllers.http import json_response
from services import contact_service

LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.INFO)

MAX_BODY_BYTES = 20 * 1024
EXPECTED_FIELDS = {"name", "email", "subject", "message"}


def parse_request_body(event: dict[str, Any]) -> tuple[dict[str, Any] | None, str | None]:
    raw_headers = event.get("headers")
    if not isinstance(raw_headers, dict):
        raw_headers = {}
    headers = {str(key).lower(): str(value) for key, value in raw_headers.items()}
    content_type = headers.get("content-type", "").split(";", maxsplit=1)[0].strip().lower()
    if content_type != "application/json":
        return None, "Content-Type must be application/json."

    body = event.get("body")
    if not isinstance(body, str):
        return None, "Request body must be a JSON object."

    try:
        body_bytes = (
            base64.b64decode(body, validate=True)
            if event.get("isBase64Encoded") is True
            else body.encode("utf-8")
        )
    except (binascii.Error, UnicodeEncodeError, ValueError):
        return None, "Request body is invalid."

    if len(body_bytes) > MAX_BODY_BYTES:
        return None, "Request body is too large."

    try:
        payload = json.loads(body_bytes.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None, "Request body must be valid JSON."

    if not isinstance(payload, dict):
        return None, "Request body must be a JSON object."

    return payload, None


def validate_payload(payload: dict[str, Any]) -> tuple[dict[str, str], dict[str, str]]:
    errors: dict[str, str] = {}
    values: dict[str, str] = {}

    missing_fields = EXPECTED_FIELDS - payload.keys()
    unknown_fields = payload.keys() - EXPECTED_FIELDS
    if missing_fields:
        errors["fields"] = "Required fields are missing."
    if unknown_fields:
        errors["schema"] = "Unknown fields are not allowed."

    limits = {"name": 100, "email": 254, "subject": 200, "message": 5000}
    for field, limit in limits.items():
        value = payload.get(field)
        if not isinstance(value, str):
            if field not in missing_fields:
                errors[field] = "Must be a string."
            continue

        value = value.strip()
        if not value:
            errors[field] = "Must not be empty."
        elif len(value) > limit:
            errors[field] = f"Must be at most {limit} characters."
        else:
            values[field] = value

    subject = values.get("subject")
    if subject is not None and any(
        ord(character) < 32 or ord(character) == 127 for character in subject
    ):
        errors["subject"] = "Must not contain control characters."

    email = values.get("email")
    if email is not None:
        try:
            values["email"] = validate_email(email, check_deliverability=False).normalized
        except EmailNotValidError:
            errors["email"] = "Must be a valid email address."

    return values, errors


def handle_contact(event: dict[str, Any]):
    payload, body_error = parse_request_body(event)
    if body_error is not None:
        return json_response(400, {"message": body_error})

    values, errors = validate_payload(payload or {})
    if errors:
        return json_response(400, {"message": "Invalid request.", "errors": errors})

    try:
        contact_service.send_contact(values)
    except contact_service.ContactDeliveryError:
        LOGGER.exception("Failed to deliver a contact notification")
        return json_response(500, {"message": "Internal server error."})

    return json_response(202, {"message": "Inquiry accepted."})
