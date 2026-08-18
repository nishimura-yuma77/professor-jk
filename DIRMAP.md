# Directory Map

このドキュメントでは、プロジェクト内の主要なディレクトリと役割を説明します。

`.next/`、`out/`、`node_modules/`などの生成物や依存パッケージは対象外です。

## 構成

```text
.
├── api/                  # フロントエンドのHTTP通信とAPI入出力を管理
├── app/                  # ページ、レイアウト、メタデータ、ページ固有スタイルを管理
├── backend/              # バックエンドAPI
│   └── api-professor-jk/
│       ├── src/
│       │   ├── handler.py       # Lambdaエントリポイント
│       │   ├── router/          # パスとHTTPメソッドによるルーティング
│       │   ├── controllers/     # HTTP入出力とバリデーション
│       │   ├── services/        # ユースケースとドメイン固有処理
│       │   └── repositories/    # AWS SDKと外部サービスへのアクセス
│       └── tests/               # src/の構成に対応する仕様テスト
├── components/           # Reactコンポーネント
│   ├── feature/          # ページや機能単位のコンポーネント
│   │   ├── contact/      # Contactページの機能コンポーネント
│   │   └── play-with-jk/ # Play With J.K.ページの機能コンポーネント
│   ├── primitives/       # Propsを広く公開した、細かく調整可能な低レベル部品
│   ├── providers/        # アプリ全体へ状態や機能を提供するProvider
│   └── ui/               # 呼び出すだけで再利用できる汎用UI
├── const/                # データ、型、定数
├── contexts/             # React Context
├── hooks/                # カスタムフック
│   └── mutation/         # useMutationを利用する更新・送信系カスタムフック
├── public/               # 静的ファイル
│   └── images/           # サイト内で使用する画像
│       └── character/    # キャラクター画像
├── styles/               # コンポーネントに対応するSCSS Modules
│   ├── feature/          # components/feature/に対応
│   │   ├── contact/      # components/feature/contact/に対応
│   │   └── play-with-jk/ # components/feature/play-with-jk/に対応
│   ├── primitives/       # components/primitives/に対応
│   ├── ui/               # components/ui/に対応
│   └── variables/        # ブレークポイントなどの共通SCSS変数
└── terraform/            # AWSインフラのTerraform定義
```

## フロントエンドの配置規則

| ディレクトリ | 配置するもの |
| --- | --- |
| `app/` | Next.jsのページ、レイアウト、メタデータ、ページ全体の外枠を担当するSCSS Module |
| `components/feature/` | ページや機能を構成するコンポーネント。複数ページでの再利用は必須としない |
| `components/ui/` | 呼び出すだけで再利用できる、用途の定まった汎用UI |
| `components/primitives/` | Propsを広く公開した、細かく調整可能な低レベル部品 |
| `components/providers/` | Contextや外部ライブラリの機能をアプリ全体へ提供するProvider |

特定ページでのみ使用するコンポーネントも、ページから抽出した時点で`components/feature/`へ配置します。複数のコンポーネントで1つの機能を構成する場合は、`components/feature/contact/`のように機能名のディレクトリへまとめます。

ページ全体のレイアウトや外枠を担当するスタイルは`app/<route>/`に残します。抽出したコンポーネント固有のスタイルは、後述する規則に従って`styles/`へ配置します。

## フロントエンドAPIの配置規則

トップレベルの`api/`は、ブラウザからバックエンドAPIを呼び出すためのクライアント層です。Next.js Route Handlerの`app/api/`や、サーバー実装の`backend/api-professor-jk/`とは異なります。

フロントエンドの依存方向は以下に統一します。

```text
app/components -> hooks/query・hooks/mutation -> api -> const
```

| ディレクトリ | 配置する処理 |
| --- | --- |
| `api/` | HTTP通信、リクエスト・レスポンスDTO、レスポンス解析、API固有エラー |
| `hooks/query/` | `useQuery`を利用する読み取り系カスタムフック |
| `hooks/mutation/` | `useMutation`を利用する作成・更新・削除・送信系カスタムフック |

- `app/`と`components/`から`api/`を直接参照しません。
- `app/`と`components/`では`fetch`を直接実行しません。
- UIは`useQuery`や`useMutation`を直接組み立てず、機能別カスタムフックを利用します。
- `api/`はReactやTanStack Queryに依存しない実装とします。
- UIで必要な入力型やエラー判定は、カスタムフックの公開インターフェースを通して提供します。
- フロントエンドの入力検証は利用者への即時フィードバックを目的とし、バックエンドの入力検証を正式な判定とします。

現在は読み取りAPIがないため`hooks/query/`は存在しません。読み取り処理を追加する際は、この規則に従って作成します。

## バックエンドの配置規則

バックエンドは以下の依存方向を守ります。

```text
handler -> router -> controllers -> services -> repositories
```

| ディレクトリ | 配置する処理 |
| --- | --- |
| `router/` | URLパスとHTTPメソッドの判定、Controllerの呼び出し |
| `controllers/` | リクエスト解析、入力値検証、HTTPレスポンス生成 |
| `services/` | ユースケース、通知内容などのドメイン固有処理 |
| `repositories/` | boto3や外部APIを利用した入出力処理 |

`tests/`は`src/`のディレクトリ構成を踏襲します。テスト関数は仕様書として読めるよう、`test_<テスト対象の関数名>_<日本語の仕様名>`の形式で命名します。

## スタイルの配置規則

`styles/`は`components/`のディレクトリ構成を踏襲します。固有のスタイルを持つコンポーネントには、同じ分類、サブディレクトリ、ファイル名のSCSS Moduleを1対1で配置します。

```text
components/ui/Logo.tsx
styles/ui/Logo.module.scss

components/feature/contact/ContactGuide.tsx
styles/feature/contact/ContactGuide.module.scss
```

インラインSVGやProviderなど、固有のスタイルを持たないコンポーネントは対象外です。`app/page.module.scss`や`app/contact/page.module.scss`のようなページ全体の外枠を担当するスタイルは、対応するページと同じ`app/`配下に配置します。
