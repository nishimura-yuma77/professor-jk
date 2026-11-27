# DialogueScreen

「シーンは表示内容と選択への応答を持つ。画面はそのシーンを上演する。」

`DialogueScreen` は現在の一場面だけを表示します。文字送り、クリックでの全文表示、次のクリックでの選択肢表示を内部で管理します。シーン群と現在のシーンID、分岐や副作用は呼び出し側で管理します。

```tsx
const [sceneId, setSceneId] = useState("entrance")
const [session, setSession] = useState(0)

const scenes: Record<string, DialogueScene> = {
  entrance: {
    speaker: { name: "J.K.教授", image: "/images/character/tachie.png" },
    text: "今日は何をしに来た？",
    choices: [{ id: "work", label: "仕事の相談をしたい" }],
    onSelect: () => setSceneId("work"),
  },
  work: {
    speaker: { name: "J.K.教授", image: "/images/character/tachie.png" },
    text: "詳しく聞かせてくれ。",
    choices: [{ id: "back", label: "戻る" }],
    onSelect: () => setSceneId("entrance"),
  },
}

<DialogueScreen key={`${session}-${sceneId}`} scene={scenes[sceneId]} />
```

- `speaker`、`text`、`choices`、`onSelect` がシーンの基本情報です。
- 一本道の会話は「次へ」などの選択肢を1つ渡します。`onSelect` はシーン切り替えに限らず、画面を閉じたり外部処理を呼び出したりできます。
- 選択肢の `variant: "primary"` は強調表示です。省略時は通常表示になります。
- `caption` は場面の補足ラベル、`supplement` は選択肢の前に表示する任意の内容です。
- シーンを切り替えるときは **`key` を変更**して文字送り・選択肢の状態をリセットします。同じシーンから会話を再開する場合も、セッション番号などを変えます。
- `animationDelay` は1文字あたりの表示間隔（ms、既定値35）です。
- `speaker.image` には表示する画像のURLを渡します。サブパス配信では呼び出し側で配信先に合うURLを指定します。
- モーダル、開閉ボタン、スクロールロック、終了後のフォーカス復帰は呼び出し側で管理します。ページ内にも配置できます。

実際の使用例は `components/feature/contact/ContactGuide.tsx` を参照してください。
