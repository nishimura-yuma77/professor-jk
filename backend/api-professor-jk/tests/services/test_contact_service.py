import pytest

from repositories import ses_repository
from services import contact_service


def test_send_contact_お問い合わせ内容から通知メールを作成する(monkeypatch):
    requests = []
    monkeypatch.setattr(
        contact_service.ses_repository,
        "send_email",
        lambda **request: requests.append(request),
    )

    contact_service.send_contact(
        {
            "name": "J.K.",
            "email": "visitor@example.com",
            "subject": "Question",
            "message": "Hello",
        }
    )

    assert requests == [
        {
            "reply_to": "visitor@example.com",
            "subject": "[Professor J.K.] Question",
            "body": "Name: J.K.\nEmail: visitor@example.com\nSubject: Question\n\nHello",
        }
    ]


def test_send_contact_リポジトリの失敗をサービス例外へ変換する(monkeypatch):
    def raise_error(**_request):
        raise ses_repository.ContactRepositoryError("SES delivery failed")

    monkeypatch.setattr(contact_service.ses_repository, "send_email", raise_error)

    with pytest.raises(contact_service.ContactDeliveryError, match="SES delivery failed"):
        contact_service.send_contact(
            {
                "name": "J.K.",
                "email": "visitor@example.com",
                "subject": "Question",
                "message": "Hello",
            }
        )
