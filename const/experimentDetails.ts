import type { ArticleBlock } from "@/const/blog"

export type ExperimentDetail = {
  slug: string
  blocks: readonly ArticleBlock[]
}

export const EXPERIMENT_DETAILS = [
  {
    slug: "jk-lab",
    blocks: [
      {
        id: "overview",
        type: "heading",
        level: 2,
        text: "活動をつなぐキャラクターサイト",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "J.K. Labは、J.K.教授の世界観を表現するキャラクターサイトです。キャラクターデザイン、Webデザイン、設計、実装、インフラ構築、CI/CDまでを一貫して担当しています。",
      },
      {
        id: "activity-base-description",
        type: "paragraph",
        text: "プロフィール、実験、Blog、Contact、YouTube、Xを一つの場所につなぎ、何を目指し、何を作り、現在は何に取り組んでいるのかを確認できる公式な活動拠点として運用しています。",
      },
      {
        id: "scope",
        type: "heading",
        level: 2,
        text: "担当範囲",
        anchor: "scope",
      },
      {
        id: "scope-list",
        type: "list",
        style: "unordered",
        items: [
          { id: "character-design", text: "キャラクターデザインと世界観の設計" },
          { id: "web-design", text: "Webサイトの情報設計とUIデザイン" },
          { id: "frontend", text: "Next.js、TypeScript、SCSSによるフロントエンド実装" },
          { id: "backend", text: "PythonによるContact APIの実装" },
          { id: "infrastructure", text: "TerraformによるAWSインフラの構築と管理" },
          { id: "delivery", text: "CodeBuildを使ったテスト、ビルド、デプロイの自動化" },
        ],
      },
      {
        id: "architecture",
        type: "heading",
        level: 2,
        text: "静的配信を中心にした構成",
        anchor: "architecture",
      },
      {
        id: "architecture-static",
        type: "paragraph",
        text: "通常のページはNext.jsで静的に生成し、Amazon S3とCloudFrontから配信しています。常時稼働するアプリケーションサーバーを持たず、表示部分の運用負荷を抑える構成です。",
      },
      {
        id: "architecture-contact",
        type: "paragraph",
        text: "動的な処理が必要なContactはAPI Gateway、Lambda、SESへ分離しました。CloudFront FunctionによるURLの書き換えを含め、配信設定とAPIをTerraformで管理しています。",
      },
      {
        id: "content-system",
        type: "heading",
        level: 2,
        text: "型付きデータからコンテンツを生成する",
        anchor: "content-system",
      },
      {
        id: "content-system-description",
        type: "paragraph",
        text: "Blogは型の付いたBlockデータとして管理しています。一つの記事データから一覧、本文、サイトマップ、記事ごとのOGPを生成し、表現が必要になった時点で専用コンポーネントを追加できるようにしています。",
      },
      {
        id: "operation",
        type: "heading",
        level: 2,
        text: "公開後も更新を続ける",
        anchor: "operation",
      },
      {
        id: "operation-description",
        type: "paragraph",
        text: "現在のステータスはACTIVEです。完成した画面を維持するだけでなく、活動や実験を記録する機能、運用方法、アクセシビリティを継続して改善しています。",
      },
      {
        id: "related-blog",
        type: "externalLink",
        label: "活動拠点としてJ.K. Labを作った理由を読む",
        description: "サイトの目的、構成、公開後に分かったことをまとめた研究ログです。",
        href: "/blog/building-jk-lab-as-an-activity-base",
      },
      {
        id: "github-link",
        type: "externalLink",
        label: "GitHubで実装を見る",
        description: "フロントエンド、API、Terraformを含むJ.K. Labのソースコードです。",
        href: "https://github.com/nishimura-yuma77/professor-jk",
      },
    ],
  },
  {
    slug: "emotion-mike",
    blocks: [
      {
        id: "overview",
        type: "heading",
        level: 2,
        text: "PNG Tuberの表情を扱う実験",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "Emotion Mikeは、PNG Tuber向けのフェイストラッキングアプリを探る実験です。現実の顔の動きを読み取り、キャラクターのアニメ表現へどのように対応させるかをテーマにしています。",
      },
      {
        id: "approach",
        type: "heading",
        level: 2,
        text: "最初に試した構成",
        anchor: "approach",
      },
      {
        id: "approach-description",
        type: "paragraph",
        text: "Python、MediaPipe、PySide6を使い、フェイストラッキングの情報をデスクトップアプリケーションで扱う構成を検討しました。",
      },
      {
        id: "finding",
        type: "heading",
        level: 2,
        text: "表情をそのまま写すだけでは足りない",
        anchor: "finding",
      },
      {
        id: "finding-description",
        type: "paragraph",
        text: "検討を進める中で、現実の表情とアニメ表現を直接対応させる方法には限界があると感じました。現実の顔の動きだけを入力にしても、キャラクターとして意図した表情を十分に選べるとは限りません。",
      },
      {
        id: "next-hypothesis",
        type: "heading",
        level: 2,
        text: "表情以外の情報を加える",
        anchor: "next-hypothesis",
      },
      {
        id: "next-hypothesis-description",
        type: "paragraph",
        text: "現在は、表情だけを入力として扱うのではなく、表情以外の情報から表示する表情を調整する方向を検討しています。何を追加情報として扱うか、その情報をどのようにアニメ表現へ反映するかは、次に検証する課題です。",
      },
      {
        id: "paused",
        type: "heading",
        level: 2,
        text: "PAUSEDとして残す",
        anchor: "paused",
      },
      {
        id: "paused-description",
        type: "paragraph",
        text: "現在のステータスはPAUSEDです。単純な対応付けをそのまま作り込むのではなく、前提とする表情の扱いを見直すために一度停止しています。完成していない状態も、次の判断につながる実験記録として残します。",
      },
      {
        id: "visibility",
        type: "heading",
        level: 2,
        text: "公開範囲",
        anchor: "visibility",
      },
      {
        id: "visibility-description",
        type: "paragraph",
        text: "この詳細記録は公開していますが、アプリ本体とソースコードの公開範囲はPRIVATEです。利用できる完成品の案内ではなく、検討中の仮説と現在地を共有するためのページです。",
      },
    ],
  },
] as const satisfies readonly ExperimentDetail[]

export function getExperimentDetail(slug: string): ExperimentDetail | undefined {
  return EXPERIMENT_DETAILS.find((detail) => detail.slug === slug)
}
