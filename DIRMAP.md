# Directory Map

このドキュメントでは、プロジェクト内の主要なディレクトリと役割を説明します。

`.next/`、`out/`、`node_modules/`などの生成物や依存パッケージは対象外です。

## 構成

```text
.
├── app/                  # ページ、レイアウト、メタデータを管理
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
│   ├── feature/          # 機能単位のまとまり。将来はAPI通信や関連ロジックも管理
│   ├── primitives/       # Propsを広く公開した、細かく調整可能な低レベル部品
│   ├── providers/        # アプリ全体へ状態や機能を提供するProvider
│   └── ui/               # 呼び出すだけで再利用できる汎用UI
├── const/                # データ、型、定数
├── contexts/             # React Context
├── hooks/                # カスタムフック
├── public/               # 静的ファイル
│   └── images/           # サイト内で使用する画像
│       └── character/    # キャラクター画像
├── styles/               # コンポーネントに対応するSCSS Modules
│   ├── feature/          # components/feature/に対応
│   ├── primitives/       # components/primitives/に対応
│   ├── ui/               # components/ui/に対応
│   └── variables/        # ブレークポイントなどの共通SCSS変数
└── terraform/            # AWSインフラのTerraform定義
```

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

`styles/`は`components/`のディレクトリ構成を踏襲します。固有のスタイルを持つコンポーネントには、同じ分類とファイル名のSCSS Moduleを1対1で配置します。

```text
components/ui/Logo.tsx
styles/ui/Logo.module.scss
```

インラインSVGやProviderなど、固有のスタイルを持たないコンポーネントは対象外です。
