import json
from typing import Any


def json_response(
    status_code: int,
    body: dict[str, Any],
    headers: dict[str, str] | None = None,
):
    return {
        "statusCode": status_code,
        "headers": {"content-type": "application/json", **(headers or {})},
        "body": json.dumps(body, ensure_ascii=False),
    }
