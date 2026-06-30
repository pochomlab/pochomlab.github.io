---
title: "🍓 Raspberry Piの導入 [05] Python環境を整える"
date: 2026-06-14
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "Raspberry Pi上でPythonの仮想環境を作成し、requestsの導入、動作確認、requirements.txtの作成までを行います。"
series: raspberry-pi-4-setup
seriesOrder: 5
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Raspberry Pi OS のインストール](/ja/log/2026-raspberry-pi-02-os-installation)
- [[03] 初期設定と動作確認](/ja/log/2026-raspberry-pi-03-initial-setup)
- [[04] 作業用PCのVS CodeからSSHでRaspberry Piを編集する](/ja/log/2026-raspberry-pi-04-vscode-ssh)
- [05] Python環境を整える
- [[06] Raspberry Pi からローカルLLMへ接続する](/ja/log/2026-raspberry-pi-06-local-llm-connection)

### 👀目次

- [🏠ローカルLLMと疎通するためのPython開発環境を整える](#anchor1)
- [✅Python のバージョン確認](#anchor2)
- [📂作業用フォルダを作る](#anchor3)
- [🌐仮想環境を作る](#anchor4)
- [🔃pip を更新する](#anchor5)
- [📥requests を入れる](#anchor6)
- [🐍動作確認用のPythonファイルを作る](#anchor7)
- [📡ネットワークの疎通確認を行う](#anchor8)
- [📄requirements.txt を作る](#anchor9)
- [✍️今回の整理](#anchor10)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🏠ローカルLLMと疎通するためのPython開発環境を整える

前回は、作業用ノートPCの VS Code から Remote-SSH で Raspberry Pi に接続し、Raspberry Pi 上のファイルを編集・実行できるところまで確認しました。

今回はさらに開発環境を整え、PochomLab マシン上のローカルLLMと接続するための準備を進めていきます。

まずは Raspberry Pi 側で Python の仮想環境を作成し、HTTPリクエスト用のライブラリを入れ、簡単な動作確認まで行います。

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅Python のバージョン確認

Raspberry Pi OS には基本的に Python が入っているはずなので、まずはバージョンを確認します。

```bash
python3 --version
````

あわせて pip も確認しておきます。

```bash
python3 -m pip --version
```

もし Python や venv が入っていない場合は、次のコマンドでインストールできます。

```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv
```

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📂作業用フォルダを作る

今後の開発用に `projects` フォルダを作成し、その下に各プロジェクトをまとめていくことにしました。

今回は、`pochomlab-pi` という作業フォルダを作ります。

```bash
mkdir -p ~/projects/pochomlab-pi
cd ~/projects/pochomlab-pi
```

Raspberry Pi 上で実験用のコードを書く場合も、こうして作業場所を分けておくと管理しやすくなります。

---

<a id="anchor4" class="scroll-mt-24"></a>

## 🌐仮想環境を作る

Raspberry Pi 全体の Python 環境を直接変更しないように、`venv` で仮想環境を作ります。

```bash
python3 -m venv .venv
```

作成した仮想環境を有効化します。

```bash
source .venv/bin/activate
```

有効化できると、ターミナルの先頭に次のような表示が付きます。

```bash
(.venv) pochomlab@pichom:~/projects/pochomlab-pi $
```

この `(.venv)` が表示されていれば、現在は仮想環境の中で作業している状態です。

<img src="/images/log/2026/0427-5-raspberry-pi-01.webp"
  alt="有効化した状態の画像"
  width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🔃pip を更新する

仮想環境を有効化した状態で、pip を更新しておきます。

```bash
python -m pip install --upgrade pip
```

ここで使っている `python` は、仮想環境内の Python です。

### VS Code から注意が出たときの対処

VS Code から「グローバル環境にインストールしている可能性がある」といった注意が出る場合があります。

<img src="/images/log/2026/0427-5-raspberry-pi-02.webp"
  alt="VS Code から注意が出ている画像"
  width="400">

その場合でも、ターミナル上で次のように `(.venv)` が表示されていれば、仮想環境は有効化されています。

```bash
(.venv) pochomlab@pichom:~/projects/pochomlab-pi $
```

この状態で `pip install` すれば、Raspberry Pi 全体ではなく、今回作成した `.venv` の中にライブラリが入ります。

---

<a id="anchor6" class="scroll-mt-24"></a>

## 📥requests を入れる

次回以降、PochomLab マシンの Ollama API にアクセスするため、HTTPリクエスト用の `requests` をインストールします。

```bash
pip install requests
```

インストールできたか確認します。

```bash
python -c "import requests; print(requests.__version__)"
```

バージョン番号が表示されれば、`requests` のインストールは完了です。

---

<a id="anchor7" class="scroll-mt-24"></a>

## 🐍動作確認用のPythonファイルを作る

まだ VS Code の Remote-SSH で Raspberry Pi に接続していない場合は、先に接続しておきます。

作業フォルダに `hello.py` を作成します。

```markdown
~/projects/pochomlab-pi/
├── .venv/
└── hello.py
```

`hello.py` に以下を記述して保存します。

```python
print("Hello from Raspberry Pi!")
```

ターミナルから実行します。

```bash
python hello.py
```

次のように表示されれば、Python の開発環境に問題がないことが確認できます。

```bash
Hello from Raspberry Pi!
```

<img src="/images/log/2026/0427-5-raspberry-pi-03.webp"
  alt="Hello from Raspberry Pi! が表示された画面"
  width="800">

---

<a id="anchor8" class="scroll-mt-24"></a>

## 📡ネットワークの疎通確認を行う

次に、Python から Web へ HTTP リクエストできるか試してみます。

```python
import requests

response = requests.get("https://example.com")
print(response.status_code)
```

`example.com` は動作確認用の任意のアドレスです。

実して次のように `200` が表示されればOKです。

```bash
200
```

<img src="/images/log/2026/0427-5-raspberry-pi-04.webp"
  alt="200 が出ている画像"
  width="800">

これで、Raspberry Pi 上の Python から外部サイトへ HTTP リクエストできることが確認できました。

---

<a id="anchor9" class="scroll-mt-24"></a>

## 📄requirements.txt を作る

あとで同じ環境を再現しやすいように、現在の仮想環境に入っているライブラリ一覧を `requirements.txt` に書き出しておきます。

```bash
pip freeze > requirements.txt
```

作成後、フォルダ構成は次のようになります。

```markdown
~/projects/pochomlab-pi/
├── .venv/
├── hello.py
└── requirements.txt
```

`requirements.txt` があれば、別の環境でも次のようにライブラリをまとめてインストールできます。

```bash
pip install -r requirements.txt
```

小さな確認用プロジェクトでも、最初からこうしておくと後で整理しやすくなります。

<img src="/images/log/2026/0427-5-raspberry-pi-05.webp"
  alt="requirements.txt の画像"
  width="800">

---

<a id="anchor10" class="scroll-mt-24"></a>

## ✍️今回の整理

今回は、ローカルLLMと接続するための準備として、Raspberry Pi 上に Python の開発環境を整えました。

作業内容としては、Python と pip の確認、作業フォルダの作成、仮想環境の作成、`requests` のインストール、簡単な Python スクリプトの実行、HTTPリクエストの確認までを行いました。

特に困ることなく進めることができました。

次回は、実際に Raspberry Pi から PochomLab マシン上のローカルLLMへ接続していきます。
