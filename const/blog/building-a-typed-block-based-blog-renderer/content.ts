import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "J.K. LabのBlogでは、記事本文をMarkdownやHTMLではなく、TypeScriptの型が付いたオブジェクトの配列として管理しています。段落、見出し、リスト、画像ギャラリーといった要素をBlockとして定義し、そのtypeに応じてReactコンポーネントへ変換する仕組みです。",
  },
  {
    id: "opening-purpose",
    type: "paragraph",
    text: "この構成を選んだ目的は、汎用的なCMSを自作することではありません。記事数がまだ少ない段階で、一覧、本文、サイトマップ、OGPを一つのデータから生成しながら、画像ギャラリーやコードブロックのような表現を必要に応じて追加するためです。この記事では、その中心にあるArticleBlockの型とswitchによる描画処理を紹介します。",
  },
  {
    id: "opening-workflow",
    type: "paragraph",
    text: "Blockごとにidやtypeを書く形式は、人間が直接入力するならMarkdownより煩雑です。一方、現在の記事管理はGitとterminalが中心で、定型的なデータ作成はコーディングエージェントへ任せられます。その前提では、記述量の多さよりも、型で守られた専用コンポーネントを自由に選べることの方が大きな利点になっています。",
  },
  {
    id: "block-array",
    type: "heading",
    level: 2,
    text: "記事本文をBlockの配列として持つ",
    anchor: "block-array",
  },
  {
    id: "block-array-description",
    type: "paragraph",
    text: "記事を構成する要素は、ArticleBlockというDiscriminated Unionで表現しています。すべてのBlockがidとtypeを持ち、typeごとに必要なデータだけを追加します。",
  },
  {
    id: "block-type-code",
    type: "code",
    language: "typescript",
    filename: "const/blog.ts",
    code: `export type ArticleBlock =
  | {
  id: string
  type: "heading"
  level: 2 | 3
  text: string
  anchor: string
}
  | {
  id: string
  type: "paragraph"
  text: string
}
  | {
  id: string
  type: "code"
  language: BundledLanguage
  filename?: string
  code: string
}`,
  },
  {
    id: "block-type-benefit",
    type: "paragraph",
    text: "たとえばtypeがheadingならlevelとanchorが必須になり、paragraphならtextだけが必要です。存在しない組み合わせを記事データへ書くと、satisfiesによる型検査でビルド前に気付けます。本文を自由なオブジェクトとして扱うのではなく、表示可能な表現の一覧を型として残している状態です。",
  },
  {
    id: "switch-renderer",
    type: "heading",
    level: 2,
    text: "switchに描画ルールを集める",
    anchor: "switch-renderer",
  },
  {
    id: "switch-renderer-description",
    type: "paragraph",
    text: "ArticleRendererはBlockの配列を受け取り、各要素をrenderBlockへ渡します。renderBlockではtypeを見て、対応するHTML要素または専用コンポーネントを返します。",
  },
  {
    id: "switch-renderer-code",
    type: "code",
    language: "tsx",
    filename: "components/feature/blog/ArticleRenderer.tsx",
    code: `function renderBlock(block: ArticleBlock) {
  switch (block.type) {
case "heading": {
  const Heading = block.level === 2 ? "h2" : "h3"
  return <Heading id={block.anchor}>{block.text}</Heading>
}
case "paragraph":
  return <p>{block.text}</p>
case "list": {
  const List = block.style === "ordered" ? "ol" : "ul"
  return (
    <List>
      {block.items.map((item) => <li key={item.id}>{item.text}</li>)}
    </List>
  )
}
case "imageGallery":
  return <ArticleImageGallery label={block.label} images={block.images} />
case "externalLink":
  return <a href={block.href}>{block.label}</a>
case "code":
  return (
    <ArticleCodeBlock
      code={block.code}
      language={block.language}
      filename={block.filename}
    />
  )
default:
  return assertNever(block)
  }
}`,
  },
  {
    id: "switch-renderer-responsibility",
    type: "paragraph",
    text: "このswitchは、データ上のBlockと画面上の振る舞いを対応させる場所です。記事データには表示ロジックを持たせず、Rendererにも記事固有の内容を書きません。新しい表現を追加するときは、型と分岐を一つずつ増やすため、変更箇所を追いやすくなります。",
  },
  {
    id: "never-check",
    type: "heading",
    level: 2,
    text: "neverで分岐漏れを検出する",
    anchor: "never-check",
  },
  {
    id: "never-check-description",
    type: "paragraph",
    text: "switchのdefaultでは、引数にneverしか受け取れないassertNeverを呼び出しています。すべてのtypeを処理できていれば、defaultへ到達する時点のblockはneverになります。",
  },
  {
    id: "never-check-code",
    type: "code",
    language: "typescript",
    filename: "components/feature/blog/ArticleRenderer.tsx",
    code: `function assertNever(block: never): never {
  throw new Error("Unsupported article block: " + JSON.stringify(block))
}`,
  },
  {
    id: "never-check-result",
    type: "paragraph",
    text: "ArticleBlockへ新しいtypeを追加したのにswitchへcaseを書き忘れると、blockをneverとして渡せずTypeScriptエラーになります。実行して画面を確認する前に、型の追加と表示処理の追加が揃っていないことを検出できます。",
  },
  {
    id: "component-boundary",
    type: "heading",
    level: 2,
    text: "すべてをRendererへ押し込まない",
    anchor: "component-boundary",
  },
  {
    id: "component-boundary-description",
    type: "paragraph",
    text: "switchは分岐の一覧として保ち、複雑な振る舞いは専用コンポーネントへ渡します。画像が複数ある場合のカルーセル操作はArticleImageGalleryの先へ、コードのハイライト処理はArticleCodeBlockの先へ分離しています。",
  },
  {
    id: "component-boundary-items",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "renderer-role",
        text: "ArticleRendererはtypeと表示先の対応を管理する",
      },
      {
        id: "server-role",
        text: "ArticleCodeBlockはServer ComponentとしてShikiをビルド時に実行する",
      },
      {
        id: "client-role",
        text: "ArticleCodeCopyButtonだけをClient ComponentにしてClipboard APIを扱う",
      },
    ],
  },
  {
    id: "shiki-component-code",
    type: "code",
    language: "tsx",
    filename: "components/feature/blog/ArticleCodeBlock.tsx",
    code: `export default async function ArticleCodeBlock({
  code,
  language,
  filename,
}: ArticleCodeBlockProps) {
  const highlightedCode = await codeToHtml(code, {
lang: language,
theme: "vesper",
  })

  return (
<figure aria-label={filename ?? language}>
  <ArticleCodeCopyButton code={code} />
  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
</figure>
  )
}`,
  },
  {
    id: "shiki-component-details",
    type: "paragraph",
    text: "Shikiが生成するHTMLは、リポジトリ内で管理している記事データだけを入力としてビルド時に生成します。ブラウザへShiki本体を配信せず、操作が必要なコピーボタンだけにクライアント側のJavaScriptを限定しています。",
  },
  {
    id: "shared-layout",
    type: "heading",
    level: 2,
    text: "共通レイアウトとBlock固有の見た目を分ける",
    anchor: "shared-layout",
  },
  {
    id: "shared-layout-description",
    type: "paragraph",
    text: "ArticleRendererは、すべてのBlockを共通のdivで囲みます。Block間の基本的な余白と横幅の制約は共通化し、見出しだけ余白を広げるといった文脈上の調整もRenderer側のスタイルで行います。",
  },
  {
    id: "shared-layout-code",
    type: "code",
    language: "scss",
    filename: "styles/feature/blog/ArticleRenderer.module.scss",
    code: `.content {
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.875rem;
}

.block {
  min-width: 0;
  max-width: 100%;
}

.block:has(h2.heading) {
  margin-top: 1.5rem;
}`,
  },
  {
    id: "shared-layout-result",
    type: "paragraph",
    text: "一方、コードブロック内部のツールバー、横スクロール、フォント、コピーボタンは専用のSCSS Moduleへ置きます。共通レイアウトと固有表現を分けることで、Blockが増えてもArticleRendererの見通しを保ちます。",
  },
  {
    id: "adding-code-block",
    type: "heading",
    level: 2,
    text: "CodeBlockも同じ手順で追加できる",
    anchor: "adding-code-block",
  },
  {
    id: "adding-code-block-description",
    type: "paragraph",
    text: "今回追加したCodeBlockも、特別な経路は使っていません。ArticleBlockへcode型を追加し、Rendererのswitchへcaseを加え、記事データへ対応するオブジェクトを書いています。この記事内のコード例そのものが、新しいBlockの表示確認にもなっています。",
  },
  {
    id: "adding-code-block-code",
    type: "code",
    language: "typescript",
    filename: "const/blog.ts",
    code: `{
  id: "switch-renderer-code",
  type: "code",
  language: "tsx",
  filename: "components/feature/blog/ArticleRenderer.tsx",
  code: "function renderBlock(block: ArticleBlock) { /* ... */ }",
}`,
  },
  {
    id: "tradeoffs",
    type: "heading",
    level: 2,
    text: "取り回しの良さと記述量を引き換えにする",
    anchor: "tradeoffs",
  },
  {
    id: "tradeoffs-benefits",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "benefit-type",
        text: "記事データの誤りをTypeScriptで検出できる",
      },
      {
        id: "benefit-rendering",
        text: "サイトのデザインに沿ったHTMLだけを生成できる",
      },
      {
        id: "benefit-source",
        text: "本文、一覧、サイトマップ、OGPの情報源を一つにできる",
      },
      {
        id: "benefit-extension",
        text: "操作を伴う表現も専用コンポーネントとして追加できる",
      },
    ],
  },
  {
    id: "tradeoffs-cost",
    type: "paragraph",
    text: "形式だけを比べれば、文章だけを書く場合にもid、type、textが必要なBlockは、Markdownより明らかに記述量が増えます。文中リンクや強調といった細かな表現も、必要になるたびに型とRendererの設計が必要です。人間がすべてを手入力する運用なら、この定型作業は無視できない負担になります。",
  },
  {
    id: "agent-assisted-authoring",
    type: "heading",
    level: 2,
    text: "記述の煩雑さをエージェントへ渡す",
    anchor: "agent-assisted-authoring",
  },
  {
    id: "agent-assisted-authoring-workflow",
    type: "paragraph",
    text: "現在は管理画面へ記事を入力するのではなく、Gitで差分と履歴を管理し、terminalから開発と公開を進めています。新しい記事を書くときは、伝えたい内容、構成、利用したい表現をコーディングエージェントへ伝え、const/blog.tsの更新を任せられます。idの命名、typeの指定、配列への配置といった定型作業を、私が毎回手で入力する必要はありません。",
  },
  {
    id: "agent-assisted-authoring-contract",
    type: "paragraph",
    text: "この運用では、ArticleBlockの型は執筆者を縛る記法というより、人間とコーディングエージェントが共有するインターフェースとして働きます。どのBlockが利用でき、何を指定すれば表示できるかが型に残っているため、エージェントはリポジトリを確認しながら既存の表現を組み合わせられます。新しい表現が必要なら、記事データだけでなくReactコンポーネントまで同じ作業の中で拡張できます。",
  },
  {
    id: "agent-assisted-authoring-roles",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "author-role",
        text: "人間は、記事の主張、構成、利用する表現、最終的な文章を判断する",
      },
      {
        id: "agent-role",
        text: "コーディングエージェントは、Blockへの変換、idの生成、型に沿ったデータ記述を行う",
      },
      {
        id: "typescript-role",
        text: "TypeScriptは、必須データの不足やswitchの分岐漏れを検出する",
      },
      {
        id: "git-build-role",
        text: "Gitの差分とNext.jsの静的ビルドで、意図しない変更や生成失敗を確認する",
      },
    ],
  },
  {
    id: "agent-assisted-authoring-freedom",
    type: "paragraph",
    text: "その結果、現在の管理体制では、MarkdownからBlock形式へ変えたことで執筆が重くなった感覚はあまりありません。定型的な記述はコーディングエージェントへ渡し、人間側には画像ギャラリー、カルーセル、外部リンク、コードブロックといった専用表現を選べる自由が残ります。煩雑さを引き受ける主体が変わったことで、型安全性と表示の自由度を受け取りやすくなりました。",
  },
  {
    id: "agent-assisted-authoring-review",
    type: "paragraph",
    text: "ただし、複雑さそのものが消えたわけではありません。型、Renderer、コンポーネントを保守する必要があり、エージェントが生成した文章やデータも無条件には採用できません。Git diffで変更範囲を読み、型検査と静的ビルドを通し、公開前の画面を確認するところまでが、この執筆フローにおける人間の役割です。",
  },
  {
    id: "future-boundary",
    type: "heading",
    level: 2,
    text: "仕組みを育てる境界を決めておく",
    anchor: "future-boundary",
  },
  {
    id: "future-boundary-description",
    type: "paragraph",
    text: "一人で記事と実装を同じリポジトリに置き、コーディングエージェントと更新する現在は、型付きBlockの明示性が運用に合っています。コードを扱わない執筆者が増える、ブラウザ上の編集や承認フローが必要になる、複数人が同時に更新するといった変化が起きれば、MarkdownやHeadless CMSを選ぶ方が自然です。記事数だけで移行を決めず、現在の執筆フローが合わなくなった時点で管理方法を見直します。",
  },
  {
    id: "closing",
    type: "paragraph",
    text: "小さなswitchですが、今では記事データとReactコンポーネントをつなぐだけでなく、人間が選べる表現をコーディングエージェントへ伝える語彙にもなっています。手書きの簡潔さだけを基準にせず、Gitでの確認、型検査、自動生成まで含めた執筆フロー全体を見ながら、必要なBlockを一つずつ増やしていきます。",
  },
  {
    id: "github-link",
    type: "externalLink",
    label: "GitHubでBlockコンポーネントの実装を見る",
    description: "この記事で紹介したArticleBlock、ArticleRenderer、CodeBlockの実装を公開しています。",
    href: "https://github.com/nishimura-yuma77/professor-jk",
  },
] as const satisfies readonly ArticleBlock[]
