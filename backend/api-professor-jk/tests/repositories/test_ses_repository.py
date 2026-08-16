import pytest
from botocore.exceptions import ClientError

from repositories import ses_repository


class FakeSesClient:
    def __init__(self, error: bool = False):
        self.error = error
        self.requests = []

    def send_email(self, **request):
        if self.error:
            raise ClientError(
                {"Error": {"Code": "MessageRejected", "Message": "Rejected"}},
                "SendEmail",
            )
        self.requests.append(request)


@pytest.fixture(autouse=True)
def configure_environment(monkeypatch):
    monkeypatch.setenv("CONTACT_SENDER_EMAIL", "jk@professor-jk.net")
    monkeypatch.setenv("CONTACT_RECIPIENT_EMAIL", "owner@example.com")
    ses_repository._ses_client = None


def test_send_email_固定宛先へ返信先付きのメールを送信する():
    client = FakeSesClient()
    ses_repository._ses_client = client

    ses_repository.send_email(
        reply_to="visitor@example.com",
        subject="Contact subject",
        body="Contact body",
    )

    assert client.requests == [
        {
            "FromEmailAddress": "jk@professor-jk.net",
            "Destination": {"ToAddresses": ["owner@example.com"]},
            "ReplyToAddresses": ["visitor@example.com"],
            "Content": {
                "Simple": {
                    "Subject": {"Data": "Contact subject", "Charset": "UTF-8"},
                    "Body": {"Text": {"Data": "Contact body", "Charset": "UTF-8"}},
                }
            },
        }
    ]


def test_send_email_SESの失敗をリポジトリ例外へ変換する():
    ses_repository._ses_client = FakeSesClient(error=True)

    with pytest.raises(
        ses_repository.ContactRepositoryError,
        match="MessageRejected.*Rejected",
    ):
        ses_repository.send_email(
            reply_to="visitor@example.com",
            subject="Contact subject",
            body="Contact body",
        )
