// フロントソース配置用のs3バケット
resource "aws_s3_bucket" "site" {
  bucket_prefix = "professor-jk-site-" // 作成するバケットのprefix
}

// s3バケットへのpublicアクセスを制限する
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls = true // public ACLを作れない
  block_public_policy = true // public policyを作らせない
  ignore_public_acls = true // public ACLを利かない
  restrict_public_buckets = true // public policyがあってもpublicアクセスを制限
}

// CloudFront Origin Access Control CloudFrontがprivate s3を読めるようにする
resource "aws_cloudfront_origin_access_control" "site" {
  name = "professor-jk-oac"
  description = "Origin Access Control for professor-jk site"
  origin_access_control_origin_type = "s3"
  signing_behavior = "always" // CloudFront -> S3の署名を常に行う。CloudFront経由のリクエストであることを証明する
  signing_protocol = "sigv4" // AWS　Signature Version 4での署名(現状署名方式はこれひとつのみ)
}

resource "aws_cloudfront_function" "rewrite_uri" {
  name    = "professor-jk-rewrite-uri"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite extensionless paths to static HTML objects"
  publish = true
  code    = file("${path.module}/cloudfront-functions/rewrite-uri.js")
}

// CloudFrontのディストリビューション
resource "aws_cloudfront_distribution" "site" {
  enabled = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id = "professor-jk-s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id = "professor-jk-s3-origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_uri.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [
    "professor-jk.net"
  ]

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  // 存在しないURLへのアクセス時、S3が403を返す場合があるため、403と404を404ページへ統一する
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }
}

data "aws_iam_policy_document" "site_bucket_policy" {
  statement {
    sid = "AllowCloudFrontReadOnly"
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.site.arn}/*"
    ]

    // CloudFrontからのアクセスをすべて許可にはせず、このアプリのディストリビューションからのみのアクセスを許可する
    condition {
      test = "StringEquals"
      variable = "AWS:SourceArn"
      values = [
        aws_cloudfront_distribution.site.arn
      ]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_bucket_policy.json
}
