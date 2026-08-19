import type { BundledLanguage } from "shiki"

export type ArticleImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type ArticleBlock =
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
      type: "list"
      style: "ordered" | "unordered"
      items: readonly [
        { id: string; text: string },
        ...{ id: string; text: string }[],
      ]
    }
  | {
      id: string
      type: "imageGallery"
      label: string
      images: readonly [ArticleImage, ...ArticleImage[]]
    }
  | {
      id: string
      type: "externalLink"
      label: string
      description: string
      href: string
    }
  | {
      id: string
      type: "code"
      language: BundledLanguage
      filename?: string
      code: string
    }

export type BlogArticle = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  coverImage?: ArticleImage
  blocks: readonly ArticleBlock[]
}

export const BLOG_ARTICLES = [
  {
    slug: "building-jk-lab-as-an-activity-base",
    title: "今後の活動拠点として、J.K. Labを作った",
    description:
      "活動や制作物、その過程で考えたことを継続して残すために作った、J.K. Labの目的と構成を紹介します。",
    publishedAt: "2026-08-19",
    coverImage: {
      id: "jk-lab-cover",
      src: "/images/ogp.png",
      alt: "六角形のJ.K.ロゴとPROF. J.K.の文字",
      width: 1200,
      height: 630,
    },
    blocks: [
      {
        id: "opening",
        type: "paragraph",
        text: "J.K. Labは、私の今後の活動拠点として作りました。制作物を公開するだけでなく、現在取り組んでいることや、その過程で考えたこと、成功や失敗まで継続して残せる場所が欲しかったからです。",
      },
      {
        id: "opening-details",
        type: "paragraph",
        text: "Webデザイン、設計、実装、インフラ、CI/CDまでを一貫して構築しています。この記事では、J.K. Labを作った目的、現在の構成、公開して分かったこと、そして今後この場所で何をしていくのかを紹介します。",
      },
      {
        id: "why-base",
        type: "heading",
        level: 2,
        text: "活動をつなぐ拠点が必要だった",
        anchor: "why-base",
      },
      {
        id: "why-base-description",
        type: "paragraph",
        text: "YouTubeやXでは、動画、短い投稿、開発中の出来事をそれぞれ発信できます。一方で、それらは時間とともに流れていきます。初めて私を知った方が、何を目指し、これまで何を作り、今は何に取り組んでいるのかを一つの流れとして確認できる場所が必要だと考えました。",
      },
      {
        id: "why-base-role",
        type: "paragraph",
        text: "そのため、J.K. Labを単にプロフィールと制作物を並べるポートフォリオではなく、活動全体をつなぐ公式な拠点として設計しました。外部で私を知った方に、世界観、活動、技術、今後の目標をもう少し深く知っていただくことが、このサイトの役割です。",
      },
      {
        id: "why-base-owned",
        type: "paragraph",
        text: "発信を外部のプラットフォームだけに預けず、自分の意図で情報を整理し、必要に応じて機能を増やせることも大切でした。YouTubeやXと競合する場所を作るのではなく、それぞれの発信をつなぎ、活動の全体像を補う場所として育てていきます。",
      },
      {
        id: "what-to-store",
        type: "heading",
        level: 2,
        text: "完成したものだけを置かない",
        anchor: "what-to-store",
      },
      {
        id: "what-to-store-description",
        type: "paragraph",
        text: "J.K. Labでは、取り組みをExperimentとして記録しています。完成した制作物だけでなく、進行中のものや一度立ち止まったものも、その時点の状態として残す方針です。結果だけを見せるよりも、どのような課題を選び、どこで迷い、何を判断したのかまで見える方が、活動している人物として伝わると考えています。",
      },
      {
        id: "what-to-store-items",
        type: "list",
        style: "unordered",
        items: [
          {
            id: "experiments",
            text: "制作物と、その目的や現在の状態を残すExperiment",
          },
          {
            id: "profile",
            text: "私が何を目指し、どのような考えで活動しているかを伝えるProfile",
          },
          {
            id: "blog",
            text: "開発中の判断、学び、失敗を文章として蓄積するBlog",
          },
          {
            id: "contact",
            text: "活動に興味を持ってくださった方と次の話を始めるContact",
          },
        ],
      },
      {
        id: "what-to-store-trust",
        type: "paragraph",
        text: "ここで伝えたいのは、能力を必要以上に高く見せることではありません。何を作れるのかに加えて、課題をどう捉え、どのように進めるのかを確認できることを重視しています。うまくいかなかった過程も残すことで、活動を継続していることや、開発に向き合う姿勢まで伝えられると考えています。",
      },
      {
        id: "architecture",
        type: "heading",
        level: 2,
        text: "続けて運用できる構成にする",
        anchor: "architecture",
      },
      {
        id: "architecture-static",
        type: "paragraph",
        text: "活動拠点は、公開して終わりではなく、更新を続けられることが重要です。そこで、普段表示するページはNext.jsで静的なHTMLとして生成し、S3とCloudFrontから配信しています。常時動かすアプリケーションサーバーを持たず、表示部分の運用負荷を小さくするための選択です。",
      },
      {
        id: "architecture-dynamic",
        type: "paragraph",
        text: "動的な処理が必要なContactだけは、API Gateway、Lambda、SESへ分離しました。画面は静的に保ち、必要な機能だけをAPIにする構成です。AWSリソースはTerraformで管理し、フロントエンドとバックエンドのテスト、ビルド、デプロイはCodeBuildから実行しています。個人で扱うからこそ、手作業に依存する範囲を増やさないようにしています。",
      },
      {
        id: "architecture-repository",
        type: "paragraph",
        text: "サイトを表示するコードだけでなく、問い合わせ内容の検証、メール送信、配信設定、ドメイン、証明書まで同じリポジトリで確認できます。完成した見た目と、それを支える仕組みを切り離さずに管理することも、このプロジェクトで試していることの一つです。",
      },
      {
        id: "world-and-usability",
        type: "heading",
        level: 2,
        text: "世界観を使いやすさにつなげる",
        anchor: "world-and-usability",
      },
      {
        id: "world-and-usability-description",
        type: "paragraph",
        text: "画面には、通信端末のようなメニューや転送演出、研究記録を模した表示を取り入れています。ただし、見た目だけを優先して操作しづらくならないようにしました。キーボードでの操作、フォーカスの移動、動きを減らす端末設定への対応など、演出を止めたい方も利用できる状態を目指しています。",
      },
      {
        id: "world-and-usability-contact",
        type: "paragraph",
        text: "Contactでは、いきなり空の入力欄を見せるのではなく、相談内容を整理するための案内を用意しました。世界観は装飾として加えるだけでなく、次に何をすればよいかを伝える機能として使いたいと考えています。",
      },
      {
        id: "production-findings",
        type: "heading",
        level: 2,
        text: "公開して初めて分かったこと",
        anchor: "production-findings",
      },
      {
        id: "production-findings-description",
        type: "paragraph",
        text: "実際に公開すると、ローカルの確認だけでは見えなかった問題も起きました。静的に生成したHTMLとCloudFrontで扱うURLの違いからページを表示できなかったり、Contact APIのCORS設定後もプリフライトリクエストがLambdaへ到達し、問い合わせを送信できなかったりしました。",
      },
      {
        id: "production-findings-response",
        type: "paragraph",
        text: "それぞれ、CloudFront FunctionによるURLの書き換えと、APIルーターの見直しで対応しました。動けば完了ではなく、どの層が何を担当するのかを本番の挙動から確認し、設計へ戻すことも運用の一部だと実感しました。詳しい原因と修正内容は、今後の記事で個別に整理する予定です。",
      },
      {
        id: "why-blog",
        type: "heading",
        level: 2,
        text: "Blogを追加した理由",
        anchor: "why-blog",
      },
      {
        id: "why-blog-description",
        type: "paragraph",
        text: "完成した画面だけでは、その裏で何を考え、なぜその構成を選んだのかまでは伝わりません。そこで、活動の背景や開発中に得た知見を残すため、J.K. Labの中にBlogを追加しました。このページも、型の付いた記事データからビルド時に生成されています。",
      },
      {
        id: "why-blog-details",
        type: "paragraph",
        text: "記事を追加すると、本文のHTML、一覧ページ、サイトマップ、記事ごとのOGP画像が同じデータから生成されます。今は一人で管理しやすい小さな仕組みですが、更新を継続しながら必要な表現を増やしていく予定です。",
      },
      {
        id: "why-blog-reflection",
        type: "paragraph",
        text: "文章にすることは、実装時の判断を振り返る機会にもなります。その場では妥当だと思った選択も、理由を書こうとすると前提や不足が見えてきます。Blogを発信のためだけでなく、次の開発をより良くするための記録としても活用します。",
      },
      {
        id: "from-here",
        type: "heading",
        level: 2,
        text: "ここからの活動を記録する",
        anchor: "from-here",
      },
      {
        id: "from-here-description",
        type: "paragraph",
        text: "J.K. Labは、完成したものを並べるだけの場所ではありません。これから取り組む活動や、その途中で得た知見も研究記録として残していきます。まだ実装できていない機能や改善したい部分もありますが、それらを含めて変化を追える拠点にしていきたいと考えています。",
      },
      {
        id: "from-here-next",
        type: "paragraph",
        text: "次回以降は、静的サイトのURLで起きた問題、Contact APIのCORS対応、日本語タイトルからのOGP自動生成などを個別に紹介する予定です。更新はXでお知らせしますので、今後の活動も見守っていただけるとうれしいです。",
      },
      {
        id: "x-link",
        type: "externalLink",
        label: "Xで次の研究記録を追う",
        description: "Blogの更新と、現在取り組んでいる活動をお知らせします。",
        href: "https://x.com/jkdeb__",
      },
      {
        id: "github-link",
        type: "externalLink",
        label: "GitHubでJ.K. Labの実装を見る",
        description: "この記事で紹介したフロントエンド、API、Terraformのコードを公開しています。",
        href: "https://github.com/nishimura-yuma77/professor-jk",
      },
    ],
  },
  {
    slug: "building-a-typed-block-based-blog-renderer",
    title: "switchで組み立てる、型付きブログBlockコンポーネント",
    description:
      "記事本文を型付きBlockとして管理し、switchで表示へ変換する仕組みと、Git、terminal、コーディングエージェントを組み合わせた執筆方法を紹介します。",
    publishedAt: "2026-08-19",
    coverImage: {
      id: "typed-block-renderer-cover",
      src: "/blog/building-a-typed-block-based-blog-renderer/og.png",
      alt: "switchで組み立てる、型付きブログBlockコンポーネントのOGP画像",
      width: 1200,
      height: 630,
    },
    blocks: [
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
    ],
  },
  {
    slug: "search-console-page-with-redirect",
    title: "Search Consoleの「ページにリダイレクトがあります」に驚いた",
    description:
      "Search Consoleから届いたインデックス未登録の通知を確認したところ、HTTPからHTTPSへの意図したリダイレクトだった記録です。",
    publishedAt: "2026-08-20",
    coverImage: {
      id: "search-console-redirect-cover",
      src: "/blog/search-console-page-with-redirect/og.png",
      alt: "Search Consoleの「ページにリダイレクトがあります」に驚いたのOGP画像",
      width: 1200,
      height: 630,
    },
    blocks: [
      {
        id: "opening",
        type: "paragraph",
        text: "Google Search Consoleから「ページがインデックスに登録されない新しい要因」という通知が届きました。公開したばかりのサイトで「ページにリダイレクトがあります」と表示され、意図しない設定を入れてしまったのかと驚きました。",
      },
      {
        id: "search-console-screens",
        type: "imageGallery",
        label: "Search Consoleで通知内容と対象URLを確認した画面",
        images: [
          {
            id: "redirect-notice",
            src: "/images/blog/search-console-redirect-notice.svg",
            alt: "Search Consoleにページがインデックスに登録されない要因として、ページにリダイレクトがありますと表示された通知",
            width: 889,
            height: 567,
            caption: "最初に表示されたインデックス未登録の通知。",
          },
          {
            id: "redirect-example",
            src: "/images/blog/search-console-redirect-example.svg",
            alt: "Search Consoleの対象URL一覧にhttp://professor-jk.net/が表示されている画面",
            width: 1330,
            height: 433,
            caption: "対象はHTTPS版ではなく、http://professor-jk.net/でした。",
          },
        ],
      },
      {
        id: "check-url",
        type: "heading",
        level: 2,
        text: "対象URLを見たらHTTP版だった",
        anchor: "check-url",
      },
      {
        id: "check-url-description",
        type: "paragraph",
        text: "レポートを開いて対象を確認すると、表示されていたのはhttp://professor-jk.net/でした。このサイトはHTTPSで公開しているため、HTTPへのアクセスをHTTPSへ転送するのは意図した動作です。",
      },
      {
        id: "cloudfront-setting",
        type: "paragraph",
        text: "配信に使っているCloudFrontでも、HTTPリクエストをHTTPSへリダイレクトするようTerraformで明示しています。",
      },
      {
        id: "cloudfront-setting-code",
        type: "code",
        language: "hcl",
        filename: "terraform/main.tf",
        code: `default_cache_behavior {
  target_origin_id       = "professor-jk-s3-origin"
  viewer_protocol_policy = "redirect-to-https"
}`,
      },
      {
        id: "verify-response",
        type: "heading",
        level: 2,
        text: "レスポンスも確認する",
        anchor: "verify-response",
      },
      {
        id: "verify-response-description",
        type: "paragraph",
        text: "念のためcurlでヘッダーを取得すると、HTTP版は301 Moved Permanentlyを返し、LocationヘッダーはHTTPS版を指していました。転送先のHTTPS版は200 OKです。",
      },
      {
        id: "verify-response-code",
        type: "code",
        language: "shell",
        code: `$ curl -I http://professor-jk.net/
HTTP/1.1 301 Moved Permanently
Server: CloudFront
Location: https://professor-jk.net/
X-Cache: Redirect from cloudfront

$ curl -I https://professor-jk.net/
HTTP/1.1 200 OK`,
      },
      {
        id: "no-fix-needed",
        type: "heading",
        level: 2,
        text: "今回は修正不要だった",
        anchor: "no-fix-needed",
      },
      {
        id: "no-fix-needed-description",
        type: "paragraph",
        text: "Search Consoleの表示は、HTTP版がリダイレクトされるため、そのURL自体をインデックスへ登録しないという結果でした。サイトマップとcanonical URLもHTTPSで統一しており、HTTPS版は正常に応答しています。今回は不具合ではなく、設定どおりに動いていることを確認して完了です。",
      },
      {
        id: "closing",
        type: "paragraph",
        text: "「インデックスに登録されない」という言葉だけを見ると焦りますが、まず対象URLと転送先を確認することが大切でした。警告のように見える表示でも、意図したリダイレクトなら直す必要はありません。",
      },
    ],
  },
] as const satisfies readonly BlogArticle[]

export function getBlogArticles(): readonly BlogArticle[] {
  return [...BLOG_ARTICLES]
    .reverse()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug)
}

export function getBlogArticleLogNumber(slug: string): number {
  const articleIndex = BLOG_ARTICLES.findIndex((article) => article.slug === slug)
  if (articleIndex === -1) {
    throw new Error(`Blog article not found: ${slug}`)
  }

  return articleIndex + 1
}
