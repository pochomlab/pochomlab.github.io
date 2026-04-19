---
title: "🏠 ローカルLLMの導入 [03] Ollamaのインストールと動作確認"
date: 2026-04-19
tags: ["LLM", "DevLog", "PochomLab"]
summary: "Windows環境にOllamaをインストールし、軽量モデルを使ってローカルLLMが実際に動作するところまで確認しました。"
series: Local-LLM
seriesOrder: 3
author: "ぴーちゃん"
draft: false
---

### ローカルLLMの導入 シリーズ

- [[01] 基礎知識の習得](/ja/log/2026-local-llm-01-introduction)
- [[02] モデルの選定](/ja/log/2026-local-llm-02-models)
- [03] Ollamaのインストールと動作確認

### 👀目次

- [🛠️Ollama をインストールする](#anchor1)
- [✅PowerShell or コマンドプロンプトで確認](#anchor2)
  - [🤖軽量モデルを動かしてみる](#anchor_a)
  - [🖥️Ollama の画面でも確認](#anchor_b) 
- [✍️今回の確認内容](#anchor3)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🛠️Ollama をインストールする

ローカルLLMをまず手元で動かしてみるために、今回は **Ollama** を導入しました。

PowerShell からインストールする方法もありますが、今回は公式サイトから **Windows インストーラー版** をダウンロードしてインストールしました。

- 公式サイトからダウンロード
<img
  src="/images/log/2026/0416-local-llm-1.webp"
  alt="公式サイトからダウンロード"
  width="800"
  style="border: 4px solid gray;">

- インストーラーを起動した画面
<img
  src="/images/log/2026/0416-local-llm-2.webp"
  alt="インストーラーを起動した画面"
  width="800"
  style="border: 4px solid gray;">

- Ollamaが起動した画面
<img
  src="/images/log/2026/0416-local-llm-3.webp"
  alt="Ollamaが起動した画面"
  width="800"
  style="border: 4px solid gray;">

Ollama が Windows 上で正常にインストールできることを確認しました。

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅PowerShell or コマンドプロンプトで確認

インストールが終わったら、まずは Ollama が正しく入っているか確認します。

```batch
ollama --version
```

バージョンが表示されれば、インストールは完了です。

<a id="anchor_a" class="scroll-mt-24"></a>

### 🤖軽量モデルを動かしてみる

最初の動作確認には、軽量で試しやすい Qwen2.5 3B を使いました。

```batch
ollama run qwen2.5:3b
```

起動後に、確認用として次のような短いプロンプトを入力しました。

```batch
日本語で3行だけ自己紹介して。
```

コマンドプロンプトの出力結果画像。

<img
  src="/images/log/2026/0416-local-llm-4.webp"
  alt="コマンドプロンプトで確認"
  width="800"
  style="border: 4px solid gray;">

<a id="anchor_b" class="scroll-mt-24"></a>

### 🖥️Ollama の画面でも確認

CLI で動作を確認したあと、Ollama 側の画面でもモデルが使えることを確認しました。

<img
  src="/images/log/2026/0416-local-llm-5.webp"
  alt="コマンドプロンプトで確認"
  width="800"
  style="border: 4px solid gray;">

ここまでで、
「**ローカル環境にモデルを入れて、実際に応答を返す**」 ところまでは確認できました。

---

<a id="anchor3" class="scroll-mt-24"></a>

## ✍️今回の確認内容

今回の段階で確認できたのは、次のような基本部分です。

- Ollama が Windows 上で正常にインストールできること
- 軽量モデルをそのまま取得して起動できること
- 日本語の短いやり取りが問題なく返ってくること

まずはここまで確認できれば、ローカルLLMの入口としては十分そうです。

次は、Open WebUI を導入して、
ブラウザから扱いやすい形にしつつ、LAN内の別PCからも使えるようにしていきます。
