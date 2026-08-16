import json

import handler
from repositories import ses_repository


def test_lambda_handler_正しいお問い合わせを受け付けて202を返す(monkeypatch):
    requests = []
    monkeypatch.setattr(
        ses_repository,
        "send_email",
        lambda **request: requests.append(request),
    )
    event = {
        "rawPath": "/contact",
        "headers": {"content-type": "application/json"},
        "requestContext": {"http": {"method": "POST"}},
        "body": json.dumps(
            {
                "name": "J.K.",
                "email": "visitor@example.com",
                "subject": "Question",
                "message": "Hello",
            }
        ),
        "isBase64Encoded": False,
    }

    response = handler.lambda_handler(event, None)

    assert response["statusCode"] == 202
    assert requests[0]["reply_to"] == "visitor@example.com"


def test_lambda_handler_ルーターのレスポンスを返す(monkeypatch):
    monkeypatch.setattr(handler, "route", lambda _event: {"statusCode": 204})

    response = handler.lambda_handler({}, None)

    assert response == {"statusCode": 204}


def test_lambda_handler_予期しない例外には500を返す(monkeypatch):
    def raise_error(_event):
        raise RuntimeError("unexpected")

    monkeypatch.setattr(handler, "route", raise_error)

    response = handler.lambda_handler({}, None)

    assert response["statusCode"] == 500
    assert json.loads(response["body"]) == {"message": "Internal server error."}
