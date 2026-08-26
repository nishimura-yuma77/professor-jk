import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "外部サービスと連携するWebアプリを作っていると、ユーザー自身のAPIキーをサービス側で預かり、そのCredentialを使って外部APIを呼びたい場面があります。今回作っているCMSでは、各ユーザーが所有するNovelAI APIキーを登録し、画像生成時にそのキーを使う設計にしました。",
  },
  {
    id: "opening-problem",
    type: "paragraph",
    text: "考える必要があったのは、単に機密情報をDBへ保存する方法ではありません。保存したAPIキーは後から外部APIへ渡す必要があり、その一方でブラウザやログへ不用意に露出させたくありません。この記事では、保存・参照・利用の3つのフェーズに分けて、APIキーをどこまで到達可能にするかを設計した過程をまとめます。",
  },
  {
    id: "requirements-heading",
    type: "heading",
    level: 2,
    text: "ユーザーのAPIキーを預かる必要が出てきた",
    anchor: "requirements",
  },
  {
    id: "requirements-introduction",
    type: "paragraph",
    text: "要件は、サービス共通のNovelAIアカウントを用意するのではなく、ログイン中のユーザーに紐づくAPIキーを使って画像を生成することでした。この時点で、APIキーの保存方法だけでなく、登録後にどう利用するかまで含めて設計する必要があります。",
  },
  {
    id: "requirements-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "requirement-per-user",
        text: "APIキーをユーザーごとに保持する",
      },
      {
        id: "requirement-reuse",
        text: "保存したAPIキーを後から外部APIの呼び出しに利用できる",
      },
      {
        id: "requirement-browser",
        text: "ブラウザへAPIキーそのものを必要以上に返さない",
      },
      {
        id: "requirement-database",
        text: "DBだけが漏洩しても、そのままAPIキーとして利用できる状態にしない",
      },
    ],
  },
  {
    id: "hash-heading",
    type: "heading",
    level: 2,
    text: "パスワードと違ってハッシュ化では解決できなかった",
    anchor: "why-not-hash",
  },
  {
    id: "hash-password",
    type: "paragraph",
    text: "最初に整理したのは、パスワード保存との違いです。パスワード認証では、入力された値が正しいか検証できればよく、元のパスワードを復元する必要はありません。そのため、不可逆なハッシュとして保存できます。",
  },
  {
    id: "hash-api-key",
    type: "paragraph",
    text: "一方、外部APIのCredentialは違います。画像を生成するときには、保存していたAPIキーをNovelAIへAuthorizationとして送信しなければなりません。元の値を取り出せないハッシュでは、この用途を満たせません。",
  },
  {
    id: "hash-comparison-code",
    type: "code",
    language: "plaintext",
    filename: "PasswordとAPI Keyの違い",
    code: `Password
  -> Hash
  -> Database
  -> 入力値と照合

API Key
  -> Encrypt
  -> Database
  -> Decrypt
  -> External API`,
  },
  {
    id: "hash-conclusion",
    type: "paragraph",
    text: "そこでAPIキーは、サーバーだけが元の値へ戻せる可逆暗号化で保存することにしました。ここで重要なのは、復号できること自体を目的にするのではなく、復号できる主体と場所を限定することです。",
  },
  {
    id: "storage-heading",
    type: "heading",
    level: 2,
    text: "DBと暗号化鍵を分離してAPIキーを保存する",
    anchor: "encrypted-storage",
  },
  {
    id: "storage-schema",
    type: "paragraph",
    text: "DB設計では、ユーザーとして画像生成を行うactorとNovelAI Credentialを1対1で紐づけ、novelai_credentialsへ暗号化済みAPIキーだけを保存します。APIキーを平文で保持するカラムは作りませんでした。",
  },
  {
    id: "storage-schema-code",
    type: "code",
    language: "plaintext",
    filename: "schema.dbml",
    code: `table novelai_credentials {
  id integer [pk, increment]
  actor_id integer [not null, unique, ref:> actors.id]
  encrypted_api_key text [not null]
  created_at text [not null]
  updated_at text [not null]
}`,
  },
  {
    id: "storage-key-separation",
    type: "paragraph",
    text: "暗号文だけをDBへ置いても、復号用の鍵を同じDBへ保存してしまえば分離する意味が薄くなります。そこで復号用の暗号化鍵はCloudflare WorkerのSecretとして管理し、D1には暗号文だけを保存する構成にしました。DBとSecretを別の管理境界へ置くことで、DBの内容だけでは元のAPIキーへ戻せない状態にします。",
  },
  {
    id: "storage-flow-code",
    type: "code",
    language: "plaintext",
    filename: "APIキー登録時の流れ",
    code: `NovelAI API Key
        |
        v
registerNovelAIKey
        |
        v
Web Crypto API
        |
        v
encrypted_api_key
        |
        v
Cloudflare D1

Encryption Key
        |
        +---- Cloudflare Secret`,
  },
  {
    id: "storage-webcrypto",
    type: "paragraph",
    text: "暗号化処理はサーバー側でWeb Crypto APIを利用し、認証付き暗号であるAES-GCMを使う構成にしました。暗号文と復号に必要な付随情報は保存しますが、暗号化鍵そのものはDBへ入れません。暗号アルゴリズムを選ぶこと以上に、暗号化鍵をアプリケーションデータと同じ場所へ置かないことを意識しています。",
  },
  {
    id: "boundary-heading",
    type: "heading",
    level: 2,
    text: "復号したAPIキーをクライアントへ返さない",
    anchor: "do-not-return-api-key",
  },
  {
    id: "boundary-settings",
    type: "paragraph",
    text: "次に考えたのが設定画面です。APIキーを登録した以上、画面では連携済みかどうかを表示したくなります。しかし、そのために登録済みAPIキーを取得するgetNovelAIKeyのような関数を作る必要はありません。",
  },
  {
    id: "boundary-state-code",
    type: "code",
    language: "typescript",
    filename: "設定画面へ返す状態",
    code: `type NovelAIIntegrationState = {
  isIntegrated: boolean
}

// APIキーそのものは返さない
return {
  isIntegrated: credential !== undefined,
}`,
  },
  {
    id: "boundary-minimum-data",
    type: "paragraph",
    text: "設定UIが知りたいのはCredentialの値ではなく、連携が成立しているかどうかです。そこでgetNovelAIIntegrationStateでは、APIキーの存在をサーバー側で確認し、ブラウザへは状態だけを返します。必要な情報だけをRPC境界の外へ出すことで、復号済みCredentialをクライアントへ運ぶ経路そのものを作らないようにしました。",
  },
  {
    id: "usage-heading",
    type: "heading",
    level: 2,
    text: "APIキーを使う処理そのものをサーバー内で完結させる",
    anchor: "server-side-usage",
  },
  {
    id: "usage-introduction",
    type: "paragraph",
    text: "画像生成でも同じ考え方を適用します。ブラウザがAPIキーを取得してNovelAIへ直接リクエストするのではなく、ブラウザは自分たちのgenerateImageだけを呼びます。そのServer Functionの中で、ログイン中actorの特定、Credential取得、復号、NovelAI API呼び出しまでを完結させます。",
  },
  {
    id: "usage-flow-code",
    type: "code",
    language: "plaintext",
    filename: "画像生成時のCredential境界",
    code: `Browser
  |
  | generateImage(prompt...)
  v
Server Function
  |
  +-- ログイン中actorを特定
  +-- novelai_credentialsを取得
  +-- APIキーを復号
  +-- NovelAI APIを呼び出す
  |
  v
NovelAI`,
  },
  {
    id: "usage-server-function-code",
    type: "code",
    language: "typescript",
    filename: "generateImageの責務イメージ",
    code: `export const generateImage = createServerFn({ method: "POST" })
  .inputValidator(generateImageSchema)
  .handler(async ({ data }) => {
    const actor = await requireCurrentActor()
    const credential = await findNovelAICredential(actor.id)

    if (!credential) {
      throw new Error("NovelAI is not integrated")
    }

    const apiKey = await decryptApiKey(credential.encryptedApiKey)

    return requestNovelAI({
      apiKey,
      prompt: data.prompt,
    })
  })`,
  },
  {
    id: "usage-lifetime",
    type: "paragraph",
    text: "この形なら、復号済みAPIキーが必要になるのはServer Function内部で外部APIを呼ぶ瞬間だけです。Browser -> APIキー取得 -> NovelAIという経路を作らないため、フロントエンドのstate、Network Response、クライアント側のデバッグ情報などへCredentialが入り込む機会も減らせます。",
  },
  {
    id: "risk-heading",
    type: "heading",
    level: 2,
    text: "「暗号化して保存した」だけでは安全にならない",
    anchor: "remaining-risks",
  },
  {
    id: "risk-introduction",
    type: "paragraph",
    text: "ここまでの設計で平文保存は避けられますが、暗号化した時点で安全が完成するわけではありません。アプリケーションは外部APIを呼ぶために最終的には復号できる必要があるので、サーバーが持つ権限まで奪われればCredentialへ到達できます。",
  },
  {
    id: "risk-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "risk-db-secret",
        text: "DBと復号用Secretの両方が漏洩すればAPIキーを復元できる",
      },
      {
        id: "risk-log",
        text: "復号済みAPIキーやAuthorization Headerをログへ出力しない",
      },
      {
        id: "risk-error",
        text: "外部APIのリクエスト情報をそのままエラーオブジェクトへ含めない",
      },
      {
        id: "risk-update",
        text: "APIキー更新時に古いCredentialを残さない",
      },
      {
        id: "risk-delete",
        text: "連携解除時にCredentialを削除できるようにする",
      },
      {
        id: "risk-rotation",
        text: "暗号化鍵をrotationする場合は鍵のversion管理と再暗号化を考える",
      },
    ],
  },
  {
    id: "conclusion-heading",
    type: "heading",
    level: 2,
    text: "重要だったのは、復号できる範囲を狭くすることだった",
    anchor: "conclusion",
  },
  {
    id: "conclusion",
    type: "paragraph",
    text: "今回の設計で一番重要だったのは、APIキーをAES-GCMで暗号化したことそのものではありませんでした。DBには暗号文だけを置き、暗号化鍵をSecretへ分離し、設定画面には連携状態だけを返し、実際の復号と外部API呼び出しをServer Function内部へ閉じ込める。Credentialが存在できる範囲と移動できる経路を狭くしたことが、設計の中心です。",
  },
  {
    id: "conclusion-reuse",
    type: "paragraph",
    text: "ユーザーのGitHub Tokenや各種SaaSのAPIキーなど、外部サービスのCredentialを預かる機能でも同じ問題が出てきます。保存方法だけを見るのではなく、登録してから利用されるまでのデータフロー全体を追い、どの境界で平文が必要なのかを先に決めると設計しやすくなります。",
  },
] as const satisfies readonly ArticleBlock[]