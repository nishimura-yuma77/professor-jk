// Route53独自ドメイン用ACM証明書
resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name       = "professor-jk.net"
  validation_method = "DNS"
}

// acm証明書が使えるようになるまで待つことをterraformに教えてあげる
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.site.arn

  validation_record_fqdns = [
    for record in aws_route53_record.acm_validation :
    record.fqdn
  ]
}

// API Gateway独自ドメイン用ACM証明書
resource "aws_acm_certificate" "api" {
  domain_name       = "api.professor-jk.net"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

// API用ACM証明書のDNS検証が完了するまで待つ
resource "aws_acm_certificate_validation" "api" {
  certificate_arn = aws_acm_certificate.api.arn

  validation_record_fqdns = [
    for record in aws_route53_record.api_acm_validation :
    record.fqdn
  ]
}
