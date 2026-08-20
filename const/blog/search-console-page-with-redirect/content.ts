import type { ArticleBlock } from "@/const/article"

export const content = [
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
] as const satisfies readonly ArticleBlock[]
