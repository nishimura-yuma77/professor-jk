from typing import Any

from controllers import contact_controller
from controllers.http import json_response


def route(event: dict[str, Any]):
    http = event.get("requestContext", {}).get("http", {})
    method = http.get("method")
    path = event.get("rawPath")

    if path != "/contact":
        return json_response(404, {"message": "Not found."})
    if method == "OPTIONS":
        return {"statusCode": 204}
    if method != "POST":
        return json_response(
            405,
            {"message": "Method not allowed."},
            {"allow": "OPTIONS, POST"},
        )

    return contact_controller.handle_contact(event)
