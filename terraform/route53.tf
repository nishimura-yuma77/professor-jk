// domainに紐づいたhosted zoneの取得
data "aws_route53_zone" "site" {
  name         = "professor-jk.net"
  private_zone = false
}

// acmのdomain_validation_optionからレコード名・値・型を取り出してRoute53に登録する。
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.site.zone_id

  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]

  ttl = 60
}

// cloudfrontを向くalias Aを作成する
resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "professor-jk.net"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

// Google Search Consoleのドメイン所有権確認用TXTレコード
resource "aws_route53_record" "google_site_verification" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "professor-jk.net"
  type    = "TXT"
  ttl     = 300

  records = [
    "google-site-verification=4NQ3mGddTd9lGjmkZ1sxSdG7njJrM9lBqbsQqBBGDqU"
  ]
}

// SESのドメイン検証と送信メールのDKIM署名検証に使用するCNAMEレコード
resource "aws_route53_record" "ses_dkim" {
  count = 3

  zone_id = data.aws_route53_zone.site.zone_id
  name    = "${aws_sesv2_email_identity.site.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${aws_sesv2_email_identity.site.email_identity}"
  type    = "CNAME"
  ttl     = 300

  records = [
    "${aws_sesv2_email_identity.site.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"
  ]
}

// Custom MAIL FROMへのバウンスをSESで受け取るためのMXレコード
resource "aws_route53_record" "ses_mail_from_mx" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = aws_sesv2_email_identity_mail_from_attributes.site.mail_from_domain
  type    = "MX"
  ttl     = 300

  records = [
    "10 feedback-smtp.ap-northeast-1.amazonses.com"
  ]
}

// Custom MAIL FROMからの送信をSESに許可するSPFレコード
resource "aws_route53_record" "ses_mail_from_spf" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = aws_sesv2_email_identity_mail_from_attributes.site.mail_from_domain
  type    = "TXT"
  ttl     = 300

  records = [
    "v=spf1 include:amazonses.com -all"
  ]
}

// SPFまたはDKIMに失敗したメールを監視するDMARCポリシー
resource "aws_route53_record" "dmarc" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "_dmarc.${aws_sesv2_email_identity.site.email_identity}"
  type    = "TXT"
  ttl     = 300

  records = [
    "v=DMARC1; p=none;"
  ]
}
