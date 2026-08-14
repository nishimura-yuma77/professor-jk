// github <-> codebuildの間をつなぐため、codeconnectionを利用する
resource "aws_codeconnections_connection" "github" {
  name = "professor-jk-github"
  provider_type = "GitHub"
}