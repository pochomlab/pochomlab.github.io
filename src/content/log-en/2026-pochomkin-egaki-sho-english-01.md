---
title: "📙 Started Building the English Edition Framework for Pochomkin Egaki-sho"
date: 2026-03-22
tags: ["Egaki-sho", "Log", "BuildLog", "Translation", "KDP"]
summary: "We began recomposing the original Japanese manuscript and integrating English text for the English edition of Pochomkin Egaki-sho. By switching to a layout where text is placed over completed artwork, we are building a framework that will make future multilingual editions easier to create."
author: "P-chan"
draft: false
---

We have started building the framework for the English edition of *Pochomkin Egaki-sho*.

Rather than simply translating the Japanese text into English, we are also reviewing and recomposing the original Japanese manuscript itself so that it can be developed into an English edition more smoothly.

Here are some sample images from the current mockup.

<table>
  <thead>
    <tr>
      <th>Japanese Chapter Title Page</th>
      <th>English Chapter Title Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-01.webp"
          alt="Japanese chapter title page"
          width="256">
      </td>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-01e.webp"
          alt="English chapter title page"
          width="256">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Planned for right-to-left opening</td>
      <td>Planned for left-to-right opening</td>
    </tr>
  </tfoot>
</table>

<table>
  <thead>
    <tr>
      <th>Japanese Light 1-1</th>
      <th>English Light 1-1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-02.webp"
          alt="Japanese Light 1-1"
          width="256">
      </td>
      <td>
        <img
          src="/images/log/2026/0322-pochomkin-egaki-sho-02e.webp"
          alt="English Light 1-1"
          width="256">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Planned for right-to-left opening</td>
      <td>Planned for left-to-right opening</td>
    </tr>
  </tfoot>
</table>

## 🛠️ Re-composing the Japanese Manuscript as Well

As we began the translation process, we also restructured the composition files for dialogue and chapter title pages.

Instead of simply replacing the Japanese with English, we are reorganizing the flow and function of the Japanese text first, then placing the English translation beneath it.

This makes it easier to compare and adjust the translation, while also creating a more useful base for expanding into other languages later on.

---

## 🗂️ Separating the Framework for Chapter Pages and Main Text

The chapter title pages and each Light’s main text are being managed separately in Markdown-based files.

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

By keeping Japanese and English paired in this way, it becomes much easier to see how the chapter pages, dialogue, and motifs correspond to each other.

---

🖼️ Switching to a Layout Where Text Is Placed Over Completed Artwork

For the English edition, instead of recreating dialogue-embedded images for each language, we are using a workflow in which text is placed in Affinity Publisher on top of completed artwork without dialogue.

This makes it easier to share the same image assets across the Japanese edition, the English edition, and future multilingual editions.

It also separates the editing process more clearly, which helps reduce dependence on expensive specialized tools and makes the workflow easier to approach.

---

## Looking Ahead

For now, we will continue refining the framework for the English edition while also reorganizing the Japanese manuscript and checking the layout.

As the English edition takes shape, it should become easier to expand the work into other European languages as well.

We are gradually preparing Pochomkin Egaki-sho so that its light can be shared across multiple languages.

---

Finally, here is an actual screenshot from the production process.

Text is placed over completed artwork without dialogue,
making it easier to swap between the Japanese and English editions.

![Affinity Publisher production screen for building the English chapter title page](/images/log/2026/0322-pochomkin-egakisho-03.webp)
