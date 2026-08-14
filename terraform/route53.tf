// domainに紐づいたhosted zoneの取得
data "aws_route53_zone" "site" {
  name = "professor-jk.net"
  private_zone = false
}

// acmのdomain_validation_optionからレコード名・値・型を取り出してRoute53に登録する。
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options :
    dvo.domain_name => {
      name = dvo.resource_record_name
      record = dvo.resource_record_value
      type = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.site.zone_id

  name = each.value.name
  type = each.value.type
  records = [each.value.record]

  ttl = 60
}

// cloudfrontを向くalias Aを作成する
resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.site.zone_id
  name = "professor-jk.net"
  type = "A"

  alias {
    name = aws_cloudfront_distribution.site.domain_name
    zone_id = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}