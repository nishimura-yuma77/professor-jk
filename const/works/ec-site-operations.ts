import type { Work } from "@/const/works/types"

export const EC_SITE_OPERATIONS = {
  code: "WORK_001",
  slug: "ec-site-operations",
  title: "ECサイト運用 / 関連システムの新規機能開発 / 関連スクリプトのPoC開発",
  shortTitle: "ECサイトと周辺システム",
  category: "E-COMMERCE / SYSTEM DEVELOPMENT",
  lead: "SaaSでは届かない機能を、周辺システムで補う。ECサイトの運用から新機能開発、表示崩れを検知するPoCまで、PLとして技術と顧客対応の両面を担当。",
  summary: [
    "SaaS上に構築されたECサイトの運用・保守を担当。SaaS単体では実現できない機能群を補うWebシステムの運用・保守・新規機能開発、ECサイト上の商品の在庫管理システム、WordPressの表示崩れを検知するシステムのPoC開発にも携わった。",
    "初めての案件でPLを担当し、所属会社の上司に相談しながら進行。業務負荷も高い中、その都度必要な知識をキャッチアップしながら技術面・顧客対応の両方を横断して担当した。",
  ],
  role: "PL / Web Engineer",
  responsibilities: [
    "要件定義",
    "技術選定",
    "VPS環境構築",
    "開発環境構築",
    "自動テスト導入",
    "設計",
    "実装",
    "テスト",
    "リリース",
    "顧客折衝",
    "進捗会議の進行",
    "顧客MTGへの参加",
    "チーム内の開発推進",
  ],
  technologies: [
    { name: "Rocky Linux（VPS）" },
    { name: "Laravel / PHP" },
    { name: "JavaScript" },
    { name: "Playwright" },
    { name: "WordPress" },
    { name: "Python" },
  ],
  period: "2025年",
  team: [
    "フルスタックエンジニア 2〜4名",
    "インフラエンジニア 1名",
    "その他：デザイナー / フロントコーダー 複数名",
  ],
  details: [
    {
      id: "overview",
      title: "概要",
      paragraphs: [
        "SaaS上に構築されたECサイトと、その周辺システムの運用・保守・新規機能開発を担当した。ECサイト本体では実現できない機能についてはLaravelを利用したWebシステムとして補完し、商品の在庫管理に関わるシステムも開発した。また、WordPressサイトの表示崩れを自動検知する仕組みについて、PythonやPlaywrightを利用したPoC開発にも取り組んだ。",
      ],
    },
    {
      id: "enjoyed",
      title: "楽しかったこと",
      paragraphs: [
        "要望を要件に落とし込み、実際に問題が解決される様を自らの手で担えたこと。必要な技術を身につけ、その技術を使って現実の問題に切り込み、解決していくのはとても気持ちが良かった。",
      ],
    },
    {
      id: "challenges",
      title: "大変だったこと",
      paragraphs: [
        "初めての案件でPLを担当したこと。設計・実装だけでなく、進捗管理、顧客対応、他メンバーの支援まで並行して行う必要があった。担当範囲が徐々に広がり、すべてに手を回すことが難しくなる場面もあった。また、要件定義書だけでは十分に認識を合わせられないこともあった。",
      ],
    },
    {
      id: "approaches",
      title: "工夫したこと",
      items: [
        "要件定義書だけでは認識合わせが難しかったため、デザイナーとの共通言語として要件定義段階からFigmaを利用し、画面イメージと合わせて仕様を確認した。",
        "担当範囲が広がりすぎた際は所属会社の上司へ相談し、要件整理に付き合ってもらうほか、他メンバーへの支援や担当範囲外の機能について任せられる部分を切り分けて委譲した。",
        "必要な技術は自分で環境を作って試すことを重視し、フロント・バック・インフラ問わず、自ら手を動かしてキャッチアップした。本案件ではLaravel、Linux、VPS、Docker、自動テストなどがその例。",
      ],
    },
  ],
} as const satisfies Work
