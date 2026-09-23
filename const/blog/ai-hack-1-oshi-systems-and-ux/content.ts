import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "第2回AI HACKで、審査員のTaishiさんが口にした「かわいい」という言葉が残った。対象は、家族の献立を考えてくれるAI執事。便利、賢い、実用的ではなく、「かわいい」だった。システムに向けられたその一言が、これからのUXを考える入口になった。",
  },
  {
    id: "butler-called-heading",
    type: "heading",
    level: 2,
    text: "最優秀賞は、電話をかけてくる執事だった",
    anchor: "butler-called",
  },
  {
    id: "butler-menu-planning",
    type: "paragraph",
    text: "参加者として見届けた最優秀賞は、AI執事だった。家族構成に合わせて献立を作り、その場で伝えた要望にも応えてくれる。けれど、私が強く引かれたのは献立生成の性能だけではない。執事から音声で電話がかかってくるUIによって、利用者が画面上で行う操作を極端に減らしていたことだ。",
  },
  {
    id: "butler-interface",
    type: "paragraph",
    text: "同じ機能を「献立立案AI」として、入力欄と生成ボタンのある画面にすることもできたはずだ。しかし、この作品は機能に声と動作を与え、「執事」という存在にした。人がAIを呼び出すのではなく、執事から連絡が来る。機能の説明より先に関係性が立ち上がる設計だった。",
  },
  {
    id: "cute-before-useful-heading",
    type: "heading",
    level: 2,
    text: "「便利」より先に出てきた「かわいい」",
    anchor: "cute-before-useful",
  },
  {
    id: "taishi-cute-observation",
    type: "paragraph",
    text: "そこで出てきたのが、Taishiさんの「かわいい」だった。この言葉だけを最優秀賞の受賞理由として断定するつもりはない。公式に示されている評価基準には、技術力、ビジネス価値、プレゼンテーション、チームワーク、独自性・新規性がある。それでも、審査の場でシステムに対して自然に「かわいい」と言えること自体が、機能の評価とは別の到達点を示しているように思えた。",
  },
  {
    id: "taishi-product-context",
    type: "paragraph",
    text: "Taishiさんは、グローバル向けのAI英語学習アプリを個人開発し、年間経常収益100万ドルを達成したと公式サイトで紹介されている。AIを使える状態にするだけでなく、人が継続して触れたくなるプロダクトを作ってきた人から出た言葉だからこそ、私は「かわいい」を単なる感想として通り過ぎられなかった。",
  },
  {
    id: "appearance-as-interpretation-heading",
    type: "heading",
    level: 2,
    text: "私はそれを「映え」と受け取った",
    anchor: "appearance-as-interpretation",
  },
  {
    id: "appearance-not-quote",
    type: "paragraph",
    text: "ここからは私の解釈になる。Taishiさんが使った言葉は、あくまで「かわいい」だ。私はその言葉を考え続ける中で、システムにも「映え」が必要なのではないかと思った。画面を派手にする、キャラクターを載せる、SNSで目立たせるという意味ではない。業務ドメインを深く理解した機能を、ひと目で役割が伝わり、声や動作まで一貫したアイコニックな存在へ変換することだ。",
  },
  {
    id: "appearance-from-domain",
    type: "paragraph",
    text: "AI執事の「かわいさ」は、機能の外側に後付けされた飾りではない。家族の献立を考えるという生活の仕事を理解し、その仕事を任せたくなる相手として執事を選び、電話という振る舞いまでつないだ結果として生まれている。深い業務理解があるから、存在の形に必然性が出る。その必然性が、私にはシステムの「映え」に見えた。",
  },
  {
    id: "systems-to-support-heading",
    type: "heading",
    level: 2,
    text: "機能が、推せる存在に変わる",
    anchor: "systems-to-support",
  },
  {
    id: "support-as-motivation",
    type: "paragraph",
    text: "使いやすさは、迷わず目的を達成できることだけではない。「この執事にまた頼みたい」と思えるなら、その感情も利用を続ける理由になる。必要だから起動するシステムから、会いたいから呼びたくなるシステムへ。そこでUXは、操作の摩擦を減らす仕事に加えて、機能と人の関係を設計する仕事になる。",
  },
  {
    id: "support-without-friction",
    type: "paragraph",
    text: "もちろん、愛着があれば不便でもよいわけではない。電話を受けるだけで要望を伝えられるAI執事は、操作を減らした上で人格を持っている。実用性と「推したくなること」は対立しない。むしろ、機能が生活に溶け込むほど、どのような存在としてそこにいるかが体験を左右する。",
  },
  {
    id: "agents-choose-services-heading",
    type: "heading",
    level: 2,
    text: "エージェントもサービスを選ぶ",
    anchor: "agents-choose-services",
  },
  {
    id: "mcp-definition",
    type: "paragraph",
    text: "この問いは、人が直接すべての画面を操作しない未来にも続く。Model Context Protocol（MCP）は、AIアプリケーションを外部のデータ、ツール、ワークフローへ接続するためのオープンな標準だ。マイクロサービス同士を通信させる仕組みそのものではなく、AIエージェントが必要な能力へ接続する共通の入口と捉える方が正確だ。",
  },
  {
    id: "agent-service-journey",
    type: "paragraph",
    text: "MCPのような接続方法が広がれば、一つのエージェントが予定を確認し、情報を探し、予約し、記録するように、複数のサービスを渡り歩く体験が増えていくはずだ。そのとき選択するのがエージェントであっても、最終的に体験を受け取るのは人である。どのサービスを使ったのか、どのように振る舞ったのか、また任せたいと思えるのか。機能の差が小さくなるほど、サービスの存在感は消えるのではなく、別の形で問われる。",
  },
  {
    id: "closing-call",
    type: "paragraph",
    text: "AI執事が見せたのは、献立を生成する機能の未来だけではなかった。システムは、名前を持ち、声を持ち、振る舞いを持つことで「推せる」存在になり得る。次の献立を頼むために仕方なく画面を開くのではなく、あの執事からの電話ならまた出たいと思う。その小さな差が、これからのUXを大きく分けるのかもしれない。",
  },
  {
    id: "ai-hack-official-link",
    type: "externalLink",
    label: "AI HACK 2026 公式サイト",
    description: "開催日程、開発テーマ、評価基準、審査員プロフィールを確認できます。",
    href: "https://aihackathon.jp/",
  },
  {
    id: "ai-hack-final-link",
    type: "externalLink",
    label: "AI HACK 2026 最終日・成果発表会",
    description: "第2回AI HACKの成果発表会について掲載されているconnpassページです。",
    href: "https://aibuilderstokyo.connpass.com/event/406048/",
  },
  {
    id: "ai-hack-after-party-link",
    type: "externalLink",
    label: "AI HACK 2026 後夜祭",
    description: "最優秀賞受賞者によるパネルディスカッションが予定されている公式イベントページです。",
    href: "https://aibuilderstokyo.connpass.com/event/407680/",
  },
  {
    id: "mcp-introduction-link",
    type: "externalLink",
    label: "Model Context Protocol 公式ドキュメント",
    description: "MCPの目的と、AIアプリケーションが接続できる外部システムの概要です。",
    href: "https://modelcontextprotocol.io/docs/getting-started/intro",
  },
] as const satisfies readonly ArticleBlock[]
