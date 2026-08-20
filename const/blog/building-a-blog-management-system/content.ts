import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "J.K. LabのBlogを継続して更新できるように、記事の表示だけでなく、作成と管理までを一つの仕組みにしました。中心にあるのは、表示用Components、オブジェクトベースの記事データ、定型作業を担うスクリプトです。",
  },
  {
    id: "opening-purpose",
    type: "paragraph",
    text: "ブラウザ上の管理画面を作る代わりに、サイトの実装と記事を同じリポジトリへ置き、TypeScript、Git、OpenCodeをそのまま執筆環境として使います。人間だけでなく、コーディングエージェントも現在の実装と文脈を読みながら記事を扱える構成を目指しました。",
  },
  {
    id: "components-as-vocabulary",
    type: "heading",
    level: 2,
    text: "Componentsをブログの語彙にする",
    anchor: "components-as-vocabulary",
  },
  {
    id: "components-as-vocabulary-description",
    type: "paragraph",
    text: "記事で使える表現はReact Componentとして先に用意します。ArticleRendererがBlockのtypeを見て、段落や見出しはHTMLへ、画像やコードは専用Componentへ変換します。記事データへ表示処理を混ぜず、利用できる表現をComponentと型の組み合わせで定義しています。",
  },
  {
    id: "component-tree",
    type: "code",
    language: "bash",
    filename: "ブログ表示Componentsの構成",
    code: `BlogPage
\`-- BlogArchiveGrid (Client)
    \`-- BlogArticleCard

BlogArticlePage
\`-- ArticleRenderer
    |-- heading / paragraph / list / externalLink
    |-- ArticleImageGallery
    |   \`-- ArticleImageCarousel (Client)
    \`-- ArticleCodeBlock (Server)
        \`-- ArticleCodeCopyButton (Client)

BlogOgpRoute
\`-- createBlogOpenGraphImage`,
  },
  {
    id: "component-boundary",
    type: "paragraph",
    text: "ArticleRendererはServer Componentのまま保ち、カルーセルやコピー操作など、ブラウザ上の状態が必要な部分だけをClient Componentにしています。Blockを追加するときも、型とRendererのcase、必要なら専用Componentを追加するだけです。",
  },
  {
    id: "object-based-content",
    type: "heading",
    level: 2,
    text: "コンテンツをオブジェクトで管理する",
    anchor: "object-based-content",
  },
  {
    id: "object-based-content-description",
    type: "paragraph",
    text: "記事本文はMarkdownではなく、readonly ArticleBlock[]として管理します。各Blockはidとtypeを持ち、typeごとに必要なデータだけを指定します。記述量は増えますが、どのComponentを使えるか、何を渡せば表示できるかがTypeScriptの型として残ります。",
  },
  {
    id: "content-tree",
    type: "code",
    language: "bash",
    filename: "ブログ記事データの構成",
    code: `const/
|-- article.ts
\`-- blog/
    |-- index.ts
    |-- types.ts
    |-- registry.generated.ts
    \`-- <slug>/
        |-- meta.ts
        \`-- content.ts`,
  },
  {
    id: "content-files",
    type: "paragraph",
    text: "記事はslugごとのディレクトリへ分け、meta.tsにタイトル、概要、公開日、draft、LOG番号を、content.tsにBlockの配列を置きます。index.tsはそれらを一つの記事へ組み立て、slugやLOG番号の重複を検出し、productionではdraftを除外します。",
  },
  {
    id: "script-automation",
    type: "heading",
    level: 2,
    text: "スクリプトで定型作業を自動化する",
    anchor: "script-automation",
  },
  {
    id: "script-automation-description",
    type: "paragraph",
    text: "オブジェクト形式は型に強い一方、slug、日付、LOG番号、Blockのidなど、毎回書く項目も増えます。そこで、blog:newがdraftのひな形と次のLOG番号を作り、記事を完成させた後にblog:generateが各記事を静的importするregistryを生成します。",
  },
  {
    id: "script-workflow",
    type: "code",
    language: "bash",
    filename: "新規記事の作成フロー",
    code: `npm run blog:new -- new-article
# meta.tsとcontent.tsを編集する
npm run blog:generate
npm run lint
npm run typecheck
npm run build`,
  },
  {
    id: "skill-automation",
    type: "paragraph",
    text: "create-blog-article Skillは、このフローの上でテーマや資料を確認し、metaとBlock本文を作ります。スクリプトが採番とファイル生成を担当し、Skillが記事ごとの判断を担当するため、エージェントへ任せても運用上の規則はリポジトリに残ります。",
  },
  {
    id: "repository-as-domain-knowledge",
    type: "heading",
    level: 2,
    text: "リポジトリ自体をドメイン知識にする",
    anchor: "repository-as-domain-knowledge",
  },
  {
    id: "repository-as-domain-knowledge-description",
    type: "paragraph",
    text: "この構成の大きなメリットは、サイトを作るためのコードだけでなく、J.K. Labに関するドメイン知識も同じリポジトリへ集約されることです。LP、実務コンテンツ、Blogは役割が異なりますが、互いに補完しながら活動の全体像を残します。",
  },
  {
    id: "domain-knowledge-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "domain-knowledge-lp",
        text: "LPには、活動の目的、世界観、提供している価値が残る",
      },
      {
        id: "domain-knowledge-work",
        text: "実務コンテンツと実装には、何を作り、どう動かしているかが残る",
      },
      {
        id: "domain-knowledge-blog",
        text: "Blogには、なぜその設計や判断を選んだか、試行錯誤の背景が残る",
      },
      {
        id: "domain-knowledge-contract",
        text: "型、Components、スクリプト、Skillには、更新時に守る規則が残る",
      },
    ],
  },
  {
    id: "agent-friendly-repository",
    type: "paragraph",
    text: "情報が外部CMSや別の資料へ分散していないため、エージェントはLPだけを見て文章を推測したり、コードだけを見て目的を推測したりせずに済みます。実装、実務、発信、運用ルールを同時に確認し、既存の文脈に沿った変更を考えやすくなります。オブジェクトの型は、人間とエージェントが共有する記事表現のインターフェースとしても機能します。",
  },
  {
    id: "closing",
    type: "paragraph",
    text: "今回作ったブログ管理システムは、記事を表示する機能だけではありません。Componentsで表現を定義し、オブジェクトで内容を管理し、スクリプトで定型作業を自動化することで、リポジトリを人間とエージェントが共有できる知識基盤へ近づけました。",
  },
  {
    id: "github-link",
    type: "externalLink",
    label: "GitHubでブログ管理システムの実装を見る",
    description: "記事データ、表示Components、生成スクリプト、OpenCode Skillを公開しています。",
    href: "https://github.com/nishimura-yuma77/professor-jk",
  },
] as const satisfies readonly ArticleBlock[]
