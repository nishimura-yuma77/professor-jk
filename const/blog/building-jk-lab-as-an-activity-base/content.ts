import type { ArticleBlock } from "@/const/article"

export const content = [
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
] as const satisfies readonly ArticleBlock[]
