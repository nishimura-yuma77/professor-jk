output "s3_bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "api_base_url" {
  value = "https://${aws_apigatewayv2_domain_name.api.domain_name}"
}

output "api_lambda_function_name" {
  value = aws_lambda_function.api.function_name
}
