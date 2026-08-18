from collections.abc import Callable
from typing import Any

from controllers import contact_controller
from controllers.http import json_response

RouteHandler = Callable[[dict[str, Any]], dict[str, Any]]

ROUTES: dict[str, dict[str, RouteHandler]] = {
    "/contact": {
        "POST": contact_controller.handle_contact,
    },
}


def route(event: dict[str, Any]):
    http = event.get("requestContext", {}).get("http", {})
    method = http.get("method")
    path = event.get("rawPath")

    if isinstance(path, str) and path != "/" and path.endswith("/"):
        path = path[:-1]

    handlers = ROUTES.get(path) if isinstance(path, str) else None
    if handlers is None:
        return json_response(404, {"message": "Not found."})

    allow = ", ".join(("OPTIONS", *sorted(set(handlers) - {"OPTIONS"})))
    if method == "OPTIONS":
        return {"statusCode": 204, "headers": {"allow": allow}}

    handler = handlers.get(method)
    if handler is None:
        return json_response(
            405,
            {"message": "Method not allowed."},
            {"allow": allow},
        )

    return handler(event)
