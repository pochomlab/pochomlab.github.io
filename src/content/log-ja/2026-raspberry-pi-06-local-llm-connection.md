---
title: "🍓 Raspberry Piの導入 [06] Raspberry Pi からローカルLLMへ接続する"
date: 2026-06-30
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "Raspberry Pi から、LAN内のPochomLabマシンで動いているOllamaへ接続し、PythonからローカルLLMにリクエストを送るところまで確認します。"
series: raspberry-pi-4-setup
seriesOrder: 6
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Raspberry Pi OS のインストール](/ja/log/2026-raspberry-pi-02-os-installation)
- [[03] 初期設定と動作確認](/ja/log/2026-raspberry-pi-03-initial-setup)
- [[04] 作業用PCのVS CodeからSSHでRaspberry Piを編集する](/ja/log/2026-raspberry-pi-04-vscode-ssh)
- [[05] Python環境を整える](/ja/log/2026-raspberry-pi-05-python-environment)
- [06] Raspberry Pi からローカルLLMへ接続する

### 👀目次

- [🎯Raspberry PiからローカルLLMへ接続できるか試してみる](#anchor1)
- [🦙Ollama が動いているか確認する](#anchor2)
- [📍ローカルIPアドレスを確認する](#anchor3)
- [✅Raspberry Piから疎通確認する](#anchor4)
- [➡️PythonからOllama APIに送る](#anchor5)
- [⏱️返答にかかる時間を計測してみる](#anchor6)
- [✍️今回の整理](#anchor7)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🎯Raspberry PiからローカルLLMへ接続できるか試してみる

前回は、Raspberry Pi 側で Python の開発環境を整えました。

今回は、その Python 環境から、LAN内にある PochomLabマシンで動いているローカルLLMへ接続してみます。

Raspberry Pi 本体で重いLLMを動かすのではなく、推論は PochomLabマシン側で行い、Raspberry Pi からはネットワーク越しにリクエストを送る構成です。

この形にしておくと、Raspberry Pi は軽い処理やセンサー、簡単な入出力を担当し、LLMの処理は性能の高いマシン側に任せることができます。

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🦙Ollama が動いているか確認する

まず、PochomLabマシン側で Ollama が動作しているか確認します。

PowerShell または コマンドプロンプトで、次のコマンドを実行します。

```batch
ollama list
````

インストール済みのモデル一覧が表示されればOKです。

動作確認をする場合は、使用するモデルを指定して起動します。

```batch
ollama run gemma3:12b
```

すでに別のモデルを使っている場合は、そのモデル名で確認します。

```batch
ollama run <model-name>
```

インストール済みのモデル一覧が表示されれば、PochomLabマシン側の Ollama は起動確認できています。

<img
src="/images/log/2026/0428-6-raspberry-pi-01.webp"
alt="Ollamaのモデル一覧を確認している画面"
width="800">

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📍ローカルIPアドレスを確認する

次に、Raspberry Pi から接続するために、PochomLabマシンのローカルIPアドレスを確認します。

Windowsなら PowerShell または コマンドプロンプトで、次のコマンドを実行します。

```batch
ipconfig
```

Wi-Fi または Ethernet の項目にある IPv4 アドレスを確認します。

<img
src="/images/log/2026/0428-6-raspberry-pi-02.webp"
alt="Windowsでipconfigを実行してIPv4アドレスを確認している画面"
width="800">

この場合、Raspberry Pi から見た Ollama API のURLは次のようになります。

```text
http://192.168.68.61:11434
```

Ollama の標準ポートは `11434` です。

---

<a id="anchor4" class="scroll-mt-24"></a>

## ✅Raspberry Piから疎通確認する

ここからは Raspberry Pi 側で作業します。

まず、Raspberry Pi から PochomLabマシンへネットワーク的に届くかを `ping` で確認します。

```bash
ping 192.168.68.61
```

応答が返ってくれば、少なくともネットワーク上では PochomLabマシンが見えています。

<img
src="/images/log/2026/0428-6-raspberry-pi-03.webp"
alt="ping画面"
width="800">

次に、`curl` を使って Ollama API にアクセスできるか確認します。

```bash
curl http://192.168.68.61:11434/api/tags
```

モデル一覧のような JSON が返ってくれば、Raspberry Pi から PochomLabマシン上の Ollama が見えています。

```json
{
  "models": [
    ...
  ]
}
```

ここまで確認できれば、Python からも同じURLへリクエストを送れる状態になっています。

<img
src="/images/log/2026/0428-6-raspberry-pi-04.webp"
alt="モデル一覧画面"
width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## ➡️PythonからOllama APIに送る

前回の [Python環境を整える](/ja/log/2026-raspberry-pi-05-python-environment) で作った作業フォルダに入ります。

```bash
cd ~/projects/pochomlab-pi
source .venv/bin/activate
```

まず、`ollama_test.py` を作ります。

```bash
nano ollama_test.py
```

中身は次のようにします。

```python
import requests

OLLAMA_URL = "http://192.168.68.61:11434/api/generate"

payload = {
    "model": "gemma3:12b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

response = requests.post(OLLAMA_URL, json=payload, timeout=120)
response.raise_for_status()

data = response.json()
print(data["response"])
```

保存したら実行します。

```bash
python ollama_test.py
```

日本語の返答が表示されれば成功です。

この時点で、Raspberry Pi の Python プログラムから、PochomLabマシン側のローカルLLMへリクエストを送れることが確認できました。

<img
src="/images/log/2026/0428-6-raspberry-pi-05.webp"
alt="Raspberry PiのPythonからOllama APIへリクエストを送り返答が返ってきた画面"
width="800">

---

<a id="anchor6" class="scroll-mt-24"></a>

## ⏱️返答にかかる時間を計測してみる

次に、Pythonコードに少し加筆して、返答にかかる時間を計測してみます。

```python
import time
import requests

OLLAMA_URL = "http://192.168.68.61:11434/api/generate"

payload = {
    "model": "gemma3:12b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

start = time.time()

response = requests.post(OLLAMA_URL, json=payload, timeout=120)
response.raise_for_status()

elapsed = time.time() - start
data = response.json()

print(data["response"])
print(f"\nElapsed: {elapsed:.2f} sec")
```

実行します。

```bash
python ollama_test.py
```

最初の1回目は、モデルのロードが入るため、少し時間がかかります。

今回の環境では、最初の呼び出しで約4.7秒ほどかかりました。
2回目以降はモデルが読み込まれた状態になるため、およそ0.8秒ほどで返答が返ってきました。

この差を見るだけでも、ローカルLLMを使うときは「初回のロード時間」と「ロード後の応答時間」を分けて考えた方がよさそうです。

<img
src="/images/log/2026/0428-6-raspberry-pi-06.webp"
alt="Raspberry PiのPythonからOllama APIへ送信し返答時間を計測している画面"
width="800">

---

<a id="anchor7" class="scroll-mt-24"></a>

## ✍️今回の整理

今回は、Raspberry Pi から PochomLabマシン上で動いているローカルLLMへ接続し、Pythonプログラムからリクエストを送るところまで確認しました。

今回確認した流れは、次の通りです。

* PochomLabマシン側で Ollama の動作を確認する
* PochomLabマシンのローカルIPアドレスを確認する
* Raspberry Pi から `ping` と `curl` で疎通確認する
* Python から Ollama API にリクエストを送る
* 返答にかかる時間を計測する

これで、Raspberry Pi からローカルLLMを呼び出すための最初の確認ができました。

次回は、Raspberry Pi にも Ollama をインストールし、軽量モデルを動かしてみます。
