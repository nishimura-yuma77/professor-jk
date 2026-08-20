import type { ArticleBlock } from "@/const/article"
import { XTWITTER_LINK } from "@/const/constants"

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
        text: "秘密基地のような活動拠点",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "J.K. Labは、J.K.教授の活動と世界観を一つにまとめた、秘密基地のような公式サイトです。プロフィール、実験、Blog、Contact、YouTube、Xを一つの場所につなぎ、何を目指し、何を作り、現在は何に取り組んでいるのかを確認できる活動拠点として運用しています。",
      },
      {
        id: "activity-base-description",
        type: "paragraph",
        text: "訪れた人が、誰かの隠れ家や秘密基地へ足を踏み入れ、そこでエンジニアなのか、ただの変な奴なのか分からない人物と出会うような体験をイメージしました。研究施設を思わせる画面や演出、J.K.教授というキャラクターを通して、制作物だけでなく、その人物や活動の空気まで感じられる場所を目指しています。",
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
        text: "PNG Tuberにしかできない表現",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "Emotion Mikeは、PNG Tuber向けのフェイストラッキングアプリを探る実験です。現実の表情筋の動きを読み取り、キャラクターのアニメ表現へどのように対応させるかをテーマにしています。",
      },
      {
        id: "discrete-expression-description",
        type: "paragraph",
        text: "現実の表情筋の動きとキャラクターの表情をただ紐づけるのではなく、トラッキングで得た動きを連続的な値としてそのまま反映せず、離散的な値として扱うことで、ジト目や白目といったアニメ的な表現を取り込める可能性を考えました。実写的な変形を再現するのではなく、決められた絵を切り替えられるPNG Tuberだからこそ試せる表現です。",
      },
      {
        id: "jitome-example",
        type: "imageGallery",
        label: "Emotion Mikeで扱うジト目の表現",
        images: [
          {
            id: "jitome-open-mouth",
            src: "/images/character/jitome_open_mouth.png",
            alt: "緑色の背景でジト目をしている、紫色の長髪とスーツ姿のJ.K.教授",
            width: 832,
            height: 1216,
            caption: "ジト目がかわいくて好き",
          },
        ],
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
        text: "ジト目や白目を候補として用意できても、現実の顔の動きだけでは、いつその表現を選ぶべきか判断できません。表情の形を増やすことと、キャラクターとして意図した表情を選ぶことは別の課題だと分かりました。",
      },
      {
        id: "next-hypothesis",
        type: "heading",
        level: 2,
        text: "表情とは、顔面の筋肉の動作だけではない",
        anchor: "next-hypothesis",
      },
      {
        id: "next-hypothesis-description",
        type: "paragraph",
        text: "ジト目のようなアニメ表現は、顔の形だけで成立するものではなく、ジト目をするのに適した状況で再現されます。つまり、どの表情を選ぶべきか判断するには、顔面の筋肉の動作だけでは情報が足りません。状況や文脈も入力として扱い、キャラクターの表情を決める必要があると考えました。",
      },
      {
        id: "context-signals-introduction",
        type: "paragraph",
        text: "今後、表情を選ぶための状況や文脈として、次のような情報を扱える可能性を考えています。",
      },
      {
        id: "context-signals",
        type: "list",
        style: "unordered",
        items: [
          {
            id: "game-state",
            text: "ゲーム画面の状態：HPバーや敵との距離を自動判定し、危機、緊張、余裕などの状況を推定する",
          },
          {
            id: "voice-analysis",
            text: "LLMによる音声解析と感情推定：発話内容や声の調子から、喜び、困惑、苛立ちなどを推定する",
          },
          {
            id: "play-behavior",
            text: "操作状況やプレイ傾向：ボタン入力の増加、同じ場面での連続失敗、操作が止まった時間などから、集中、焦り、苛立ちを推定する",
          },
        ],
      },
      {
        id: "open-research",
        type: "heading",
        level: 2,
        text: "良い方法がないか模索中",
        anchor: "open-research",
      },
      {
        id: "open-research-limitations",
        type: "paragraph",
        text: "こうした案は浮かんでいるものの、AIを扱ったプロダクト開発の知見と、表情の選択に寄与する環境情報をモデル化・分析した経験はまだ浅く、どの方法が実用的かを判断し、実現方法を絞り込める段階にはありません。",
      },
      {
        id: "open-research-description",
        type: "paragraph",
        text: "そのため、まずは候補となる情報が本当に表情の選択に寄与するのか、どのようなデータと評価方法が必要なのかを整理するところから進めたいと考えています。実装を急ぐのではなく、AIや環境情報の扱いに関する知見を得ながら、小さく検証できる方法を探しています。",
      },
      {
        id: "open-research-invitation",
        type: "paragraph",
        text: "環境情報の選び方、感情推定の方法、検証の進め方について意見や知見があれば、ContactまたはXのDMから教えてください。AIを扱うプロダクト、表情認識、ゲーム情報の解析、キャラクター表現に詳しく、一緒に仮説を検証してくれる共同研究者も待っています。",
      },
      {
        id: "contact-link",
        type: "externalLink",
        label: "Contactから意見を送る",
        description: "環境情報、感情推定、検証方法に関する意見や共同研究の相談はこちらから。",
        href: "/contact",
      },
      {
        id: "x-dm-link",
        type: "externalLink",
        label: "XのDMで連絡する",
        description: "短い意見や、まず話してみたい場合はこちらから。",
        href: XTWITTER_LINK,
      },
    ],
  },
] as const satisfies readonly ExperimentDetail[]

export function getExperimentDetail(slug: string): ExperimentDetail | undefined {
  return EXPERIMENT_DETAILS.find((detail) => detail.slug === slug)
}
