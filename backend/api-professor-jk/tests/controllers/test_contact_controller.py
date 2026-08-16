import base64
import json

from controllers import contact_controller


def valid_payload():
    return {
        "name": "J.K.",
        "email": "visitor@example.com",
        "subject": "Question",
        "message": "Hello",
    }


def make_event(payload=None):
    return {
        "headers": {"content-type": "application/json"},
        "body": json.dumps(payload if payload is not None else valid_payload()),
        "isBase64Encoded": False,
    }


def response_body(response):
    return json.loads(response["body"])


def test_parse_request_body_Base64でエンコードされたJSONを復元する():
    event = make_event()
    event["body"] = base64.b64encode(event["body"].encode()).decode()
    event["isBase64Encoded"] = True

    payload, error = contact_controller.parse_request_body(event)

    assert payload == valid_payload()
    assert error is None


def assert_request_body_error(event):
    payload, error = contact_controller.parse_request_body(event)

    assert payload is None
    assert error is not None


def test_parse_request_body_コンテントタイプがJSON以外ならエラーを返す():
    assert_request_body_error(
        {**make_event(), "headers": {"content-type": "text/plain"}},
    )


def test_parse_request_body_コンテントタイプがなければエラーを返す():
    assert_request_body_error({**make_event(), "headers": None})


def test_parse_request_body_JSONが壊れていればエラーを返す():
    assert_request_body_error({**make_event(), "body": "{"})


def test_parse_request_body_Base64が不正ならエラーを返す():
    assert_request_body_error(
        {**make_event(), "body": "not-base64", "isBase64Encoded": True},
    )


def test_parse_request_body_本文がオブジェクト以外ならエラーを返す():
    assert_request_body_error(
        {**make_event(), "body": json.dumps(["not", "an", "object"])},
    )


def test_parse_request_body_本文が上限を超えたらエラーを返す():
    assert_request_body_error(
        {**make_event(), "body": "x" * (contact_controller.MAX_BODY_BYTES + 1)},
    )


def assert_validation_error(payload_update, error_field):
    payload = valid_payload()
    payload.update(payload_update)

    _values, errors = contact_controller.validate_payload(payload)

    assert error_field in errors


def test_validate_payload_名前が空ならエラーを返す():
    assert_validation_error({"name": ""}, "name")


def test_validate_payload_名前が文字列以外ならエラーを返す():
    assert_validation_error({"name": 1}, "name")


def test_validate_payload_メールアドレスが不正ならエラーを返す():
    assert_validation_error({"email": "invalid"}, "email")


def test_validate_payload_件名に制御文字があればエラーを返す():
    assert_validation_error({"subject": "line\nbreak"}, "subject")


def test_validate_payload_本文が文字数上限を超えたらエラーを返す():
    assert_validation_error({"message": "x" * 5001}, "message")


def test_validate_payload_未定義フィールドがあればエラーを返す():
    assert_validation_error({"unknown": "value"}, "schema")


def test_validate_payload_必須フィールドが不足した場合はエラーを返す():
    _values, errors = contact_controller.validate_payload({"name": "J.K."})

    assert "fields" in errors


def test_handle_contact_正しい入力をサービスへ渡して202を返す(monkeypatch):
    received_values = []
    monkeypatch.setattr(
        contact_controller.contact_service,
        "send_contact",
        received_values.append,
    )

    response = contact_controller.handle_contact(make_event())

    assert response["statusCode"] == 202
    assert response_body(response) == {"message": "Inquiry accepted."}
    assert received_values == [valid_payload()]


def test_handle_contact_通知に失敗した場合は詳細を隠して500を返す(monkeypatch):
    def raise_error(_values):
        raise contact_controller.contact_service.ContactDeliveryError

    monkeypatch.setattr(contact_controller.contact_service, "send_contact", raise_error)

    response = contact_controller.handle_contact(make_event())

    assert response["statusCode"] == 500
    assert response_body(response) == {"message": "Internal server error."}
