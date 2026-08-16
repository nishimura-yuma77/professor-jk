from repositories import ses_repository


class ContactDeliveryError(Exception):
    pass


def send_contact(values: dict[str, str]) -> None:
    body = "\n".join(
        [
            f"Name: {values['name']}",
            f"Email: {values['email']}",
            f"Subject: {values['subject']}",
            "",
            values["message"],
        ]
    )

    try:
        ses_repository.send_email(
            reply_to=values["email"],
            subject=f"[Professor J.K.] {values['subject']}",
            body=body,
        )
    except ses_repository.ContactRepositoryError as error:
        raise ContactDeliveryError from error
