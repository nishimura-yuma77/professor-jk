import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "Webアプリのユーザーテーブルを考えるとき、最初はusersにメールアドレス、パスワード、roleを持たせれば十分に見えます。今回作っているCMSでも、ログインする人には管理者とコンテンツを操作するactorがいるため、当初は1つのusersで表現することも考えられました。",
  },
  {
    id: "opening-problem",
    type: "paragraph",
    text: "ただ、設計を進めるうちに「ログインできる人」と「システム上で何かを操作・所有する主体」は同じ概念ではないと感じました。そこでseijinbuでは、emailやpassword_hashを持つusersを認証主体に限定し、adminsとactorsを操作主体として別テーブルへ切り出しています。この記事では、その分離をDB設計だけでなく、actorログインとセッションの実装まで含めてまとめます。",
  },
  {
    id: "user-meaning-heading",
    type: "heading",
    level: 2,
    text: "「ユーザー」が二つの意味を持ち始めた",
    anchor: "user-has-two-meanings",
  },
  {
    id: "user-meaning-context",
    type: "paragraph",
    text: "今回のCMSには、認証のために必要な情報と、ドメイン上の操作主体として必要な情報があります。前者はメールアドレスやパスワードハッシュです。一方、後者は「誰のNovelAI Credentialか」「誰がprompt chunkを所有しているか」といった、業務データの所有関係に現れます。",
  },
  {
    id: "user-meaning-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "user-meaning-authentication",
        text: "認証主体: emailとpasswordを使って本人であることを確認するアカウント",
      },
      {
        id: "user-meaning-operation",
        text: "操作主体: 認証後にCMS上で機能を使い、ドメインデータを所有する主体",
      },
    ],
  },
  {
    id: "auth-subject-heading",
    type: "heading",
    level: 2,
    text: "usersは認証主体に限定した",
    anchor: "auth-subject-users",
  },
  {
    id: "auth-subject-intro",
    type: "paragraph",
    text: "usersには、ログインアカウントとして共通に必要な情報だけを置きました。現在のスキーマではemail、password_hash、メール確認日時、作成・更新日時を持っています。actor固有の設定やadmin固有の属性はここへ入れません。",
  },
  {
    id: "auth-subject-schema",
    type: "code",
    language: "typescript",
    filename: "src/db/schema.ts（users抜粋）",
    code: `export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  emailVerifiedAt: text('email_verified_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})`,
  },
  {
    id: "auth-subject-boundary",
    type: "paragraph",
    text: "このusers.idが表すのは、あくまで認証アカウントです。ログイン後の各機能で「このデータは誰のものか」を表すIDとしてusers.idをそのまま使わないことが、今回の設計で決めた境界です。",
  },
  {
    id: "operation-subject-heading",
    type: "heading",
    level: 2,
    text: "adminsとactorsを操作主体として切り出した",
    anchor: "operation-subjects",
  },
  {
    id: "operation-subject-intro",
    type: "paragraph",
    text: "認証後にどの主体としてシステムを操作するかは、adminsとactorsで表現します。どちらも独立した主キーを持ち、user_idでusersへ接続します。現在はuser_idをUNIQUEにしているため、1つのusersレコードに対して同じ種類の操作主体が複数ぶら下がることはありません。",
  },
  {
    id: "operation-subject-schema",
    type: "code",
    language: "typescript",
    filename: "src/db/schema.ts（admins / actors抜粋）",
    code: `export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  createdAt: text('created_at').notNull(),
})

export const actors = sqliteTable('actors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
})`,
  },
  {
    id: "operation-subject-cardinality",
    type: "paragraph",
    text: "ここでadminsやactorsを単なるroleマスタとして扱っていない点が重要です。それぞれが自分のidを持つため、他のテーブルは「roleがactorのuser」ではなく、明示的にactorそのものを参照できます。なお現在の制約では、1つのuserがadminとactorの両方を持つこと自体は禁止していません。両者を排他的にしたい要件が出た場合は、別途その制約を設計する必要があります。",
  },
  {
    id: "operation-subject-flow",
    type: "code",
    language: "text",
    filename: "認証主体と操作主体の関係",
    code: `users
  id: 10
  email: ...
       |
       | user_id
       +----------> actors
       |              id: 3
       |
       +----------> admins
                      id: 2

認証で使うID        操作・所有で使うID`,
  },
  {
    id: "role-heading",
    type: "heading",
    level: 2,
    text: "roleカラムでは足りなかった",
    anchor: "why-not-role-column",
  },
  {
    id: "role-intro",
    type: "paragraph",
    text: "もしactorとadminの違いが「画面Aを見られるか」のような権限差だけなら、users.roleやRBACで十分だったと思います。しかし今回のactorは、権限を表すラベルではなく、実際にドメインデータを所有する主体です。",
  },
  {
    id: "role-domain-ref",
    type: "code",
    language: "typescript",
    filename: "actorを所有主体にしているテーブルの例",
    code: `export const novelaiCredentials = sqliteTable('novelai_credentials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  actorId: integer('actor_id')
    .notNull()
    .unique()
    .references(() => actors.id),
  encryptedApiKey: text('encrypted_api_key').notNull(),
  // ...
})

export const actorPromptChunks = sqliteTable('actor_prompt_chunks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  actorId: integer('actor_id')
    .notNull()
    .references(() => actors.id),
  name: text('name').notNull(),
  // ...
})

export const actorPrivateAssets = sqliteTable('actor_private_assets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  actorId: integer('actor_id')
    .notNull()
    .references(() => actors.id),
  // ...
})`,
  },
  {
    id: "role-domain-explanation",
    type: "paragraph",
    text: "NovelAI Credential、prompt chunk、private assetはいずれもuser_idではなくactor_idを参照します。これによってDBを見るだけでも「このデータは認証アカウントに属する」のではなく「actorとしての作業領域に属する」と読み取れます。認証方式やusersの属性が変わっても、actorを中心にしたドメイン側の所有関係はそのまま保てます。",
  },
  {
    id: "login-heading",
    type: "heading",
    level: 2,
    text: "ログイン時に認証主体から操作主体へ変換する",
    anchor: "auth-to-operation",
  },
  {
    id: "login-intro",
    type: "paragraph",
    text: "テーブルを分けたなら、アプリケーション側でも境界を越える場所を決める必要があります。現時点でログインまで実装しているactor側では、emailからusersを検索し、actorsをJOINしてpasswordHashとactorIdを同時に取得します。パスワードが正しくても対応するactorが存在しなければ、actorとしてはログインできません。",
  },
  {
    id: "login-auth-code",
    type: "code",
    language: "typescript",
    filename: "actorAuth.server.ts（抜粋）",
    code: `const account = await getDb()
  .select({
    actorId: actors.id,
    passwordHash: users.passwordHash,
  })
  .from(users)
  .leftJoin(actors, eq(actors.userId, users.id))
  .where(eq(users.email, email))
  .get()

const passwordMatches = await compare(
  password,
  account?.passwordHash ?? dummyPasswordHash,
)

if (!account || account.actorId === null || !passwordMatches) return null

return account.actorId`,
  },
  {
    id: "login-session-code",
    type: "code",
    language: "typescript",
    filename: "actorSession.server.ts（抜粋）",
    code: `interface ActorSessionData {
  actorId: number
}

export async function startActorSession(actorId: number) {
  const session = await getActorSession()

  await session.clear()
  await session.update({ actorId })
}`,
  },
  {
    id: "login-flow",
    type: "code",
    language: "text",
    filename: "actorログイン後の主体の切り替わり",
    code: `email / password
      |
      v
users ---------------- 認証主体
      |
      | users.id = actors.user_id
      v
actors --------------- 操作主体
      |
      | actorId
      v
session
      |
      v
Credential / Prompt Chunk / Private Asset`,
  },
  {
    id: "login-boundary",
    type: "paragraph",
    text: "loginのServer FunctionもauthenticateActorから受け取るのはactorIdで、そのactorIdをセッションへ保存します。つまり、email/passwordによる本人確認が終わった時点で、以降の処理が持ち回る主体をuserからactorへ切り替えています。この実装によって、各機能で毎回users.roleを確認してactorかどうかを判定する必要がありません。",
  },
  {
    id: "join-heading",
    type: "heading",
    level: 2,
    text: "user情報が必要なときだけJOINして戻す",
    anchor: "join-user-data",
  },
  {
    id: "join-intro",
    type: "paragraph",
    text: "もちろん画面によっては、現在のactorに紐づくemailなど、認証アカウント側の情報も必要です。その場合はactorIdからactorsを起点にusersをJOINし、必要な形へ組み立て直します。",
  },
  {
    id: "join-code",
    type: "code",
    language: "typescript",
    filename: "findCurrentActorの返却イメージ",
    code: `return {
  user: {
    id: account.userId,
    email: account.email,
    emailVerifiedAt: account.emailVerifiedAt,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  },
  actor: {
    id: account.actorId,
    userId: account.actorUserId,
  },
}`,
  },
  {
    id: "join-explanation",
    type: "paragraph",
    text: "ここではuserとactorを無理に1つのモデルへ潰さず、返却値でも分けたまま扱っています。認証情報が必要な処理と、actorの所有データを操作する処理で、どちらのIDを使うべきかがコード上でも曖昧になりにくくなりました。",
  },
  {
    id: "benefits-heading",
    type: "heading",
    level: 2,
    text: "分離して得られたのは、責務が名前に出ることだった",
    anchor: "benefits",
  },
  {
    id: "benefits-intro",
    type: "paragraph",
    text: "この設計はテーブル数を減らす方向ではありません。むしろJOINも増えます。それでも採用したのは、DBとアプリケーションの両方で「今どの主体を扱っているのか」を明示できる利点が大きかったからです。",
  },
  {
    id: "benefits-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "benefit-auth-concerns",
        text: "usersを認証に必要な情報へ寄せ、actor/admin固有の責務を持ち込まずに済む",
      },
      {
        id: "benefit-domain-ownership",
        text: "actor_idという外部キーだけで、ドメインデータの所有主体を表現できる",
      },
      {
        id: "benefit-session-subject",
        text: "actor用セッションではactorIdを保持し、ログイン後の処理を操作主体基準で統一できる",
      },
      {
        id: "benefit-auth-change",
        text: "将来認証方式やusersの属性を変更しても、actorを参照するドメイン設計への影響を局所化しやすい",
      },
      {
        id: "benefit-role-evolution",
        text: "adminとactorが別の属性やライフサイクルを持つようになっても、それぞれのテーブルを独立して拡張できる",
      },
    ],
  },
  {
    id: "tradeoffs-heading",
    type: "heading",
    level: 2,
    text: "分けた分だけ、守るべき整合性も増える",
    anchor: "tradeoffs",
  },
  {
    id: "tradeoffs-intro",
    type: "paragraph",
    text: "一方で、usersへroleを1カラム追加する設計より考えることは増えます。今回の分離が常に正解というわけではなく、操作主体が独立したドメイン概念として必要かどうかで判断すべきだと思います。",
  },
  {
    id: "tradeoffs-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "tradeoff-join",
        text: "認証情報とactor情報を同時に使う場面ではJOINが必要になる",
      },
      {
        id: "tradeoff-creation",
        text: "actorアカウントを作るときはusersとactorsの両方を整合した状態で作成する必要がある",
      },
      {
        id: "tradeoff-missing-actor",
        text: "usersだけ存在してactorsが存在しない状態をどう扱うか決める必要があり、現在のactor認証ではログイン不可としている",
      },
      {
        id: "tradeoff-cross-role",
        text: "現在のUNIQUE制約はuserごとにactor 1件、admin 1件を保証するだけなので、同じuserが両方を持つことを禁止したい場合は追加設計が必要になる",
      },
      {
        id: "tradeoff-deletion",
        text: "アカウント削除時にusers、操作主体、その配下の所有データをどの順序と方針で削除するかを設計する必要がある",
      },
    ],
  },
  {
    id: "conclusion-heading",
    type: "heading",
    level: 2,
    text: "「ユーザー」という一語で全部を表さない",
    anchor: "conclusion",
  },
  {
    id: "conclusion",
    type: "paragraph",
    text: "今回の設計で整理できたのは、usersは人そのものを表す万能テーブルではなく、認証アカウントという責務を持つテーブルだということでした。認証後に何として振る舞うのかはactorsやadminsが受け持ち、actor固有のデータはactor_idへ紐づける。認証主体から操作主体へ境界を一度越える形にしたことで、各テーブルと各IDの意味がかなり明確になりました。",
  },
  {
    id: "conclusion-guide",
    type: "paragraph",
    text: "権限差しかない小さなシステムならusers.roleで十分です。一方で、ログイン後の主体が独自のデータを所有し、別のライフサイクルを持ち始めるなら、認証主体と操作主体を分ける価値があります。ユーザーテーブルを設計するときは、まず「このIDは本人確認のためのIDなのか、それともドメイン上で何かを所有するIDなのか」を分けて考えると整理しやすいと感じました。",
  },
] as const satisfies readonly ArticleBlock[]
