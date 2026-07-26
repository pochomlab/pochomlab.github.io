---
title: "🍓 Raspberry Piの導入 [07] Raspberry Pi で Ollama と軽量モデルを試す"
date: 2026-07-26
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "Raspberry Pi 4 8GB に Ollama をインストールし、qwen2.5:0.5b、tinyllama、gemma3:1b、qwen2.5:1.5b、gemma3:4b などの軽量モデルを実際に動かして、応答速度・CPU温度・体感のを確認しました。"
series: raspberry-pi-4-setup
seriesOrder: 7
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Raspberry Pi OS のインストール](/ja/log/2026-raspberry-pi-02-os-installation)
- [[03] 初期設定と動作確認](/ja/log/2026-raspberry-pi-03-initial-setup)
- [[04] 作業用PCのVS CodeからSSHでRaspberry Piを編集する](/ja/log/2026-raspberry-pi-04-vscode-ssh)
- [[05] Python環境を整える](/ja/log/2026-raspberry-pi-05-python-environment)
- [[06] Raspberry Pi からローカルLLMへ接続する](/ja/log/2026-raspberry-pi-06-local-llm-connection)
- [07] Raspberry Pi で Ollama と軽量モデルを試す

### 👀目次

- [🔥Raspberry Piで軽量モデルを動かしてみる](#anchor1)
- [✅事前確認](#anchor2)
- [🔃OSを更新する](#anchor3)
- [📥Ollamaをインストールする](#anchor4)
- [🤖軽量モデルを入れる](#anchor5)
- [⌨️CLIで動作確認](#anchor6)
- [📡PythonからRaspberry Pi自身のOllamaへ接続する](#anchor7)
- [📊結果一覧](#anchor8)
- [✍️今回の整理](#anchor9)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🔥Raspberry Piで軽量モデルを動かしてみる

前回は、Raspberry Pi から PochomLabマシンのローカルLLMへ、Pythonプログラムからリクエストを送るところまで確認しました。

今回は、Raspberry Pi 4 8GB に Ollama を入れて、Raspberry Pi 自身で軽量モデルを動かしてみます。

あわせて、応答速度・発熱・体感の重さも確認し、Raspberry Pi 単体でどのくらいローカルLLMを扱えるのかを見ていきます。

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅事前確認

まず、Raspberry Pi 側でOSやCPU、メモリ、ストレージの状態を確認しておきます。

OSとCPUの確認です。

```bash
$ uname -a
````

メモリの確認です。

```bash
$ free -h
```

ストレージの確認です。

```bash
$ df -h
```

CPU温度の確認です。

```bash
$ vcgencmd measure_temp
```

`vcgencmd` が使えない場合は、次のコマンドでインストールできます。

```bash
$ sudo apt install -y libraspberrypi-bin
```

ここでは、Ollama を入れる前の状態を確認しておくことで、あとから発熱や負荷の変化を見やすくしておきます。

<img
src="/images/log/2026/0428-7-raspberry-pi-01.webp"
alt="各コマンドを実行した結果"
width="800">

---

<a id="anchor3" class="scroll-mt-24"></a>

## 🔃OSを更新する

Ollama をインストールする前に、Raspberry Pi OS を更新しておきます。

```bash
$ sudo apt update
$ sudo apt upgrade -y
```

必要であれば再起動します。

```bash
$ sudo reboot
```

---

<a id="anchor4" class="scroll-mt-24"></a>

## 📥Ollamaをインストールする

Linux版の Ollama は、公式ダウンロードページで次のインストールコマンドが案内されています。

```bash
$ curl -fsSL https://ollama.com/install.sh | sh
```

インストール後、Ollama が使えるようになっているか確認します。

```bash
$ which ollama
$ ollama --version
```

続いて、サービスの状態を確認します。

```bash
$ systemctl status ollama
```

動いていない場合は、次のコマンドで起動します。

```bash
$ sudo systemctl start ollama
```

自動起動も有効にしておきます。

```bash
$ sudo systemctl enable ollama
```

最後に、API が応答するか確認します。

```bash
$ curl http://localhost:11434/api/tags
```

まだモデルを入れていない場合でも、JSONが返ってくれば Ollama 自体は動作しています。

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🤖軽量モデルを入れる

Raspberry Pi 4 8GB で試すため、最初は 0.5B〜1B台 の軽量モデルから始めます。

まずは、かなり小さいモデルから確認します。

```bash
$ ollama pull qwen2.5:0.5b
```

```bash
$ ollama pull tinyllama
```

Ollama のライブラリでは、Qwen2.5 は 0.5b、1.5b、3b など複数のサイズが用意されています。

Raspberry Pi での軽量検証なら、まずは 0.5b から始めるのが安全そうです。

余裕がありそうなら、次にこのあたりも試してみます。

```bash
$ ollama pull qwen2.5:1.5b
```

```bash
$ ollama pull gemma3:1b
```

最後に、ストレステストとして少し大きめのモデルも試してみます。

```bash
$ ollama pull gemma3:4b
```

4Bクラスになると、Raspberry Pi 4 ではかなり重くなる可能性がありますが、実際にどのくらい動くのか確認してみます。

---

<a id="anchor6" class="scroll-mt-24"></a>

## ⌨️CLIで動作確認

まずは CLI からモデルを起動してみます。

```bash
$ ollama run qwen2.5:0.5b
```

プロンプト例です。

```bash
> 日本語で短く自己紹介してください。
```

これで応答が返ってくれば、Ollama とモデルの基本的な動作確認は完了です。

<img
src="/images/log/2026/0428-7-raspberry-pi-02.webp"
alt="CLIで動作を確認した画像"
width="800">

---

<a id="anchor7" class="scroll-mt-24"></a>

## 📡PythonからRaspberry Pi自身のOllamaへ接続する

[[06]](/ja/log/2026-raspberry-pi-06-local-llm-connection) では、Raspberry Pi から PochomLabマシンの Ollama へリクエストを送りました。

今回は、Raspberry Pi 自身で動いている Ollama にリクエストを送ります。

`ollama_pi_test.py`

```python
import time
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

payload = {
    "model": "qwen2.5:0.5b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

start = time.time()

response = requests.post(OLLAMA_URL, json=payload, timeout=300)
response.raise_for_status()

elapsed = time.time() - start
data = response.json()

print(data["response"])
print(f"\nElapsed: {elapsed:.2f} sec")
```

実行します。

```bash
$ python ollama_pi_test.py
```

このスクリプトでは、応答内容と実行時間を表示しています。

同じモデルでも、初回はモデルの読み込みに時間がかかるため、2回目の応答時間は初回より短くなりました。

---

<a id="anchor8" class="scroll-mt-24"></a>

## 📊結果一覧

実際に試した結果は、以下のようになりました。

| モデル          |    容量 |    初回応答時間 |  2回目応答時間 | CPU温度 | メモ      |
| ------------ | ----: | --------: | -------: | ----: | ------- |
| qwen2.5:0.5b | 397MB | 10.33 sec | 1.52 sec | 42.3℃ |         |
| tinyllama    | 637MB |  8.14 sec | 2.68 sec | 43.3℃ | 日本語が不自然 |
| gemma3:1b    | 815MB |  7.24 sec | 2.17 sec | 43.3℃ |         |
| qwen2.5:1.5b | 986MB |  9.54 sec | 2.32 sec | 43.8℃ |         |
| gemma3:4b    | 3.3GB | 24.18 sec | 6.46 sec | 45.2℃ | 動作が重い   |

今回の範囲では、0.5B〜1.5Bクラスのモデルは、Raspberry Pi 4 8GB でも動作確認用としては十分試せる印象でした。

一方で、4Bクラスになると応答までの待ち時間がかなり長くなり、軽快に使うには少し厳しい印象です。

応答結果のスクリーンショットもいくつか載せておきます。

tinyllama の応答結果です。
<img
src="/images/log/2026/0428-7-raspberry-pi-03.webp"
alt="tinyllamaの応答結果画像"
width="800">

gemma3:4b の応答結果です。
<img
src="/images/log/2026/0428-7-raspberry-pi-04.webp"
alt="gemma3:4b の応答結果画像"
width="800">

---

<a id="anchor9" class="scroll-mt-24"></a>

## ✍️今回の整理

今回は、Raspberry Pi 4 8GB に Ollama をインストールし、Pythonプログラムからリクエストを送って、軽量モデルの動作を確認しました。

実行速度からすると、0.5B〜1.5B が現実的な選択肢になりそうです。

4Bモデルも動作はしましたが、実行速度の面では Raspberry Pi 4 で扱うには厳しい結果となりました。

次回は、今回の結果を踏まえて、Raspberry Pi 上で簡単な応答プログラムを作っていきます。
