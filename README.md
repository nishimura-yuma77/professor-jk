# J.K. Lab

J.K.教授のキャラクター紹介と、彼が担当したプロジェクト・メディアなどを掲載するポートフォリオサイトです。

フロントエンドはNext.jsの静的サイト、バックエンドはPythonのLambdaで構築し、インフラの構成管理からデプロイまでをTerraformとAWSで行っています。

## 本番サイト

https://professor-jk.net

## 技術スタック

### フロントエンド

- Next.js 16
- React 19
- TypeScript
- SCSS

### バックエンド

- Python 3.13
- uv
- AWS Lambda
- API Gateway HTTP API
- Amazon SES

### インフラ・CI/CD

- Terraform
- AWS
  - S3
  - CloudFront
  - CodeBuild
  - Route 53
  - ACM
  - Lambda
  - API Gateway
  - SES

## 開発環境

ローカルでの開発には、以下が必要です。

- Node.js 24
- npm
- Python 3.13
- uv
- Git

フロントエンドの起動に環境変数は必要ありません。バックエンドの環境変数はTerraformでLambdaへ設定します。

## 環境構築

リポジトリをクローンします。

```bash
git clone https://github.com/nishimura-yuma77/professor-jk.git
cd professor-jk
```

依存パッケージをインストールします。

```bash
npm ci
uv sync --directory backend/api-professor-jk
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 主要コマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動します |
| `npm run build` | 静的サイトをビルドし、`out/`へ出力します |
| `npm run lint` | ESLintによる静的解析を実行します |
| `uv run --directory backend/api-professor-jk ruff check src tests` | バックエンドを静的解析します |
| `uv run --directory backend/api-professor-jk pytest` | バックエンドの仕様テストを実行します |

## ディレクトリ構成

```text
.
├── app/          # URLに対応して表示するページ
├── backend/      # Lambdaで動作するバックエンドAPI
├── components/   # UIコンポーネント
├── const/        # サイト内で使用するデータと定数
├── contexts/     # React Context
├── hooks/        # カスタムフック
├── public/       # 画像などの静的ファイル
├── styles/       # 共通スタイル
└── terraform/    # AWSインフラのTerraform定義
```

サブディレクトリの構成と各ディレクトリの設計意図は、[DIRMAP.md](./DIRMAP.md)を参照してください。

## バックエンド設計

`backend/api-professor-jk/src/`は、以下の責務に分割します。

| ディレクトリ | 責務 |
| --- | --- |
| `router/` | パスとHTTPメソッドを判定し、Controllerへ処理を振り分けます |
| `controllers/` | HTTPリクエストの解析、バリデーション、レスポンス生成を行います |
| `services/` | ユースケースを実行し、ドメイン固有の処理を組み立てます |
| `repositories/` | AWS SDKや外部サービスとの通信を担当します |

依存方向は以下の一方向とし、下位層から上位層を参照しません。

```text
handler -> router -> controllers -> services -> repositories
```

### テスト規約

テストは実装の確認コードではなく、実行可能な仕様書として扱います。テスト関数名は以下の形式に統一します。

```text
test_<テスト対象の関数名>_<確認する仕様名>
```

- `<テスト対象の関数名>`には実装上の関数名を記載します。
- `<確認する仕様名>`は日本語で、期待する振る舞いを具体的に記載します。
- 「正常系」「異常系」のような曖昧な名前は使用しません。
- 原則として、1つのテスト関数で1つの仕様を確認します。

```python
def test_route_未定義のパスには404を返す():
    ...


def test_validate_payload_メールアドレスが不正ならエラーを返す():
    ...
```

## デプロイ構成

AWS CodeBuildでフロントエンドとバックエンドを一緒にビルドしています。静的ファイルはS3へ同期してCloudFrontから配信し、Pythonソースと依存パッケージはzip化してLambdaへデプロイします。

独自ドメイン、TLS証明書、配信基盤などのAWSリソースは、`terraform/`内のTerraform定義で管理しています。初期化とstate管理については、[terraform/README.md](./terraform/README.md)を参照してください。

Next.jsを用いてStatic Site Generationを採用しており、将来的にはビルドプロセスに外部のデータ(Youtubeやブログ記事など)を取り込めるように修正する予定です。
