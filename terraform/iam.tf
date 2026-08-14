// CodeBuildがこのRoleを引き受けることを許可する信頼ポリシー
data "aws_iam_policy_document" "codebuild_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
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
}

// ロールを作成し、codebuildに割り当て
resource "aws_iam_role_policy" "codebuild" {
  name = "professor-jk-codebuild-policy"
  role = aws_iam_role.codebuild.id

  policy = data.aws_iam_policy_document.codebuild_permissions.json
}