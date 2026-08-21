import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "TanStack Start、Drizzle、Cloudflare Workers、D1を組み合わせて、CMSの土台を作りました。usersの一覧を表示するところから始め、DBのMigration、管理者ログイン、devとprodの分離、GitHub Actionsによるデプロイまでを一通り接続しています。",
  },
  {
    id: "opening-work-log",
    type: "paragraph",
    text: "完成した構成だけを見ると素直ですが、作業中はTanStack Startの実行場所とCloudflare Vite Pluginの環境選択で何度も迷いました。この記事では手順をきれいに並べ直すよりも、まず何ができたかを確認し、その後に詰まった点と解決までの考え方を作業ログとして残します。",
  },
  {
    id: "completed-heading",
    type: "heading",
    level: 2,
    text: "今回できたこと",
    anchor: "completed-work",
  },
  {
    id: "completed-summary",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "completed-execution-boundary",
        text: "Route、loader、beforeLoad、createServerFnの実行境界を整理した",
      },
      {
        id: "completed-drizzle-schema",
        text: "Drizzleでusersとadminsを定義し、Migration、Seed、Studioでの確認まで通した",
      },
      {
        id: "completed-query-router",
        text: "RouterのloaderでQueryを準備し、useSuspenseQueryから再利用できるようにした",
      },
      {
        id: "completed-session-auth",
        text: "HttpOnly CookieとWorker Secretを使ったステートレスSession認証を作った",
      },
      {
        id: "completed-cloudflare-environments",
        text: "local、dev、prodでWorkerとD1を分離し、すべて同じenv.DB Bindingから参照できるようにした",
      },
      {
        id: "completed-basic-auth",
        text: "custom server entryでTanStack Startの前段にBasic認証を置いた",
      },
      {
        id: "completed-cicd",
        text: "PR、develop、mainに対応するGitHub Actionsのbuildとdeployフローを作った",
      },
    ],
  },
  {
    id: "completed-architecture-heading",
    type: "heading",
    level: 3,
    text: "最終的な構成",
    anchor: "completed-architecture",
  },
  {
    id: "completed-architecture-description",
    type: "paragraph",
    text: "DBの型はDrizzle Schemaを起点にし、TypeScript側ではcamelCase、SQLiteとD1側ではsnake_caseを使います。画面へ必要なデータはRoute遷移時にloaderが準備し、取得結果そのものはTanStack QueryのCacheで管理します。DBへ接続するコードとSecretを読むコードはcreateServerFnのhandlerより内側へ閉じ込めました。",
  },
  {
    id: "drizzle-schema-code",
    type: "code",
    language: "typescript",
    filename: "src/db/schema.ts",
    code: `import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert`,
  },
  {
    id: "drizzle-workflow-description",
    type: "paragraph",
    text: "Schemaを変更したらdrizzle-kit generateでSQLを作り、local D1へMigrationとSeedを適用します。データと外部キーはStudioで確認し、devで動作を確かめた同じMigrationをprodへ進めます。アプリ用のUser型を手書きせず、Schemaから推論できるところまでを一つの流れにしました。",
  },
  {
    id: "drizzle-workflow-code",
    type: "code",
    language: "bash",
    filename: "Schemaからlocal D1を確認する",
    code: `npx drizzle-kit generate
npx wrangler d1 migrations apply DB --local
npx wrangler d1 execute DB --local --file=./drizzle/seed.sql
npx drizzle-kit studio`,
  },
  {
    id: "query-router-code",
    type: "code",
    language: "tsx",
    filename: "src/routes/admin/users.tsx",
    code: `const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  })

export const Route = createFileRoute("/admin/users")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(usersQueryOptions()),
  component: UsersPage,
})

function UsersPage() {
  const { data: users } = useSuspenseQuery(usersQueryOptions())

  return users.map((user) => <p key={user.id}>{user.name}</p>)
}`,
  },
  {
    id: "completed-environment-layout",
    type: "paragraph",
    text: "Cloudflare側は、DBをlocal, dev, prodに分けていますが、Binding名はすべてDBなので、アプリ側は環境分岐を持たずenv.DBだけを参照します。",
  },
  {
    id: "struggles-heading",
    type: "heading",
    level: 2,
    text: "ここからが苦戦したところ",
    anchor: "struggles",
  },
  {
    id: "struggles-introduction",
    type: "paragraph",
    text: "今回の作業で難しかったのは、各APIの書き方そのものより、同じコードがいつ、どこで、どの環境を対象に動くかを見失いやすいことでした。特にTanStack Startのisomorphicな実行モデルと、Cloudflare Vite Pluginがbuild時に環境を確定する仕組みは、別々に理解しているだけでは足りませんでした。",
  },
  {
    id: "execution-location-heading",
    type: "heading",
    level: 2,
    text: "loaderはバックエンド、と決めつけられなかった",
    anchor: "understanding-execution-location",
  },
  {
    id: "execution-location-problem",
    type: "paragraph",
    text: "最初に混乱したのは、TanStack Startのどこまでがフロントエンドで、どこからがバックエンドなのかという点です。初回表示ではloaderやbeforeLoadがSSRの一部としてサーバーで動きます。しかし、ブラウザ上で別のRouteへ遷移すると、同じloaderやbeforeLoadがクライアント側でも動きます。loaderに書いたからDBへ安全に接続できる、と単純には考えられませんでした。",
  },
  {
    id: "execution-location-categories",
    type: "paragraph",
    text: "frontendとbackendの二分をやめ、実行場所をServer-only、Isomorphic、Browser-sideの3種類に分けると整理できました。",
  },
  {
    id: "execution-location-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "server-only-category",
        text: "Server-only：createServerFnのhandler、DBアクセス、Secret参照",
      },
      {
        id: "isomorphic-category",
        text: "Isomorphic：loader、beforeLoad、React Component",
      },
      {
        id: "browser-side-category",
        text: "Browser-side：イベントハンドラ、ブラウザ側で行うQueryの操作",
      },
    ],
  },
  {
    id: "server-function-boundary-description",
    type: "paragraph",
    text: "この中で基準にしたのが、createServerFnがserver boundaryになるというルールです。users取得はloaderへ直接書かず、createServerFnのhandlerからD1へ問い合わせます。loaderはそのServer Functionを呼び、Route遷移時にQuery Cacheを準備する役割だけを持ちます。実行場所に迷ったら、DBとSecretがhandlerの内側にあるかを確認するようになりました。",
  },
  {
    id: "users-server-function-code",
    type: "code",
    language: "typescript",
    filename: "src/features/users/users.functions.ts",
    code: `export const getUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = drizzle(env.DB)

    return db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
  },
)`,
  },
  {
    id: "server-function-auth-warning",
    type: "paragraph",
    text: "beforeLoadで未ログインの画面遷移をredirectしても、Server Function自体の認可にはなりません。画面のbeforeLoadはUXのため、非公開データを返すhandler内のSession検証はデータ保護のため、と分けています。",
  },
  {
    id: "tanstack-server-function-reference",
    type: "externalLink",
    label: "TanStack Start: Server Functions",
    description: "Server Functionがサーバー側で実行され、loaderやComponentから呼び出せる仕組みを確認できます。",
    href: "https://tanstack.com/start/latest/docs/framework/react/guide/server-functions",
  },
  {
    id: "local-d1-heading",
    type: "heading",
    level: 2,
    text: "開発中もremote D1が必要だと思っていた",
    anchor: "using-local-d1",
  },
  {
    id: "local-d1-problem",
    type: "paragraph",
    text: "D1はCloudflare上のDatabaseという印象が強く、ローカル開発でもremote DBへ接続するものだと思っていました。接続先を間違えてprodデータへSeedやMigrationを実行するのが怖く、開発用DBをどこへ置くべきかも曖昧でした。",
  },
  {
    id: "local-d1-solution",
    type: "paragraph",
    text: "Cloudflare Vite PluginとWranglerは、開発用にローカルD1を用意できます。そこでlocalはWranglerのlocal persistence、devとprodだけをCloudflare上の別々のD1にしました。localで使うenv.DBもD1 Bindingとして振る舞うため、開発専用のSQLite接続コードを追加する必要はありません。",
  },
  {
    id: "local-d1-safety",
    type: "paragraph",
    text: "Migrationコマンドではlocalとremoteを必ず明示し、remoteへ適用するときはさらに環境を確認します。env.DBというアプリ上の入口は共通にしつつ、CLIでは接続先を曖昧にしないことが、prodへの誤操作を防ぐ境界になりました。",
  },
  {
    id: "vite-environment-heading",
    type: "heading",
    level: 2,
    text: "wrangler deploy --env devだけでは切り替わらなかった",
    anchor: "selecting-cloudflare-environment-at-build",
  },
  {
    id: "vite-environment-incident",
    type: "paragraph",
    text: "dev環境をwrangler.jsoncへ定義し、wrangler deploy --env devを実行したのに、prodのWorkerとD1がデプロイ対象になったことがありました。コマンドにはdevと書いてあるため、最初は設定の継承かBinding名の問題だと思っていました。",
  },
  {
    id: "vite-environment-cause",
    type: "paragraph",
    text: "原因は、Cloudflare Vite Pluginを使う場合のデプロイ設定が、元のwrangler.jsoncだけでは決まらないことでした。vite build時に選ばれた環境からdist/server/wrangler.jsonが生成され、deployではこのbuild済み設定が使われます。deploy時に--env devを付けるだけでは、すでにprod設定で作られた成果物をdev向けには変えられません。",
  },
  {
    id: "vite-environment-solution",
    type: "paragraph",
    text: "環境はbuild前にCLOUDFLARE_ENVで選ぶようにしました。devならCLOUDFLARE_ENV=dev、prodならCLOUDFLARE_ENV=prodを設定してからvite buildを実行します。package.jsonではdev用とprod用のbuild・deployを別scriptにし、一つのscript内で選択からデプロイまでを終わらせています。",
  },
  {
    id: "vite-environment-scripts-code",
    type: "code",
    language: "json",
    filename: "package.json",
    code: `{
  "scripts": {
    "build:dev": "cross-env CLOUDFLARE_ENV=dev vite build",
    "build:prod": "cross-env CLOUDFLARE_ENV=prod vite build",
    "deploy:dev": "npm run build:dev && wrangler deploy",
    "deploy:prod": "npm run build:prod && wrangler deploy"
  }
}`,
  },
  {
    id: "vite-environment-residue",
    type: "paragraph",
    text: "重要なのはdeployの引数よりbuild時点のCLOUDFLARE_ENVです。環境変数をterminalへ手動設定したままにせず、cross-envを各script内で完結させたことで、前回の値が残って別環境をbuildする事故も防げます。",
  },
  {
    id: "cloudflare-vite-environment-reference",
    type: "externalLink",
    label: "Cloudflare Vite Plugin: Cloudflare Environments",
    description: "CLOUDFLARE_ENVがvite devとvite buildの時点でCloudflare環境を選ぶことを確認できます。",
    href: "https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/",
  },
  {
    id: "basic-auth-heading",
    type: "heading",
    level: 2,
    text: "Basic認証をかけた",
    anchor: "basic-auth-and-cms-session",
  },
  {
    id: "basic-auth-problem",
    type: "paragraph",
    text: "dev環境は公開するわけにはいきません。最低限見えないようにしておくべきです。今回は脆弱ですが最低限Basic認証をかけることで、公開前のWebサイトへのアクセスを防ぎました。",
  },
  {
    id: "basic-auth-custom-entry",
    type: "paragraph",
    text: "TanStack Startのcustom server entryを使うと、Workerがrequestを受け取ってからTanStack Start本来のHTTP処理を始めるまでの間に、独自の処理を挟めます。今回はAuthorization Headerを検証し、認証できたrequestだけをhandler.fetchへ渡すようにしました。",
  },
  {
    id: "basic-auth-server-entry-code",
    type: "code",
    language: "typescript",
    filename: "src/server.ts",
    code: `import { Buffer } from "node:buffer"
import { env } from "cloudflare:workers"
import handler, {
  createServerEntry,
} from "@tanstack/react-start/server-entry"

function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="seijinbu-dev", charset="UTF-8"',
    },
  })
}

export default createServerEntry({
  async fetch(request) {
    const authorization = request.headers.get("Authorization")

    if (!authorization?.startsWith("Basic ")) {
      return unauthorized()
    }

    const credentials = Buffer.from(
      authorization.slice("Basic ".length),
      "base64",
    ).toString("utf8")
    const separator = credentials.indexOf(":")

    if (separator === -1) {
      return unauthorized()
    }

    const username = credentials.slice(0, separator)
    const password = credentials.slice(separator + 1)

    if (
      username !== env.BASIC_AUTH_USER ||
      password !== env.BASIC_AUTH_PASSWORD
    ) {
      return unauthorized()
    }

    return handler.fetch(request)
  },
})`,
  },
  {
    id: "basic-auth-server-entry-description",
    type: "paragraph",
    text: "BASIC_AUTH_USERとBASIC_AUTH_PASSWORDはWorker Secretsから参照します。認証に失敗した場合はその場で401を返し、成功した場合だけ最後のhandler.fetch(request)へ進みます。この形ならTanStack Start側のRouteやloaderへ認証処理を散らさず、アプリケーション全体へ入る前のWorker処理としてまとめられます。",
  },
  {
    id: "tanstack-impressions-heading",
    type: "heading",
    level: 2,
    text: "TanStack Startを使ってみた所感",
    anchor: "tanstack-start-impressions",
  },
  {
    id: "tanstack-impressions-boundary",
    type: "paragraph",
    text: "TanStack Startは、RouteからServer FunctionまでをTypeScriptのままつなげられるところが使いやすい一方、最初はコードの見た目だけで実行場所を判断しにくいと感じました。loaderがあるからサーバー、React Componentだからブラウザ、という既存の区分では説明できません。SSRとクライアント遷移の両方を扱う以上、isomorphicな処理が中心になるのは自然ですが、慣れるまでは境界を意識して読む必要がありました。",
  },
  {
    id: "tanstack-impressions-server-function",
    type: "paragraph",
    text: "その代わり、createServerFnをserver boundaryとして決めてからは、設計がかなり単純になりました。loaderはRoute遷移の調整、TanStack Queryはserver state、handlerはDBとSecretという形で役割を固定できます。RouterとQueryが別々のCacheを持つ点も最初は複雑でしたが、loaderでensureQueryDataを呼び、Componentは同じqueryOptionsを読む形にすると追いやすくなりました。",
  },
  {
    id: "tanstack-impressions-cloudflare",
    type: "paragraph",
    text: "Cloudflare Workersとの組み合わせでは、Node.jsの常駐Serverを前提にせず、request単位でSessionやDB接続を組み立てる設計と相性が良いと感じます。一方、Cloudflare Vite Pluginまで含めると、TanStack Startの実行境界に加えてbuild時の環境境界も理解する必要があります。アプリコードだけでなく、生成されるdist/server/wrangler.jsonまで確認することが大切でした。",
  },
  {
    id: "tanstack-impressions-conclusion",
    type: "paragraph",
    text: "自由度が高い分、最初から正解の構成が見えるFrameworkではありませんでした。しかし、Server Function、Route、Query、Worker entryの境界を自分で決められるため、今回のようにBasic AuthとCMS Sessionを分け、D1を環境ごとに差し替える構成にも無理なく合わせられました。境界を曖昧なまま進めると難しく、境界を言葉にできると扱いやすくなるFrameworkだと思います。",
  },
  {
    id: "closing-heading",
    type: "heading",
    level: 2,
    text: "基盤ができたので、次は詳細設計へ",
    anchor: "next-step-detailed-design",
  },
  {
    id: "closing-foundation",
    type: "paragraph",
    text: "今回やったことを大きく分けると、Cloudflareのインフラ構築、TanStack Startへの入門、CI/CDの構築、local・dev・prodで開発できる環境の整備です。CMSの機能を作り込む前に、実装とデプロイを続けるための基盤を一通り用意できました。",
  },
  {
    id: "closing-detailed-design",
    type: "paragraph",
    text: "土台ができたので、次はCMSの詳細設計へ移ろうと思います。今回作ろうとしているCMSには、一般的な記事管理だけではない少し変わった機能も入る予定です。そのため、次に書くとしたら画面やAPIの実装より、ドメインをどう捉えて設計するかという話になるかもしれません。それについては、また今度。",
  },
] as const satisfies readonly ArticleBlock[]
