// code buildはgithubへの認証方式としてcode connectionを使う
resource "aws_codebuild_source_credential" "github" {
  auth_type   = "CODECONNECTIONS"
  server_type = "GITHUB"
  token       = aws_codeconnections_connection.github.arn
}

// codebuild本体
resource "aws_codebuild_project" "site" {
  name         = "professor-jk-build"
  description  = "Build and deploy professor-jk"
  service_role = aws_iam_role.codebuild.arn

  // codebuild自身のartifact保存機能は使わない
  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux-x86_64-standard:6.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = false

    // buildspec.yml用の環境変数の注入
    environment_variable {
      name  = "S3_BUCKET_NAME"
      value = aws_s3_bucket.site.bucket
    }
    environment_variable {
      name  = "CLOUDFRONT_DISTRIBUTION_ID"
      value = aws_cloudfront_distribution.site.id
    }
    environment_variable {
      name  = "LAMBDA_FUNCTION_NAME"
      value = aws_lambda_function.api.function_name
    }
  }

  // ビルド対象
  source {
    type     = "GITHUB"
    location = "https://github.com/nishimura-yuma77/professor-jk.git"

    auth {
      type     = "CODECONNECTIONS"
      resource = aws_codeconnections_connection.github.arn
    }
  }

  // 今後別経路でのStartBuildが発生した場合もデフォルトでmainをbuildする。
  source_version = "main"
}

// githubにてmainブランチへのpushが発生した場合にcodebuildを起動するwebhook
resource "aws_codebuild_webhook" "site" {
  project_name = aws_codebuild_project.site.name

  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "^refs/heads/main$"
    }
  }
}
