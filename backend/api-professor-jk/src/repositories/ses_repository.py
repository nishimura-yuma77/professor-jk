import os

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError

_ses_client = None


class ContactRepositoryError(Exception):
    pass


def _get_ses_client():
    global _ses_client
    if _ses_client is None:
        _ses_client = boto3.client(
            "sesv2",
            config=Config(
                connect_timeout=1,
                read_timeout=3,
                retries={"mode": "standard", "total_max_attempts": 2},
            ),
        )
    return _ses_client


def send_email(reply_to: str, subject: str, body: str) -> None:
    try:
        sender = os.environ["CONTACT_SENDER_EMAIL"]
        recipient = os.environ["CONTACT_RECIPIENT_EMAIL"]
        _get_ses_client().send_email(
            FromEmailAddress=sender,
            Destination={"ToAddresses": [recipient]},
            ReplyToAddresses=[reply_to],
            Content={
                "Simple": {
                    "Subject": {"Data": subject, "Charset": "UTF-8"},
                    "Body": {"Text": {"Data": body, "Charset": "UTF-8"}},
                }
            },
        )
    except (BotoCoreError, ClientError, KeyError) as error:
        raise ContactRepositoryError(str(error)) from error
