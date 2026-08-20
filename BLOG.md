# ブログ運用

ブログ記事はslugごとのディレクトリに分け、メタデータと本文をTypeScriptで管理します。

## データ構成

```text
const/blog/
├── index.ts
├── types.ts
├── registry.generated.ts
└── <slug>/
    ├── meta.ts
    └── content.ts
```

- `meta.ts`はタイトル、公開日、draft、LOG番号などを管理します。
- `content.ts`は記事本文を`ArticleBlock[]`として管理します。
- `registry.generated.ts`は記事ディレクトリから自動生成されるため、直接編集もGit管理もしません。

## コマンド

| コマンド | 用途 |
| --- | --- |
| `/blog-new <テーマ・要件>` | OpenCodeで新しいdraft記事を執筆し、検証します |
| `npm run blog:new -- <slug>` | 新しい記事のmetaとcontentだけを作成します |
| `npm run blog:generate` | 完成した記事ディレクトリの追加・削除をregistryへ反映します |
| `npm run dev` | draftを含む記事をローカルで確認します |
| `npm run typecheck` | Next.jsのルート型と記事データを型検査します |
| `npm run build` | 公開記事を静的生成します |

`<slug>`には小文字英数字をハイフンでつないだ文字列を指定します。

```bash
npm run blog:new -- example-article
```

## 新規記事を作る

1. `npm run blog:new -- <slug>`を実行します。
2. 生成された`meta.ts`のタイトルとdescriptionを編集します。
3. `content.ts`のサンプルBlockを記事本文へ置き換えます。
4. `npm run blog:generate`で完成した記事をregistryへ反映します。
5. `npm run dev`で記事ページ、一覧カード、OGPを確認します。
6. 公開時に`draft: true`を`draft: false`へ変更します。
7. `npm run typecheck`と`npm run build`を実行します。

`blog:new`は、既存記事の最大値に続くLOG番号と日本標準時（JST）の作成日を設定します。この時点ではregistryを更新しないため、slugやサンプル本文がdevサーバーへ表示されることはありません。metaとcontentを完成させてから`blog:generate`を実行すると、起動中のTurbopackへ再起動なしで反映されます。

## OpenCodeで新規記事を作る

プロジェクトには新規記事作成用の`create-blog-article` Skillがあります。「新しいブログ記事を作って」のように依頼すると、テーマや資料からslug、meta、Block本文を作成し、検証まで実行します。

明示的に開始する場合は、テーマ、含めたい内容、参考資料などを`/blog-new`へ渡します。

```text
/blog-new Search Consoleのリダイレクト警告について、確認した内容を記事にする
```

Skillは内部で`npm run blog:new -- <slug>`を実行し、生成された`meta.ts`と`content.ts`を編集してから`npm run blog:generate`でregistryへ反映します。情報が不足している場合はファイル作成前に確認し、個人的な体験、計測結果、引用などの不明な事実は補完しません。

作成した記事は常に`draft: true`です。OpenCodeへ公開を明示的に依頼するか、内容を確認して手動で`draft: false`へ変更するまで本番へ公開されません。Skillとslash commandを追加・変更した後は、OpenCodeを終了して再起動すると反映されます。

## metaを編集する

`meta.ts`は`BlogArticleMeta`に対して`satisfies`を使用します。

| 項目 | 内容 |
| --- | --- |
| `slug` | ディレクトリ名と同じslug |
| `title` | 記事タイトル |
| `description` | 一覧、記事ヘッダー、検索・SNS用の概要 |
| `publishedAt` | 公開日。`YYYY-MM-DD`形式 |
| `updatedAt` | 任意の更新日。`YYYY-MM-DD`形式 |
| `draft` | `true`は下書き、`false`は公開 |
| `coverImage` | 任意の独自カバー画像 |
| `logNumber` | 重複しない正の整数 |

新規記事は`draft: true`で作成されます。draft記事はdevelopment環境では表示されますが、production build、sitemap、公開記事一覧、公開OGPの生成対象から除外されます。

LOG番号は10進整数リテラルで記述します。別ブランチで同じ番号の記事が作られた場合はbuild時に重複を検出するため、マージ時に片方を採番し直してください。

## contentを編集する

`content.ts`は`readonly ArticleBlock[]`に対して`satisfies`を使用します。

| `type` | 用途 | 主な項目 |
| --- | --- | --- |
| `paragraph` | 本文 | `id`, `text` |
| `heading` | セクション見出し | `id`, `level`, `text`, `anchor` |
| `list` | 箇条書き・番号付きリスト | `id`, `style`, `items` |
| `imageGallery` | 画像・カルーセル | `id`, `label`, `images` |
| `externalLink` | 関連ページへのリンク | `id`, `label`, `description`, `href` |
| `code` | シンタックスハイライト付きコード | `id`, `language`, `filename`, `code` |

headingの`anchor`はページ内リンクに使用します。listの`style`には、箇条書きの`unordered`または番号付きの`ordered`を指定します。

## 新しいArticleBlockを追加する

記事で新しい表現を使う場合は、Blockの型、表示処理、必要に応じて専用コンポーネントとスタイルを追加します。`ArticleBlock`と`ArticleRenderer`はBlogとExperimentで共有されているため、両方への影響を確認してください。

### 1. ArticleBlockの型を追加する

`const/article.ts`の`ArticleBlock`へ、新しい`type`と必要なデータを追加します。

```ts
| {
    id: string
    type: "quote"
    text: string
    cite?: string
  }
```

`type`はBlockを識別する値です。記事内で繰り返し使用するデータだけを型へ含め、表示方法やReactコンポーネントを記事データへ持たせません。

### 2. 表示コンポーネントを作る

