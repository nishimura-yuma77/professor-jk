# J.K. Lab

J.K.教授のキャラクター紹介と、彼が担当したプロジェクト・メディアなどを掲載するポートフォリオサイトです。

フロントエンドはNext.jsで静的出力し、バックエンドはPythonのLambdaで構築しています。お問い合わせ送信時は、静的配信されたフロントエンドからブラウザ経由でバックエンドAPIを呼び出します。インフラの構成管理からデプロイまではTerraformとAWSで行っています。

## 本番サイト

https://professor-jk.net

## 技術スタック

### フロントエンド

- Next.js 16
- React 19
- TypeScript
- SCSS
- TanStack Query

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

フロントエンドの起動に必須の環境変数はありません。Contact APIを呼び出さず成功レスポンスを返す任意の開発用モックは、[`.env.local.example`](./.env.local.example)の`NEXT_PUBLIC_USE_CONTACT_API_MOCK`で切り替えます。バックエンドの環境変数はTerraformでLambdaへ設定します。

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
├── api/          # ブラウザからバックエンドを呼び出すAPIクライアント
├── app/          # ページ、レイアウト、メタデータ、ページ固有スタイル
├── backend/      # Lambdaで動作するバックエンドAPI
├── components/   # UIコンポーネント
├── const/        # サイト内で使用するデータ、型、定数
├── contexts/     # React Context
├── hooks/        # UIロジックとデータアクセス用カスタムフック
├── public/       # 画像などの静的ファイル
├── styles/       # コンポーネント対応SCSS Modulesと共通SCSS変数
└── terraform/    # AWSインフラのTerraform定義
```

サブディレクトリの構成と各ディレクトリの設計意図は、[DIRMAP.md](./DIRMAP.md)を参照してください。

## フロントエンド設計

### ページ固有コンポーネント

`app/`にはNext.jsのページ、レイアウト、メタデータと、ページ全体の外枠を担当するスタイルを配置します。ページから抽出したコンポーネントは、そのページでしか使用しない場合でも`components/feature/`へ配置します。複数のコンポーネントで1つの機能を構成する場合は、`components/feature/contact/`のように機能名のディレクトリへまとめます。

コンポーネント固有のSCSS Moduleは`components/`の構成に対応させて`styles/`へ配置します。たとえば、`components/feature/contact/ContactGuide.tsx`のスタイルは`styles/feature/contact/ContactGuide.module.scss`で管理します。

### APIアクセス

フロントエンドのデータアクセスは、以下の依存方向に統一します。

```text
app/components -> hooks/query・hooks/mutation -> api -> const
```

- `app/`と`components/`から`api/`を直接参照したり、`fetch`を直接実行したりしません。
- 読み取り処理はTanStack Queryの`useQuery`、作成・更新・削除・送信などの副作用は`useMutation`を使用します。
- UIは`useQuery`や`useMutation`を直接組み立てず、`hooks/query/`または`hooks/mutation/`の機能別カスタムフックを利用します。
- `api/`はHTTP通信、DTO、レスポンス解析、API固有エラーを担当し、ReactやTanStack Queryには依存しません。
- UIで必要な入力型やエラー判定は、カスタムフックの公開インターフェースを通して利用します。
- フロントエンドの入力検証は即時フィードバックのために行い、バックエンドの入力検証を正式な判定とします。

現在は読み取りAPIがないため`hooks/query/`は未作成です。読み取り処理を追加する際に、この規則に従って作成します。

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
