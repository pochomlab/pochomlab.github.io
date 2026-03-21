---
title: "📃 Log登録サンプルを作成"
date: 2026-03-19
tags: ["Log", "Events", "PochomLab"]
summary: "Log投稿用フロントマターの仕様と記述ルールを整理したサンプル。"
#series: 
#seriesOrder:
author: "ぴーちゃん"
draft: false
---

## ■ このLogページについて

- Log は ja / en 両対応で記事を投稿しています
- マークダウン形式で記述することが出来ます
- 省略する際は項目ラベルごと削除または(#)でコメントアウトします  

```yaml

---
title: "タイトル"
date: 2025-01-01
tags: ["Log", "DevLog", "BuildLog", "LabLog"]
summary: "まとめ"
#series: "" 
#seriesOrder: 0
author: "display name"
draft: true
---

本文…

```

## ■ title (必須)

- Log記事のタイトルを記載します。

## ■ date (必須)

- Log記事の日付を入力します。
- 通常は公開日、または記録として残したい日付を記載します。

## ■ tags (省略可)

- 記事の内容に関連するタグを配列で記載します。
- 例: ["Log", "DevLog", "PochomLab"]

## ■ summary (省略可)

- 記事一覧やカード上に表示する短い概要を記載します。
- 省略した場合は未設定でも構いません。

## ■ series (省略可)

- 連載やシリーズ記事としてまとめたい場合に指定します。
- 単独記事の場合は省略できます。

## ■ seriesOrder (省略可)

- シリーズ内の順番を数値で指定します。
- series を使わない場合は省略できます。

## ■ author (必須)

- author には公開用の表示名を記載してください。

## ■ draft (必須)

- true（ドラフト中）の場合、イベントページにカードは表示されません。
- false の場合、公開されます。

## ■ 各言語対応について

- 各言語版は、記事ファイルごとに生成AIへ共有し、翻訳・調整を行っています。
