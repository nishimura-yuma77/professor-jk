terraform {
  backend "s3" {
    bucket              = "professor-jk-terraform-state-544468261735"
    key                 = "production/terraform.tfstate"
    region              = "ap-northeast-1"
    encrypt             = true
    use_lockfile        = true
    allowed_account_ids = ["544468261735"]
  }
}
