---
title: "🏠 ローカルLLMの導入 [04] Open WebUIの導入とLAN内からの利用"
date: 2026-04-24
tags: ["LLM", "DevLog", "PochomLab"]
summary: "Open WebUI を導入し、Ollama と接続して、LAN内の別PCからローカルLLMを利用できるところまで確認しました。"
series: Local-LLM
seriesOrder: 4
author: "ぴーちゃん"
draft: false
---

### ローカルLLMの導入 シリーズ

- [[01] 基礎知識の習得](/ja/log/2026-local-llm-01-introduction)
- [[02] モデルの選定](/ja/log/2026-local-llm-02-models)
- [[03] Ollamaのインストールと動作確認](/ja/log/2026-local-llm-03-ollama)
- [04] Open WebUIの導入とLAN内からの利用

### 👀目次

- [🛠️Open WebUI を導入する理由](#anchor1)
- [🐍Python 3.11 を用意する](#anchor2)
- [📦Open WebUI をインストールする](#anchor3)
- [🔗Ollama と接続する](#anchor4)
- [🌐LAN内の別PCから利用する](#anchor5)
- [💾起動用バッチファイルを作成する](#anchor6)
- [✍️今回のメモ](#anchor7)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🛠️Open WebUI を導入する理由

Ollama 単体でもローカルLLMは動かせますが、  
作業用ノートPCなど **別のPCからブラウザで使える形** にしておくと、かなり扱いやすくなります。

今回はそのために **Open WebUI** を導入しました。

目的はシンプルで、

- ブラウザからローカルLLMを扱えるようにする
- LAN内の別PCからアクセスできるようにする
- モデルの切り替えやチャット確認をしやすくする

といったあたりです。

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🐍Python 3.11 を用意する

導入にあたって少し注意が必要だったのが Python のバージョンです。

現行の open-webui 0.8.12 は **Python 3.11 以上かつ 3.13 未満** に対応しており、  
Python 3.13 は非対応でした。

そのため今回は、既存の Python 3.13.1 を削除し、  
Windows の設定画面からアンインストールしたうえで、**Python Install Manager** を使って 3.11 を用意しました。

### ✋Python Install Manager のインストール

Microsoft Store からインストールしました。

起動すると、PATH 追加の確認が出るので **Yes** で進めます。

その後、PowerShell かコマンドプロンプトで確認します。

```batch
py list
```

```batch
py list --online
```

```batch
py install 3.11
```

<img
  src="/images/log/2026/0416-local-llm-6.webp"
  alt="Python3.11のインストール画面">

これで Python 3.11 の用意は完了です。

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📦Open WebUI をインストールする

インストール先の作業フォルダを作成します。

```PowerShell
mkdir D:\AI\open-webui
cd D:\AI\open-webui
```

次に、Python 3.11 を使って仮想環境を作ります。

```PowerShell
py -3.11 -m venv .venv
```

PowerShell で有効化します。

```PowerShell
.\.venv\Scripts\Activate.ps1
```

有効化できたら、Open WebUI をインストールします。

```PowerShell
python -m pip install --upgrade pip
pip install open-webui
```

起動は以下です。

```PowerShell
open-webui serve
```

<img
  src="/images/log/2026/0416-local-llm-7.webp"
  alt="Open WebUIが起動した画面">

ブラウザからアクセスします。

```
http://localhost:8080
```
<img
  src="/images/log/2026/0416-local-llm-8.webp"
  alt="ブラウザからアクセスした画面">

---

<a id="anchor4" class="scroll-mt-24"></a>

## 🔗Ollama と接続する

Open WebUI を起動したら、まず管理用アカウントを作成します。

<img
  src="/images/log/2026/0416-local-llm-9.webp"
  alt="管理用アカウント作成画像"
  width="800">

最初の状態では、モデル選択画面からまだ接続できていないことが確認できました。

<img
  src="/images/log/2026/0416-local-llm-10.webp"
  alt="まだ接続できていない画像"
  width="800">

**設定 > Ollama API接続の管理**
から接続先を変更します。

```
http://localhost:11434 → http://pc-name:11434
```

<img
  src="/images/log/2026/0416-local-llm-11.webp"
  alt="接続先を変更している画像"
  width="800">

このように変更すると、Open WebUI 側から Ollama に接続できるようになります。

その後、モデル選択画面で qwen2.5:3b が選べることを確認しました。

<img
  src="/images/log/2026/0416-local-llm-12.webp"
  alt="モデル選択画面で qwen2.5:3b が選べることを確認した画像"
  width="800">

チャットを入力し、応答が返ることも確認しました。

<img
  src="/images/log/2026/0416-local-llm-13.webp"
  alt="応答が返ることを確信した画像"
  width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🌐LAN内の別PCから利用する

ここまで確認できると、セットアップしたローカルLLMを
**LAN内の他のPCからブラウザ経由で利用できる** 状態になります。

今回やりたかったのもまさにこれで、

- 母艦PC側で Ollama を動かす
- Open WebUI をブラウザUIとして使う
- 作業用ノートPCなどからアクセスする

という構成です。

ローカルで推論を回しつつ、操作は別端末から行えるので、
実験環境としてかなり扱いやすくなりました。

---

<a id="anchor6" class="scroll-mt-24"></a>

## 💾起動用バッチファイルを作成する

Stable Diffusion や kohya_ss を起動するときと同じように、
VS Code のターミナルから起動しやすいよう、Open WebUI もバッチファイル化しました。

PowerShell でも起動できますが、権限まわりの設定が必要になる場合があるため、
今回は `.bat` にしておく方が手軽でした。

```batch
@echo off
REM ===== Open WebUI 起動バッチ =====

REM Dドライブへ移動
d:

REM Open WebUI のフォルダへ移動
cd D:\AI\open-webui

REM .venv が無ければ作成（初回だけ必要）
if not exist .venv (
    py -3.11 -m venv .venv
)

REM 仮想環境を有効化
call .venv\Scripts\activate.bat

REM Open WebUI を起動
call .venv\Scripts\open-webui serve

pause

```
---

<a id="anchor7"></a>

## ✍️今回のメモ

Open WebUI を実際に導入してみると、設定項目がかなり多く、クラウド型の生成AIサービスにも裏側でこうした調整ポイントがいろいろあるのだろうと少し実感しました。

また、Open WebUI は Stable Diffusion と連携できる構成もあるようなので、
今後はそのあたりも少しずつ試してみたいところです。