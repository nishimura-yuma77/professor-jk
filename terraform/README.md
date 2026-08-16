# Terraform

J.K. LabのAWSリソースを管理するTerraform構成です。

## Backend

tfstateは、VersioningとSSE-S3を有効にした非公開S3バケットで管理します。S3 lockfileを使用するため、複数端末から同時にstateを更新することはできません。

```text
Bucket: professor-jk-terraform-state-544468261735
Key:    production/terraform.tfstate
Region: ap-northeast-1
Lock:   production/terraform.tfstate.tflock
```

state用バケットは、管理対象のインフラと一緒に削除されないようTerraformの管理外で作成しています。

## 前提条件

- Terraform 1.15以上
- AWS CLI
- AWSアカウント`544468261735`へのアクセス権限

## 初期化

AWSへログインし、対象アカウントを確認します。

```powershell
aws login
aws sts get-caller-identity
```

Terraformを初期化します。

```powershell
terraform -chdir=terraform init
```

stateと実環境の差分を確認します。

```powershell
terraform -chdir=terraform state list
terraform -chdir=terraform plan
```

別PCでも同じ手順を実行します。ローカルの`.terraform/`や`terraform.tfstate`を端末間でコピーする必要はありません。

## State Lock

Terraformの実行中はS3に`production/terraform.tfstate.tflock`が作成されます。ほかの端末が操作中の場合は、その処理が終わるまで待ってください。

- `-lock=false`は使用しない
- 複数端末から同時に`apply`しない
- `force-unlock`は、ほかの端末でTerraformが動いていないことを確認してから使用する

stale lockを解除する必要がある場合は、エラーに表示されたLock IDを使用します。

```powershell
terraform -chdir=terraform force-unlock <LOCK_ID>
```

## State Recovery

stateバケットではVersioningを有効にしています。誤更新が発生した場合は、まずS3上のバージョンを確認します。

```powershell
aws s3api list-object-versions `
  --bucket professor-jk-terraform-state-544468261735 `
  --prefix production/terraform.tfstate
```

復旧操作の前に現在のstateをバックアップし、ほかの端末でTerraformが動いていないことを確認してください。S3の旧バージョン復元や`terraform state push`はstateを上書きするため、通常の運用では使用しません。
