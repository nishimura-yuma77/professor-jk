// CodeBuildがこのRoleを引き受けることを許可する信頼ポリシー
data "aws_iam_policy_document" "codebuild_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}

// CodeBuild用Service Role
resource "aws_iam_role" "codebuild" {
  name = "professor-jk-codebuild-role"

  assume_role_policy = data.aws_iam_policy_document.codebuild_assume_role.json
}

data "aws_iam_policy_document" "codebuild_permissions" {

  // S3 bucket自体への操作
  statement {
    effect = "Allow"

    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation"
    ]

    resources = [
      aws_s3_bucket.site.arn
    ]
  }

  // S3内のオブジェクト操作
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject"
    ]

    resources = [
      "${aws_s3_bucket.site.arn}/*"
    ]
  }

  // CloudFrontキャッシュ削除
  statement {
    effect = "Allow"

    actions = [
      "cloudfront:CreateInvalidation"
    ]

    resources = [
      aws_cloudfront_distribution.site.arn
    ]
  }

  // CodeBuildのログ出力
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      "*"
    ]
  }

  // Github CodeConnectionへのアクセス権限
  statement {
    effect = "Allow"

    actions = [
      "codeconnections:GetConnection",
      "codeconnections:GetConnectionToken"
    ]

    resources = [
      aws_codeconnections_connection.github.arn
    ]
  }

  // Lambdaコードのデプロイ
  statement {
    effect = "Allow"

    actions = [
      "lambda:GetFunctionConfiguration",
      "lambda:UpdateFunctionCode"
    ]

    resources = [
      aws_lambda_function.api.arn
    ]
  }
}

// ロールを作成し、codebuildに割り当て
resource "aws_iam_role_policy" "codebuild" {
  name = "professor-jk-codebuild-policy"
  role = aws_iam_role.codebuild.id

  policy = data.aws_iam_policy_document.codebuild_permissions.json
}

// LambdaがこのRoleを引き受けることを許可する信頼ポリシー
data "aws_iam_policy_document" "api_lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "api_lambda" {
  name               = "professor-jk-api-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.api_lambda_assume_role.json
}

data "aws_iam_policy_document" "api_lambda_permissions" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      "${aws_cloudwatch_log_group.api_lambda.arn}:*"
    ]
  }

  statement {
    effect  = "Allow"
    actions = ["ses:SendEmail"]

    resources = [
      aws_sesv2_email_identity.site.arn
    ]

    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = ["jk@professor-jk.net"]
    }

    condition {
      test     = "ForAllValues:StringEquals"
      variable = "ses:Recipients"
      values   = [var.contact_recipient_email]
    }
  }
}

resource "aws_iam_role_policy" "api_lambda" {
  name   = "professor-jk-api-lambda-policy"
  role   = aws_iam_role.api_lambda.id
  policy = data.aws_iam_policy_document.api_lambda_permissions.json
}
