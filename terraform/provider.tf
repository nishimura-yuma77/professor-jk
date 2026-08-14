provider "aws" {
  region = "ap-northeast-1"

  default_tags {
    tags = {
      Project = "professor-jk"
    }
  }
}

// CloudFrontで独自ドメインを使う証明書はus-east-1に置く必要がある。そのため、別途providerをus-east-1に追加
provider "aws" {
  alias = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = {
      Project = "professor-jk"
    }
  }
}