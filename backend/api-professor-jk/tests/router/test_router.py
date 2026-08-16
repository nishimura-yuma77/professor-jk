import json

from router import router


def make_event(*, method="POST", path="/contact"):
    return {
        "rawPath": path,
        "requestContext": {"http": {"method": method}},
    }


def test_route_お問い合わせリクエストをコントローラーへ渡す(monkeypatch):
    event = make_event()
    monkeypatch.setattr(
        router.contact_controller,
        "handle_contact",
        lambda received_event: {"event": received_event},
    )

    response = router.route(event)

    assert response == {"event": event}


def test_route_未定義のパスには404を返す():
    response = router.route(make_event(path="/unknown"))

    assert response["statusCode"] == 404
    assert json.loads(response["body"]) == {"message": "Not found."}


def test_route_お問い合わせへのPOST以外には405を返す():
    response = router.route(make_event(method="GET"))

    assert response["statusCode"] == 405
    assert response["headers"]["allow"] == "POST"
