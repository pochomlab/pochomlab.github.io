---
title: "🍓 Raspberry Piの導入 [04] 作業用PCのVS CodeからSSHでRaspberry Piを編集する"
date: 2026-05-31
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "作業用PCのVS CodeからRemote-SSHでRaspberry Piへ接続し、Raspberry Pi上のファイル編集とPython実行を試した記録です。"
series: raspberry-pi-4-setup
seriesOrder: 4
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Raspberry Pi OS のインストール](/ja/log/2026-raspberry-pi-02-os-installation)
- [[03] 初期設定と動作確認](/ja/log/2026-raspberry-pi-03-initial-setup)
- [04] 作業用PCの VS Code から SSH で Raspberry Pi を編集する

### 👀目次

- [🌱Raspberry Piを小さな開発機にするための第一歩](#anchor1)
- [🛠️Remote-SSHのインストール](#anchor2)
- [🔗VS CodeからRaspberry Piに接続する](#anchor3)
- [✅接続後の動作確認](#anchor4)
- [🐍Pythonプログラムの実行](#anchor5)
- [✍️今回の整理](#anchor6)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🌱Raspberry Piを小さな開発機にするための第一歩

前回までで、Raspberry Pi 4 の初期設定と基本的な動作確認まで進めました。

ただ、Raspberry Pi 本体にキーボードやマウス、モニターをつないだまま作業するのは、開発環境としては少し手間があります。机の上に機材が増えて、作業スペースも圧迫されやすくなります。

そこで今回は、作業用PCの VS Code から Raspberry Pi に SSH 接続し、Raspberry Pi 側のファイルを直接編集できるようにしていきます。

VS Code の Remote-SSH を使うと、作業用PCの VS Code を使いながら、実際のファイル編集やターミナル操作は Raspberry Pi 側で行えます。見た目はいつもの VS Code ですが、開いているファイルや実行しているコマンドは Raspberry Pi 側のものになります。

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🛠️Remote-SSHのインストール

まず、作業用PC側の VS Code に Remote-SSH 拡張機能をインストールします。

VS Code の左側にある拡張機能アイコンを開き、検索欄に `Remote-SSH` と入力します。

表示された Remote-SSH 拡張機能を選び、インストールします。

<img src="/images/log/2026/0424-4-raspberry-pi-01.webp"
  alt="Remote-SSH のプラグイン説明画面"
  width="600">

インストール作業はこれで完了です。

Raspberry Pi 側は、前回までの作業で SSH 接続できる状態になっていれば問題ありません。

---

<a id="anchor3" class="scroll-mt-24"></a>

## 🔗VS CodeからRaspberry Piに接続する

Remote-SSH をインストールしたら、VS Code から Raspberry Pi に接続してみます。

VS Code 左下にある青い `><` のようなアイコンをクリックします。

表示されたメニューから、以下を選びます。

```Markdown
Remote-SSH: Connect to Host...
```

<img src="/images/log/2026/0424-4-raspberry-pi-02.webp"
  alt="Connect to Host... の画面"
  width="600">

まだ接続先を登録していない場合は、`新規 SSH ホストを追加する...` を選択します。

SSH 接続のコマンドとして、次のように入力します。

```Markdown
ssh your-ID@hostname
```

ここでは、自分の環境に合わせて `your-ID` と `hostname` を置き換えます。

たとえば、ユーザー名が `pochomlab`、ホスト名が `pichom` の場合は、次のようになります。

```Markdown
ssh pochomlab@pichom
```

次に、更新する SSH 構成ファイルを選択します。

Windows の場合は、通常は以下のような場所になります。

```Markdown
C:\Users\your-ID\.ssh\config
```

登録が完了すると、コマンドパレットに登録したホスト名が表示されます。

```Markdown
hostname
```

接続先を選ぶと、リモートホストの種類を聞かれます。

```Markdown
Select the platform of the remote host "hostname"
```

ここでは Raspberry Pi OS に接続するので、`Linux` を選択します。

その後、Raspberry Pi のパスワードを入力します。

```Markdown
your-password
```

初回接続時には、Raspberry Pi 側に VS Code Server が自動でダウンロードされます。

<img src="/images/log/2026/0424-4-raspberry-pi-03.webp"
  alt="VS Code Server のダウンロード画面"
  width="600">

少し待つと接続が完了します。

接続できると、VS Code 左下の青いアイコン部分に、接続先のホスト名が表示されます。

<img src="/images/log/2026/0424-4-raspberry-pi-04.webp"
  alt="ホスト名が表示された画面"
  width="600">


これで、作業用PCの VS Code から Raspberry Pi に接続できました。

---

<a id="anchor4" class="scroll-mt-24"></a>

## ✅接続後の動作確認

### フォルダーを開く

接続できたら、VS Code 上で Raspberry Pi 側のフォルダーを開いてみます。

メニューから、以下を選びます。

```markdown
ファイル → フォルダーを開く
```

まずは、ホームディレクトリーを開いてみます。

<img src="/images/log/2026/0424-4-raspberry-pi-05.webp"
  alt="フォルダーを開く画面"
  width="600">

フォルダーを開くと、次のような確認が表示される場合があります。

```Markdown
このフォルダー内のファイルの作成者を信頼しますか？
```

今回は自分の Raspberry Pi 上のホームディレクトリーなので、次を選びます。

```Markdown
フォルダーを信頼して続行
```

必要に応じて、Raspberry Pi のパスワードを入力します。

```Markdown
your-password
```

これで、VS Code 上に Raspberry Pi のホームディレクトリーが表示されます。

<img src="/images/log/2026/0424-4-raspberry-pi-06.webp"
  alt="ホームディレクトリーを開いた画面"
  width="600">


### コマンドを実行してみる

次に、VS Code のターミナルを開いて、実際に Raspberry Pi 側でコマンドが実行されているか確認します。

以下のコマンドを実行します。

```bash
pwd
```

```bash
hostname
```

```bash
python3 --version
```
<img src="/images/log/2026/0424-4-raspberry-pi-07.webp"
  alt="コマンド実行画面"
  width="600">

`pwd` で Raspberry Pi 側のディレクトリーが表示され、`hostname` で Raspberry Pi のホスト名が表示されれば、リモート側で操作できていることが確認できます。

また、`python3 --version` で Python のバージョンが表示されれば、Raspberry Pi 側の Python も認識できています。

この時点で、作業用PCの VS Code を使っているものの、開いているファイルも、実行しているターミナルも、実体は Raspberry Pi 側にある状態になりました。

これはかなり便利です。

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🐍Pythonプログラムの実行

最後に、VS Code 上から簡単な Python プログラムを作成して、Raspberry Pi 側で実行してみます。

まず、ホームディレクトリーの下にテスト用のフォルダーを作成します。

```bash
mkdir pochomlab-pi-tests
```

作成したフォルダーを開き、新しく `hello_pi.py` というファイルを作成します。

```bash
/home/pochomlab/pochomlab-pi-tests/hello_pi.py
```

ファイルの中身は、まずはシンプルにしておきます。

```python
print("Hello from Raspberry Pi via VS Code Remote SSH!")
```

保存したら、VS Code のターミナルから作成した Python ファイルを実行します。

```bash
cd pochomlab-pi-tests
python3 hello_pi.py
```

実行結果として、次のように表示されれば成功です。

```bash
Hello from Raspberry Pi via VS Code Remote SSH!
```

<img src="/images/log/2026/0424-4-raspberry-pi-08.webp"
  alt="Python プログラムの実行画面"
  width="600">

これで、作業用PCの VS Code から Raspberry Pi 上の Python ファイルを作成し、そのまま Raspberry Pi 側で実行できることが確認できました。

---

<a id="anchor6" class="scroll-mt-24"></a>

## ✍️今回の整理

今回は、作業用PCの VS Code から Remote-SSH を使って Raspberry Pi に接続し、Raspberry Pi 側のファイルを編集・実行できるところまで確認しました。

ここまでできると、Raspberry Pi を小さな実験用PCとしてかなり扱いやすくなります。

Raspberry Pi 本体に毎回キーボードやマウスをつないで作業するのではなく、普段使っている作業用PCからそのまま編集できるため、開発の流れがかなりスムーズになります。

特に今後、Python の実験や、Raspberry Pi から母艦PCのローカルLLMへ接続するような検証を進める場合、この Remote-SSH 環境はかなり重要な土台になりそうです。

次回は、Raspberry Pi 側の **Python環境を整える** 作業に進みます。
