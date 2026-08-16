# J.K. Lab

J.K.教授のキャラクター紹介と、彼が担当したプロジェクト・メディアなどを掲載するポートフォリオサイトです。

Next.jsで静的サイトとして構築し、インフラの構成管理からデプロイまでをTerraformとAWSで行っています。

将来的にはLambdaで簡単なPublic API追加とCMS化を図ります。

## 本番サイト

https://professor-jk.net

## 技術スタック

### フロントエンド

- Next.js 16
- React 19
- TypeScript
- SCSS

### インフラ・CI/CD

- Terraform
- AWS
  - S3
  - CloudFront
  - CodeBuild
  - Route 53
  - ACM

## 開発環境

ローカルでの開発には、以下が必要です。

- Node.js 24
- npm
- Git

アプリケーションの起動に環境変数は必要ありません。

## 環境構築

リポジトリをクローンします。

```bash
git clone https://github.com/nishimura-yuma77/professor-jk.git
cd professor-jk
```

依存パッケージをインストールします。

```bash
npm ci
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

## ディレクトリ構成

```text
.
├── app/          # URLに対応して表示するページ
├── components/   # UIコンポーネント
├── const/        # サイト内で使用するデータと定数
├── contexts/     # React Context
├── hooks/        # カスタムフック
├── public/       # 画像などの静的ファイル
├── styles/       # 共通スタイル
└── terraform/    # AWSインフラのTerraform定義
```

サブディレクトリの構成と各ディレクトリの設計意図は、[DIRMAP.md](./DIRMAP.md)を参照してください。

## デプロイ構成

`npm run build`で生成した静的ファイルを、AWS CodeBuildからS3へ同期しています。サイトはCloudFront経由で配信し、デプロイ後にCloudFrontのキャッシュを無効化します。

独自ドメイン、TLS証明書、配信基盤などのAWSリソースは、`terraform/`内のTerraform定義で管理しています。初期化とstate管理については、[terraform/README.md](./terraform/README.md)を参照してください。

Next.jsを用いてStatic Site Generationを採用しており、将来的にはビルドプロセスに外部のデータ(Youtubeやブログ記事など)を取り込めるように修正する予定です。
