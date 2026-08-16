// CodeBuildがアプリコードをデプロイするまで使用する初回作成用zip
data "archive_file" "api_lambda_bootstrap" {
  type                    = "zip"
  output_file_mode        = "0666"
  output_path             = "${path.module}/.terraform/api-professor-jk-bootstrap.zip"
  source_content_filename = "handler.py"
  source_content          = <<-PYTHON
    import json

    def lambda_handler(_event, _context):
        return {
            "statusCode": 503,
            "headers": {"content-type": "application/json"},
            "body": json.dumps({"message": "Service unavailable."}),
        }
  PYTHON
}

// Lambda実行ログ
resource "aws_cloudwatch_log_group" "api_lambda" {
  name              = "/aws/lambda/professor-jk-api"
  retention_in_days = 30
}

// すべてのバックエンドパスを処理する単一Lambda
resource "aws_lambda_function" "api" {
  filename         = data.archive_file.api_lambda_bootstrap.output_path
  source_code_hash = data.archive_file.api_lambda_bootstrap.output_base64sha256

  function_name = "professor-jk-api"
  role          = aws_iam_role.api_lambda.arn
  handler       = "handler.lambda_handler"
  runtime       = "python3.13"
  architectures = ["x86_64"]

  memory_size = 256
  timeout     = 10

  environment {
    variables = {
      CONTACT_SENDER_EMAIL    = "jk@professor-jk.net"
      CONTACT_RECIPIENT_EMAIL = var.contact_recipient_email
    }
  }

  logging_config {
    application_log_level = "INFO"
    log_format            = "JSON"
    log_group             = aws_cloudwatch_log_group.api_lambda.name
    system_log_level      = "WARN"
  }

  depends_on = [
    aws_cloudwatch_log_group.api_lambda,
    aws_iam_role_policy.api_lambda
  ]
}

// API GatewayからこのLambdaだけを呼び出せるようにする
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/$default/$default"
}
