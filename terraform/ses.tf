// SESからメールを送信するためのドメインIdentity
resource "aws_sesv2_email_identity" "site" {
  email_identity = "professor-jk.net"

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

// SPFをFromドメインにアライメントさせるためのCustom MAIL FROM
resource "aws_sesv2_email_identity_mail_from_attributes" "site" {
  email_identity = aws_sesv2_email_identity.site.email_identity

  behavior_on_mx_failure = "REJECT_MESSAGE"
  mail_from_domain       = "mail.${aws_sesv2_email_identity.site.email_identity}"
}

// Sandbox中の送信テストに使用する宛先メールアドレス
resource "aws_sesv2_email_identity" "contact_recipient" {
  email_identity = var.contact_recipient_email
}
