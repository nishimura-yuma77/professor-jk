// バックエンドを公開するHTTP API
resource "aws_apigatewayv2_api" "api" {
  name          = "professor-jk-api"
  protocol_type = "HTTP"

  disable_execute_api_endpoint = true
  ip_address_type              = "ipv4"

  cors_configuration {
    allow_headers = ["content-type"]
    allow_methods = ["POST", "OPTIONS"]
    allow_origins = ["https://professor-jk.net"]
    max_age       = 86400
  }
}

// API Gatewayのアクセスログ
resource "aws_cloudwatch_log_group" "api_access" {
  name              = "/aws/apigateway/professor-jk-api"
  retention_in_days = 30
}

// URLにステージ名を含めない本番用ステージ
resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.api.id
  name   = "$default"

  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_access.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      ip               = "$context.identity.sourceIp"
      requestTime      = "$context.requestTime"
      httpMethod       = "$context.httpMethod"
      routeKey         = "$context.routeKey"
      status           = "$context.status"
      protocol         = "$context.protocol"
      responseLength   = "$context.responseLength"
      integrationError = "$context.integrationErrorMessage"
    })
  }

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 5
  }
}

// API Gatewayでapi.professor-jk.netを受け付ける
resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "api.professor-jk.net"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.api.certificate_arn
    endpoint_type   = "REGIONAL"
    ip_address_type = "ipv4"
    security_policy = "TLS_1_2"
  }
}

// 独自ドメインのルートを$defaultステージに対応させる
resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.default.id
}

// HTTP APIのすべてのリクエストを単一Lambdaへ渡す
resource "aws_apigatewayv2_integration" "api_lambda" {
  api_id = aws_apigatewayv2_api.api.id

  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.api.invoke_arn

  payload_format_version = "2.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.api_lambda.id}"
}
