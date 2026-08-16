import json
import logging
from typing import Any

from router.router import route

LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.INFO)


def lambda_handler(event: dict[str, Any], _context: Any):
    try:
        return route(event)
    except Exception:
        LOGGER.exception("Unexpected contact API failure")
        return {
            "statusCode": 500,
            "headers": {"content-type": "application/json"},
            "body": json.dumps({"message": "Internal server error."}),
        }
