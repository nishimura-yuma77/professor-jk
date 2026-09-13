import type { ArticleBlock } from "@/const/article"
import { XTWITTER_LINK } from "@/const/constants"

export type ExperimentDetail = {
  slug: string
  blocks: readonly ArticleBlock[]
}

export const EXPERIMENT_DETAILS = [
  {
    slug: "secret-project-003",
    blocks: [
      {
        id: "workflow-screenshots",
        type: "heading",
        level: 2,
        text: "操作画面",
        anchor: "workflow-screenshots",
      },
      {
        id: "generation-workspace-screenshot",
        type: "imageGallery",
        label: "画像生成・素材管理画面",
        images: [
          {
            id: "generation-workspace",
            src: "/images/experiments/secret-project-003/generation-workspace.png",
            alt: "左にプロンプト入力、中央に生成画像、右に保存済み素材を配置した画像生成・素材管理画面",
            width: 1903,
            height: 877,
            caption: "画像生成・素材管理：プロンプトの入力、生成結果の確認、素材への保存を同じ制作画面で行える。",
          },
        ],
      },
      {
        id: "image-editor-screenshot",
        type: "imageGallery",
        label: "画像編集・文字入れ画面",
        images: [
          {
            id: "image-editor",
            src: "/images/experiments/secret-project-003/image-editor.png",
            alt: "描画・部分再生成・文字入れの切り替え、編集キャンバス、文字設定、素材ライブラリを備えた画像編集画面",
            width: 1915,
            height: 843,
            caption: "画像編集・文字入れ：微修正や差分生成から文字の配置・装飾、素材への保存までを一つの編集画面に集約した。",
          },
        ],
      },
      {
        id: "overview",
        type: "heading",
        level: 2,
        text: "開発目的",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "同人声優がキャラクターとして継続的に活動し、そのキャラクターへの関心を新たなボイス依頼につなげられる拠点を目指している。キャラクターIPの育成と制作ワークフローの自動化を通じて、声優の活動と仕事の機会を広げたい。",
      },
      {
        id: "vision-background",
        type: "paragraph",
        text: "着想の出発点は、同人声優が複数の依頼募集サイトを持ち、演じ分けられるキャラクターや料金を掲載して仕事を募集する活動形態だった。その一方で、VTuberをはじめ、「キャラクターに対してボイスを依頼する」という形式の広がりに着目した。",
      },
      {
        id: "vision-hypothesis",
        type: "paragraph",
        text: "同人声優自身も、継続して演じるキャラクターを持ち、そのキャラクターとして活動することで、依頼の機会を増やせるのではないかと考えた。これは現時点での仮説であり、案件獲得につながるかはこれから検証していく。",
      },
      {
        id: "vision-validation-policy",
        type: "paragraph",
        text: "まずは、キャラクターとして継続的に活動することについて声優本人の許可を得たうえで、コンテンツ制作まではJ.K.自身が担う方針としている。声優側に継続的なコンテンツ制作を求めずに検証を始め、キャラクターの発信が関心やボイス依頼につながるかを確かめていく。",
      },
      {
        id: "current-status",
        type: "heading",
        level: 2,
        text: "現在の到達点",
        anchor: "current-status",
      },
      {
        id: "workflow-automation",
        type: "paragraph",
        text: "NovelAIと連携した制作ワークフローの自動化を実装し、コンテンツの制作・展開もすでに開始している。現在はpixivで継続的にコンテンツを公開し、フォロワー数22,000人を達成した。",
      },
      {
        id: "current-growth-challenge",
        type: "paragraph",
        text: "フォロワー数22,000人を達成して以降、閲覧数（PV）の伸びが頭打ちになっている。継続的な発信に加え、新たな人にキャラクターを知ってもらうため、pixiv以外の流入チャネルが必要になっている。",
      },
      {
        id: "current-brand-phase",
        type: "paragraph",
        text: "そのため、LPの制作と他SNSの運用を計画している。コンテンツの継続発信を土台に、流入経路とキャラクターに触れる機会を増やし、ブランドとしてさらに成長させていく段階に入っている。",
      },
      {
        id: "architecture",
        type: "heading",
        level: 2,
        text: "アーキテクチャ構成",
        anchor: "architecture",
      },
      {
        id: "architecture-overview",
        type: "paragraph",
        text: "TanStack Start・React・TypeScriptで画面とサーバー処理を実装し、Cloudflare Workersで動かしている。画像生成はNovelAIに連携し、描画・文字入れ・画像合成はブラウザ上で処理する構成にした。",
      },
      {
        id: "architecture-components",
        type: "list",
        style: "unordered",
        items: [
          { id: "application", text: "TanStack Start / Cloudflare Workers：画面の配信、認証・認可、NovelAI連携や素材管理のサーバー処理を担当。" },
          { id: "database", text: "Cloudflare D1 / Drizzle：ユーザー、キャラクター、再利用するプロンプト、素材の管理情報を保持。" },
          { id: "storage", text: "Cloudflare R2：画像素材の実体を保存。認証後に発行する署名付きURLでアップロード・参照する。" },
          { id: "generation", text: "NovelAI：画像生成と、マスクで指定した範囲の再生成を担当。" },
          { id: "email", text: "Amazon SES：認証などに必要なメールを送信。" },
        ],
      },
      {
        id: "business-rationale",
        type: "heading",
        level: 3,
        text: "ビジネス上の選定理由",
        anchor: "business-rationale",
      },
      {
        id: "business-rationale-description",
        type: "paragraph",
        text: "キャラクターIPを継続して育てるため、個人運営でも維持できるコストと開発体制を重視した。常時稼働するサーバーや画像生成用のGPU環境を自前で抱える負担を抑え、制作ワークフローの改善やコンテンツ制作に時間を回せる構成にしている。",
      },
      {
        id: "business-development-speed",
        type: "paragraph",
        text: "TanStack Startは、Server FunctionsでRPC境界を効率よく扱い、画面からサーバー処理までTypeScriptでつなげられる点を評価した。サーバー側で実行する処理を明示したうえで、フロントエンドとバックエンドの接続を過度に意識せず、機能単位で開発を進められる。DrizzleによるDBの型と合わせ、変更時の整合性と開発速度を両立する狙いがある。",
      },
      {
        id: "business-growth",
        type: "paragraph",
        text: "将来のアクセス増加や機能拡張を見据え、Cloudflareのエコシステム内で構成を調整しやすいことも選定理由にした。利用規模に合わせて必要なサービスやリソースを見直し、継続的に機能を育てていく方針である。",
      },
      {
        id: "infrastructure-rationale",
        type: "heading",
        level: 3,
        text: "インフラ上の選定理由",
        anchor: "infrastructure-rationale",
      },
      {
        id: "managed-infrastructure",
        type: "paragraph",
        text: "WorkersとD1を利用することで、アプリケーションサーバーのOS管理やDBサーバーの保守をサービス側に任せられる。画像生成はNovelAI、文字や画像の合成はブラウザに分担し、Workersは認証・認可、データ管理、外部APIとの連携を担当する。",
      },
      {
        id: "asset-storage-rationale",
        type: "paragraph",
        text: "画像の実体はR2、キャラクターや素材の管理情報はD1へ分離した。画像を繰り返し確認する制作フローでは、R2からのデータ転送にエグレス料金がかからない点も扱いやすい。ただし、保存容量や操作回数には課金があるため、利用量の管理は必要になる。アップロードは署名付きURLでブラウザからR2へ直接送り、画像の転送とアプリケーション処理を分けている。",
      },
      {
        id: "binding-and-scaling",
        type: "paragraph",
        text: "D1・R2への接続はWorkersのBindingで管理し、接続先とアプリケーションの実装を分離している。環境ごとのリソースの切り替えはBindingの設定へ集約できる。アクセスが増えた際は、各サービスの上限や利用状況を確認し、必要に応じてプラン、DB設計、サービス構成とBindingを調整する。",
      },
      {
        id: "infrastructure-operation",
        type: "paragraph",
        text: "D1・R2などのインフラはTerraform、アプリケーションのデプロイはWrangler、DBスキーマの変更はDrizzleのマイグレーションで管理している。開発環境と本番環境を分け、GitHub Actionsから検証・デプロイへつなぐことで、環境の再現性と継続的な更新のしやすさを確保している。",
      },
      {
        id: "application-workflow",
        type: "heading",
        level: 2,
        text: "アプリケーションワークフロー",
        anchor: "application-workflow",
      },
      {
        id: "workflow-problem",
        type: "paragraph",
        text: "制作で最も時間がかかっていたのは、画像を生成した後の微修正・差分生成・文字入れだった。そこで、この三つの工程を一つの編集画面で完結できるようにした。生成した画像をそのまま編集へ引き継ぎ、修正と確認を繰り返しながら仕上げられる構成にしている。",
      },
      {
        id: "workflow-steps",
        type: "list",
        style: "ordered",
        items: [
          { id: "prepare", text: "キャラクターごとのプロンプトや参照画像を選び、NovelAIでベースとなる画像を生成する。保存済みの素材から編集を始めることもできる。" },
          { id: "refine", text: "編集画面で微修正を加え、変更したい範囲をマスクで指定して再生成する。プロンプトを調整し、元画像をもとに差分を作成する。" },
          { id: "lettering", text: "同じ画面で文字を配置し、書体・サイズ・色などを調整する。画像の修正と文字入れを行き来しながら仕上がりを確認する。" },
          { id: "save", text: "編集結果を画像として合成し、素材ライブラリへ保存する。保存した画像は次の編集や制作に再利用する。" },
        ],
      },
      {
        id: "workflow-purpose",
        type: "paragraph",
        text: "反復する操作とツール間の画像の受け渡しを減らし、キャラクターの表現や仕上がりを考える作業に時間を使えるよう、生成・編集・保存の導線をつないだ。",
      },
      {
        id: "next-steps",
        type: "heading",
        level: 2,
        text: "今後の展開",
        anchor: "next-steps",
      },
      {
        id: "next-steps-description",
        type: "paragraph",
        text: "pixivでの継続的なコンテンツ展開を基盤に、LPと他SNSを通じて新たな流入経路を作る。あわせて音声・漫画作品にも表現を広げ、複数の接点からキャラクターを知ってもらえるブランドへ育てていく。",
      },
      {
        id: "interactive-lp",
        type: "heading",
        level: 3,
        text: "インタラクティブなLP",
        anchor: "interactive-lp",
      },
      {
        id: "interactive-lp-description",
        type: "paragraph",
        text: "pixivや他SNSから訪れた人が、キャラクターの個性・世界観・作品をまとめて知ることができるLPを制作する。訪問者の操作に応じた演出を取り入れ、キャラクターに触れられる拠点として整備する。",
      },
      {
        id: "social-channels",
        type: "heading",
        level: 3,
        text: "他SNSへの展開",
        anchor: "social-channels",
      },
      {
        id: "social-channels-description",
        type: "paragraph",
        text: "pixivでの発信を継続しながら、他SNSの運用を計画している。新たな層との接点を作り、LPや作品への流入につなげることで、キャラクターとブランドの認知を広げていく。",
      },
      {
        id: "voice-content",
        type: "heading",
        level: 3,
        text: "同人声優と協力した音声作品",
        anchor: "voice-content",
      },
      {
        id: "voice-content-description",
        type: "paragraph",
        text: "同人声優と協力して音声作品を制作し、声や演技を通じてキャラクターの表現を広げていく。",
      },
      {
        id: "comic-content",
        type: "heading",
        level: 3,
        text: "漫画作品による展開",
        anchor: "comic-content",
      },
      {
        id: "comic-content-description",
        type: "paragraph",
        text: "キャラクターを軸にした漫画作品を制作し、物語を通じてその人柄や世界観を伝えていく。LPや音声作品と合わせ、キャラクターIPを育てるためのコンテンツを蓄積する。",
      },
    ],
  },
  {
    slug: "jk-lab",
    blocks: [
      {
        id: "overview",
        type: "heading",
        level: 2,
        text: "制作の目的",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "これからは「何ができるか」以上に「誰と取り組むか」が重要になると考えた。そのため、自分の理念を象徴するJ.K.教授というアイコニックなキャラクターを中心に、ポートフォリオサイトを制作した。技術や成果物に加え、仕事への考え方や人柄を伝えることを目的としている。",
      },
      {
        id: "activity-base-purpose",
        type: "paragraph",
        text: "訪れた人が、自分の人柄、これまで経験した苦労、今後目指していることを知り、「大事な仕事を任せる相手として、この人でよいか」を判断できる材料を提供したい。そのため、実務経験や制作物とともに、課題への向き合い方、判断の理由、失敗から得た学びを公開している。",
      },
      {
        id: "world",
        type: "heading",
        level: 2,
        text: "理念を表すキャラクター設計",
        anchor: "world",
      },
      {
        id: "activity-base-description",
        type: "paragraph",
        text: "J.K.教授は、自分の理念を映し、今後の個人開発の方向性を示すキャラクターとして位置づけている。企業におけるMVV（ミッション・ビジョン・バリュー）に近い役割を持ち、何を目指し、どのような姿勢で取り組むかを表現する。",
      },
      {
        id: "character-first",
        type: "paragraph",
        text: "人物像は、皮肉屋で、自信家でありながら自信のなさも抱える、おっちょこちょいなチャレンジャー。こうした特徴を含めて、自分の人柄や挑戦への姿勢を伝える存在として設計した。",
      },
      {
        id: "character-presentation",
        type: "paragraph",
        text: "サイトでは立ち絵を中心にキャラクターを提示し、実務経験・制作物・開発ログへ進める構成にしている。キャラクターが表す理念と、実際の仕事や開発における行動の両方を確認できることを重視している。",
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
        text: "技術構成と運用方針",
        anchor: "architecture",
      },
      {
        id: "architecture-static",
        type: "paragraph",
        text: "個人で継続して管理できるよう、運用負荷を抑えた構成を採用した。通常のページはNext.jsで静的に生成し、Amazon S3とCloudFrontから配信している。常時稼働するアプリケーションサーバーの管理を不要にしている。",
      },
      {
        id: "architecture-contact",
        type: "paragraph",
        text: "問い合わせ処理はAPI Gateway・Lambda・SESへ分離した。インフラはTerraformで管理し、テスト・ビルド・デプロイはCodeBuildで自動化している。フロントエンド、API、インフラ、公開までのフローを一貫して構築した。",
      },
      {
        id: "content-system",
        type: "heading",
        level: 3,
        text: "コンテンツ管理",
        anchor: "content-system",
      },
      {
        id: "content-system-description",
        type: "paragraph",
        text: "Blogは型の付いたBlockデータとして管理している。一つの記事データから一覧・本文・サイトマップ・記事ごとのOGPを生成し、更新時の重複作業を減らした。画像やコードなど、内容に応じた表示形式をコンポーネントとして追加できる構成にしている。",
      },
      {
        id: "content-system-policy",
        type: "paragraph",
        text: "今後のCMS化も検討しているが、現時点では運用コストとAIエージェントとの相性を考慮し、コンテンツをリポジトリ内で管理してSSG（静的サイト生成）で配信する構成を意図的に採用している。",
      },
      {
        id: "world-and-usability",
        type: "heading",
        level: 2,
        text: "UI設計とアクセシビリティ",
        anchor: "world-and-usability",
      },
      {
        id: "world-and-usability-description",
        type: "paragraph",
        text: "UIは、訪問者が求める情報への導線を最優先に設計している。キャラクターのテーマカラー・配置・キャラクター性を維持しながら、実務経験・制作物・開発ログへ迷わず進める構成を重視した。PC・タブレット・スマートフォンでの表示を確認し、立ち絵と文字の大きさ、カード内の情報量、セクション間の余白を調整している。",
      },
      {
        id: "world-and-usability-interaction",
        type: "paragraph",
        text: "発光・浮遊・フェードインなどの演出を取り入れつつ、リンクやボタンを視覚的に区別し、操作できる場所を明確にした。キーボード操作や動きを減らす設定にも対応し、演出と操作性の両立を図っている。",
      },
      {
        id: "production-findings",
        type: "heading",
        level: 2,
        text: "公開時の課題と対応",
        anchor: "production-findings",
      },
      {
        id: "production-findings-description",
        type: "paragraph",
        text: "公開時には、静的に生成したHTMLとCloudFrontで扱うURLの違いによるページ表示の問題が発生した。また、Contact APIではCORS設定後もプリフライトリクエストがLambdaへ到達し、問い合わせを送信できない問題があった。",
      },
      {
        id: "production-findings-response",
        type: "paragraph",
        text: "それぞれ、CloudFront FunctionによるURLの書き換えと、APIルーターの見直しで対応した。ローカル環境での動作確認に加え、配信設定やAPIを含む本番環境での検証が必要であることを確認した。",
      },
      {
        id: "operation",
        type: "heading",
        level: 2,
        text: "今後の運用方針",
        anchor: "operation",
      },
      {
        id: "operation-description",
        type: "paragraph",
        text: "実務経験・制作物・開発ログを継続して更新し、取り組んだ課題、判断の根拠、得られた学びを蓄積していく。今後の個人開発についても、目的と開発過程を公開する。理念と実際の取り組みを合わせて伝え、仕事を依頼する際の判断材料を充実させる方針である。",
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
        text: "開発目的",
        anchor: "overview",
      },
      {
        id: "overview-description",
        type: "paragraph",
        text: "Emotion Mikeは、PNG Tuber向けのフェイストラッキングアプリの開発プロジェクト。顔の動きをもとに、ジト目や白目など、キャラクターに適したアニメ的な表情を選択する仕組みの実現を目指している。",
      },
      {
        id: "expression-control",
        type: "heading",
        level: 2,
        text: "表情の切り替え方の検討",
        anchor: "expression-control",
      },
      {
        id: "discrete-expression-description",
        type: "paragraph",
        text: "トラッキングで得た動きを連続的に反映する方法に対し、あらかじめ用意した表情の状態へ対応づけ、画像を切り替える方法を検討した。PNG Tuberの画像切り替えを利用することで、現実の顔の動きとは異なるジト目や白目などの表現を取り込めると考えた。",
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
            caption: "表情候補として検討しているジト目の例",
          },
        ],
      },
      {
        id: "finding",
        type: "heading",
        level: 2,
        text: "表情選択における課題",
        anchor: "finding",
      },
      {
        id: "finding-description",
        type: "paragraph",
        text: "ジト目や白目を候補として用意しても、顔の動きだけでは、どの場面でその表情を選ぶべきか判断しにくいという課題があった。表示する表情を増やすことに加え、状況に合った表情を選ぶための判断材料が必要だと分かった。",
      },
      {
        id: "next-hypothesis",
        type: "heading",
        level: 2,
        text: "検証仮説：PCの音量変化による表情制御",
        anchor: "next-hypothesis",
      },
      {
        id: "next-hypothesis-description",
        type: "paragraph",
        text: "今後の検証は、PCの音量変化を受け取り、表情変化のトリガーとして利用する方法に絞る。音量の変化を表情の切り替えに結びつけることで、顔のトラッキング情報を補う入力として利用できるかを検証する。",
      },
      {
        id: "open-research",
        type: "heading",
        level: 2,
        text: "開発状況と検証方針",
        anchor: "open-research",
      },
      {
        id: "open-research-limitations",
        type: "paragraph",
        text: "現在は、PCの音量変化と表情変化の対応関係をモデル化している。音量変化の入力からトリガーの判定、表情の切り替えまでの流れを整理している段階である。",
      },
      {
        id: "open-research-description",
        type: "paragraph",
        text: "モデル化した内容をもとに、小規模な検証で表情切り替えの挙動を確認する方針。音量変化をトリガーとして利用する方法の有効性を確かめていく。",
      },
      {
        id: "collaboration",
        type: "heading",
        level: 2,
        text: "意見交換・共同検証の募集",
        anchor: "collaboration",
      },
      {
        id: "open-research-invitation",
        type: "paragraph",
        text: "PCの音量変化を表情変化のトリガーとして扱う方法や、そのモデル化・検証方法について意見交換できる方を募集している。音量情報の扱いやキャラクターの表情制御に知見があり、共同検証に関心のある方は、ContactまたはXのDMからご連絡ください。",
      },
      {
        id: "contact-link",
        type: "externalLink",
        label: "Contactから意見を送る",
        description: "音量変化を使った表情制御のモデル化・検証方法に関する意見や、共同検証の相談はこちらから。",
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