段落や見出しのように単純なHTMLだけで表現できる場合は、`ArticleRenderer.tsx`内で直接描画できます。固有の見た目、複雑なマークアップ、再利用したい処理がある場合は専用コンポーネントへ分離します。

```text
components/feature/blog/ArticleQuote.tsx
styles/feature/blog/ArticleQuote.module.scss
```

コンポーネント固有のスタイルは、`components/feature/blog/`と同じ構成で`styles/feature/blog/`へ配置します。Block間の共通余白や記事全体のレイアウトは`ArticleRenderer.module.scss`で管理します。

### 3. ArticleRendererへcaseを追加する

`components/feature/blog/ArticleRenderer.tsx`でコンポーネントをimportし、`renderBlock()`のswitchへ対応するcaseを追加します。

```tsx
case "quote":
  return <ArticleQuote text={block.text} cite={block.cite} />
```

switchの`default`では`assertNever()`を使用しています。`ArticleBlock`へ型を追加したままcaseを追加し忘れると、`npm run typecheck`で分岐漏れを検出できます。

### 4. Server Componentを基本にする

表示だけを行うBlockはServer Componentとして実装します。state、イベントハンドラ、Clipboard APIなどのブラウザAPIが必要な部分だけを小さなClient Componentへ分離し、ファイルの先頭へ`"use client"`を指定します。

既存実装では、画像カルーセルの`ArticleImageCarousel`とコードコピー操作の`ArticleCodeCopyButton`だけがClient Componentです。ArticleRenderer全体をClient Componentにはしません。

### 5. 記事データで表示を確認する

draft記事の`content.ts`へ新しいBlockを追加します。

```ts
{
  id: "example-quote",
  type: "quote",
  text: "引用文をここに記載します。",
  cite: "引用元",
}
```

既存記事のcontent編集はregistryの構造を変えないため、`npm run blog:generate`は不要です。devサーバー起動中はTurbopackのHMRで反映されます。

### 6. アクセシビリティを確認する

- 内容に適したHTML要素を使用します。
- 操作できる要素はキーボードでも利用できるようにします。
- 視覚的な説明だけでは不足する場合は`aria-label`を設定します。
- 画像には内容を伝えるaltを設定します。
- 自動再生やアニメーションには`prefers-reduced-motion`を反映します。
- 外部リンクを別タブで開く場合は`rel="noopener noreferrer"`を設定します。

### 7. 影響範囲とBlock一覧を更新する

ArticleRendererはExperiment詳細でも使用されています。Blogの記事だけでなく、既存のExperiment詳細が表示できることも確認します。

新しいBlockを追加したら、このドキュメントの「contentを編集する」にあるBlock一覧へ、`type`、用途、主な項目を追記します。

### 8. 検証する

```bash
npm run lint
npm run typecheck
npm run build
```

型、Rendererの分岐、draft記事での表示、Blog一覧・記事ページ、Experiment詳細、本番buildを確認します。

## 既存記事を編集する

registryはmetaとcontentを静的importしています。既存記事の内容を編集した場合はTurbopackのHMRが働くため、`blog:generate`やdevサーバーの再起動は不要です。

## 記事を手動で追加する

1. `const/blog/<slug>/`を作成します。
2. 型付きの`meta.ts`と`content.ts`を両方配置します。
3. `npm run blog:generate`を実行します。
4. devサーバー起動中の場合は、生成されたregistryがHMRで反映されます。

片方のファイルがない記事、無効なディレクトリ名、slugとディレクトリ名の不一致、重複したLOG番号、空の本文、不正な日付はdevまたはbuildで検出されます。

## 記事を手動で削除する

エラー表示を避ける場合は、次の順序で削除します。

1. devサーバーを停止します。
2. `const/blog/<slug>/`を削除します。
3. `npm run blog:generate`を実行します。
4. 必要に応じて`npm run dev`を再開します。

devサーバーを止めずに削除する場合は、記事ディレクトリを削除した直後にregistryを更新します。

```bash
npm run blog:generate
```

registryが更新されるまでは、削除済みのmetaまたはcontentに対する`Module not found`が一時的に表示される場合があります。registry更新後はdevサーバーを再起動しなくても復旧します。

## OGPとカバー画像

記事ごとのOGPは`/blog/<slug>/og.png`へ生成されます。

`coverImage`を指定しない場合は、生成OGPを一覧カードと記事HEROへ自動的に使用します。独自画像を使用する場合は、`meta.ts`へ`coverImage`を指定します。

## registryの扱い

- `registry.generated.ts`は直接編集しません。
- `registry.generated.ts`はGitへ追加しません。
- `blog:new`はmetaとcontentだけを作成し、registryは更新しません。
- 新規記事のmeta/contentを完成させてから`npm run blog:generate`を実行します。
- 既存記事のmeta/content編集ではregistry更新は不要です。
- 記事ディレクトリの手動追加・削除後は`npm run blog:generate`を実行します。
- `dev`、`build`、`lint`、`typecheck`の開始前にもregistryは自動生成されます。

## トラブルシューティング

### 追加した記事が一覧に表示されない

`blog:new`または手動操作で記事を追加した場合は、metaとcontentを完成させてからregistryを更新します。

```bash
npm run blog:generate
```

### 記事削除後にModule not foundが表示される

削除済み記事のimportがregistryに残っています。`npm run blog:generate`を実行します。

### LOG番号の重複エラーが出る

各記事の`logNumber`を確認し、重複しない整数へ変更します。

### meta.tsまたはcontent.tsがないと表示される

slugディレクトリに両方のファイルを配置した後、`npm run blog:generate`を再実行します。

### OGPが表示されない

`/blog/<slug>/og.png`へ直接アクセスして応答を確認します。記事がdraftの場合、production buildではOGPが生成されません。
