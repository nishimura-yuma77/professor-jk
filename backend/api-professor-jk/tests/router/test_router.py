import json

import pytest

from router import router


def make_event(*, method="POST", path="/contact"):
    return {
        "rawPath": path,
        "requestContext": {"http": {"method": method}},
    }


@pytest.mark.parametrize("path", ["/contact", "/contact/"])
def test_route_お問い合わせリクエストをコントローラーへ渡す(monkeypatch, path):
    event = make_event(path=path)
    monkeypatch.setitem(
        router.ROUTES["/contact"],
        "POST",
        lambda received_event: {"event": received_event},
    )

    response = router.route(event)

    assert response == {"event": event}


@pytest.mark.parametrize("method,path", [("POST", "/unknown"), ("OPTIONS", "/unknown")])
def test_route_未定義のパスには404を返す(method, path):
    response = router.route(make_event(method=method, path=path))

    assert response["statusCode"] == 404
    assert json.loads(response["body"]) == {"message": "Not found."}


@pytest.mark.parametrize("path", ["/contact", "/contact/"])
def test_route_お問い合わせへのOPTIONSには204を返す(monkeypatch, path):
    def fail_if_called(_event):
        raise AssertionError("contact controller must not be called")

    monkeypatch.setitem(router.ROUTES["/contact"], "POST", fail_if_called)

    response = router.route(make_event(method="OPTIONS", path=path))

    assert response == {"statusCode": 204, "headers": {"allow": "OPTIONS, POST"}}


def test_route_お問い合わせへのPOST以外には405を返す():
    response = router.route(make_event(method="GET"))

    assert response["statusCode"] == 405
    assert response["headers"]["allow"] == "OPTIONS, POST"


def test_route_Allowを登録済みメソッドから生成する(monkeypatch):
    def fail_if_called(_event):
        raise AssertionError("route handler must not be called")

    monkeypatch.setitem(
        router.ROUTES,
        "/resource",
        {"POST": fail_if_called, "GET": fail_if_called, "DELETE": fail_if_called},
    )

    response = router.route(make_event(method="OPTIONS", path="/resource"))

    assert response["headers"]["allow"] == "OPTIONS, DELETE, GET, POST"


def test_route_末尾スラッシュが複数あるパスには404を返す():
    response = router.route(make_event(path="/contact//"))

    assert response["statusCode"] == 404
