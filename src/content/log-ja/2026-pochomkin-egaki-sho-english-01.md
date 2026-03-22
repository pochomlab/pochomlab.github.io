---
title: "📙 ポチョム菌の絵書 英語版の骨組みづくりを始めました"
date: 2026-03-22
tags: ["Egaki-sho", "Log", "BuildLog", "Translation", "KDP"]
summary: "ポチョム菌の絵書 英語版に向けて、日本語原稿の再コンポと英語訳の組み込みを開始。完全画像の上に文字を載せる構成へ切り替え、多言語展開しやすい骨組みづくりを進めています。"
author: "ぴーちゃん"
draft: false
---

ポチョム菌の絵書 英語版の制作に向けて、骨組みづくりを始めました。

今回は単に日本語を英訳するのではなく、日本語原稿そのものも見直しながら、英語版へ展開しやすい形に再構成しています。

仮組しているサンプル画像です。

<table>
  <thead>
    <tr>
      <th>日本語版 章扉</th>
      <th>英語版 章扉</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-01.webp"
          alt="日本語版 章扉"
          width="256">
      </td>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-01e.webp"
            alt="英語版 章扉"
            width=" 256">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>右開き想定</td>
      <td>左開き想定</td>
    </tr>
  </tfoot>  
</table>

<table>
  <thead>
    <tr>
      <th>日本語版 1-1</th>
      <th>英語版 1-1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-02.webp"
          alt="日本語版 1-1"
          width="256">
      </td>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-02e.webp"
            alt="英語版 1-1"
            width=" 256">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>右開き想定</td>
      <td>左開き想定</td>
    </tr>
  </tfoot>  
</table>

## 🛠️ 日本語原稿も再コンポしています

今回、翻訳作業に入るにあたって、セリフや章扉の composition ファイルも構成しなおしました。

これまでの日本語原稿をそのまま英語に置き換えるのではなく、日本語の並びや役割を整理し直したうえで、その下に英語訳を積んでいく形にしています。

このやり方にすることで、翻訳の比較や調整がしやすくなるだけでなく、今後ほかの言語へ展開する際のベースにも使いやすくなります。

---

## 🗂️ 章扉と本文の骨組みを分けて整理

章扉と各灯の本文は、Markdown ベースで分けて管理しています。

**Chapter-1.md**

```markdown
# Chapter Title Page

>ポチョム菌の　えがきしょ

Pochomkin Egaki-sho

>第一章

Chapter 1

>いのちの　はじまり

The Beginning of Life

## Chapter Title Page Narration

>ここは　ちいさな　ちいさな　はじまりのもり。  
いちばん　ちいさき　ものの　おおきな　たびが  
はじまるよ。

This is the little Forest of Beginnings.
Here begins the great journey
of the very smallest one.

```

**Light-001.md**

```markdown
# Light 1

>第1灯『うまれたひかり』

Light 1: The Light That Was Born

## Motif

- Universe
- Metaverse
- Greater Faydark

---

## Page 1

### Dialogue

 >「はるか　うちゅうの　かなたに──
 ぽうっと　ひかる　いのちの　き　が　あった。」

Far beyond, in the distant reaches of space—
there stood a softly glowing Tree of Life.

>「どこからか……
 ぽうっと　ひかる　まるい　タネが　あらわれた。」

From somewhere...
a softly glowing little round seed appeared.

---

## Page 2

### Dialogue

>「ぴき……
ぴきぴき……
……ぱりん！」

“Crk...
crk-crk...
...crack!”

>「ぴよ……？
……ぽちゃっ」

“Piyo...?
...plop.”

---

## Page 3

### Dialogue

>「ぽちょん」

“Pochon.”


>「……なんだか、
こころが　ぽかぽか　してきた。」

“…Somehow,
my heart feels
all warm and glowy.”

---

## Page 4

### Dialogue

>「あれ……？
 あの　ひかりは……」

“Huh...?
That light is...”

>「ぼく、
あの　ひかりに──
あってみたい。」

“I want...
to go and meet
that light.”

>「この　ひかりの　さきに、
だれかが　いる──
そんな　きが　した。」

Beyond that light,
it felt like...
someone was there.

```

このように、日本語と英語を対で確認できる形にしておくことで、章扉・セリフ・モチーフの対応が見えやすくなりました。

---

## 🖼️ 完全画像の上に文字を載せる構成に変更

今回の英語版では、セリフ入り画像を言語ごとに作り直すのではなく、セリフなしの完成画像の上に、Affinity Publisher で文字を配置する方式を採用しています。

この構成にすることで、画像資産を共通化しながら、日本語版・英語版・今後の他言語版にも差し替え対応しやすくなります。

また、編集工程を分離できるため、高価な専用環境に依存しすぎず、比較的取り掛かりやすい制作体制にもつながると感じています。

---

## これから

まずは英語版の骨組みを固めながら、日本語原稿の再整理とレイアウトの確認を進めていきます。

英語版が形になってくると、ほかのヨーロッパ系言語への展開もしやすくなっていきそうです。

ポチョム菌の絵書を、少しずつ多言語で灯せる形へ整えていきます。

---

最後に、実際の制作画面です。

セリフなしの完成画像の上に文字を配置し、
日本語版・英語版を差し替えやすい形で組んでいます。

![Affinity Publisherで英語版章扉を組んでいる制作画面](/images/log/2026/0322-pochomkin-egakisho-03.webp)
