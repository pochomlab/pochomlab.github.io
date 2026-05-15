---
title: "🍓 Raspberry Piの導入 [03] 初期設定と動作確認"
date: 2026-05-16
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "SSH接続、パッケージ更新、xrdpによるリモートデスクトップ設定、HDMIの解像度と音声調整まで、Raspberry Pi 4 の初期設定をまとめました。"
series: raspberry-pi-4-setup
seriesOrder: 3
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Raspberry Pi OS のインストール](/ja/log/2026-raspberry-pi-02-os-installation)
- [03] 初期設定と動作確認

### 👀目次

- [🔰初期設定](#anchor1)
- [🔒SSH 接続してみる](#anchor2)
- [⬆️パッケージ情報の更新](#anchor3)
- [💻リモートデスクトップ接続の設定](#anchor4)
- [📺HDMIの設定](#anchor5)
- [✍️今回の整理](#anchor6)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🔰初期設定

前回、Raspberry Pi OS のインストールまで完了しました。  
今回は、その続きとして初期設定を進めていきます。

以後の作業をやりやすくするため、まずは **ロケール** と **SSH** を設定します。

### ロケールの設定

メニューバー → Raspberry Pi → Preference → Control Centre → Localization

<img src="/images/log/2026/0424-3-raspberry-pi-01.webp"
  alt="Localization画面"
  width="600">

### SSHの設定

メニューバー → Raspberry Pi → Preference → Control Centre → Interface

<img src="/images/log/2026/0424-3-raspberry-pi-02.webp"
  alt="Interface画面"
  width="600">

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🔒SSH 接続してみる

ロケールと SSH の設定が完了したら、再起動後に作業用PCから SSH 接続できるか確認します。

コマンドプロンプトやターミナルを開き、以下のように入力します。

```batch
ssh your-ID@hostname
```

以下のようにログインできれば成功です。

```batch
C:\Users>ssh pochomlab@pichom
pochomlab@pichom's password:
Linux pichom 6.12.75+rpt-rpi-v8 #1 SMP PREEMPT Debian 1:6.12.75-1+rpt1 (2026-03-11) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Apr 22 15:55:54 2026 from fe80::9b11:2230:a7f6:ed25%eth0
pochomlab@pichom:~ $
```

初回接続時には、「この接続先を信頼して登録してよいか」と確認されるので、問題なければ `yes` を入力します。

```batch
C:\Users\>ssh pochomlab@pichom
The authenticity of host 'pichom (192.168.68.63)' can't be established.
ED25519 key fingerprint is SHA256:oOOooOooOooOOOOOoooOOoOooOOOooOooOoOooOoOoo.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

接続できたら、いくつか基本的なコマンドも試しておくと安心です。

```bash
$ whoami
pochomlab
```

```bash
$ hostname
pichom
```

```bash
$ pwd
/home/pochomlab
```

ほかにも、以下のあたりは最初の確認によく使います。

* `uname -a` → OSやカーネルの確認
* `ip a` → IPアドレスの確認
* `df -h` → ストレージ残量の確認
* `free -h` → メモリ使用状況の確認

---

<a id="anchor3" class="scroll-mt-24"></a>

## ⬆️パッケージ情報の更新

続いて、利用可能なパッケージ情報を更新しておきます。

```bash
$ sudo apt update
```

```bash
$ sudo apt upgrade -y
```

この段階で一度更新しておくと、その後の追加インストール時にトラブルが出にくくなります。

---

<a id="anchor4" class="scroll-mt-24"></a>

## 💻リモートデスクトップ接続の設定

次に、xrdp を使ってリモートデスクトップ接続できるようにします。

まずはターミナルから xrdp をインストールします。

```bash
$ sudo apt-get install xrdp
```

インストール後、いったん再起動します。

```bash
$ sudo reboot
```

再起動後、xrdp が動作しているか確認します。

```bash
$ sudo systemctl status xrdp
```

### raspi-config の設定

続いて `raspi-config` を開きます。

```bash
$ sudo raspi-config
```

**Display Options** を選択します。

<img src="/images/log/2026/0424-3-raspberry-pi-03.webp"
  alt="Display Optionを選択している画面"
  width="600">

次に **Screen Blanking** を選択します。

<img src="/images/log/2026/0424-3-raspberry-pi-04.webp"
  alt="Screen Blankingを選択している画面"
  width="600">

Screen Blanking を有効にするかどうか聞かれるので、ここでは **はい** を選んで有効化しておきます。

今回調べた限りでは、この設定を有効にしておかないと、本体側で入力を受け付けなくなることがあるようです。  
そのため、ここでは有効にした状態で進めています。

<img src="/images/log/2026/0424-3-raspberry-pi-05.webp"
  alt="「はい」を選択している画面"
  width="600">

設定後、再起動します。

```bash
$ sudo reboot
```

### 接続テスト

まず、**Raspberry Pi のローカルGUI側はログアウト** しておきます。

その後、Windows のリモートデスクトップを起動します。

<img src="/images/log/2026/0424-3-raspberry-pi-06.webp"
  alt="リモートデスクトップの起動画面"
  width="400">

「オプションの表示」→「詳細設定」を開き、
**Webアカウントを使用してログイン** のチェックが **OFF** になっていることを確認します。

<img src="/images/log/2026/0424-3-raspberry-pi-07.webp"
  alt="詳細設定の画面"
  width="400">

問題なく接続できれば設定完了です。

<img src="/images/log/2026/0424-3-raspberry-pi-08.webp"
  alt="リモート接続の画面 ログオン"
  width="600">

<img src="/images/log/2026/0424-3-raspberry-pi-09.webp"
  alt="リモート接続の画面"
  width="600">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 📺HDMIの設定

Raspberry Pi の HDMI 接続は、自動認識のままだとまだ不具合が出るようなので、config に設定を書き足します。
今回使った Santek の 7インチモニターでも、解像度が **1024 × 768** として認識され、縦方向につぶれたような表示になっていました。

また、`speaker-test` では音が出るのに、メディアプレイヤーやブラウザでは HDMI 側から音が出ないという状態にもなりました。

スピーカーテストには以下のコマンドを使います。

```bash
$ speaker-test -c 2 -t wav
```

設定ファイルを開きます。

```bash
$ sudo nano /boot/firmware/config.txt
```

ファイルの末尾に以下を追加します。

```bash
hdmi_group=2
hdmi_mode=87
hdmi_cvt=1024 600 60 6 0 0 0
```

追加できたら、

* `Ctrl + O` で保存
* `Enter`
* `Ctrl + X` で終了

その後、再起動します。

再起動後に解像度が正しく選択でき、さらにメニューバー右上のサウンドアイコンを右クリックしたとき、グレーアウトされていた HDMI 出力が選択できるようになっていれば成功です。

<img src="/images/log/2026/0424-3-raspberry-pi-11.webp"
  alt="解像度選択画面"
  width="600">

<img src="/images/log/2026/0424-3-raspberry-pi-10.webp"
  alt="HDMIが選択できるようになった画像"
  width="600">

---

<a id="anchor6" class="scroll-mt-24"></a>

## ✍️今回の整理

今回は、Raspberry Pi 4 の初期設定として、ロケールと SSH の有効化、パッケージ情報の更新、xrdp によるリモートデスクトップ接続、そして HDMI の解像度と音声まわりの調整を行いました。

ここまで整えておくと、今後のプログラム開発や、ローカルLLMとの疎通テスト、各種動作検証を進めるための土台としてかなり扱いやすくなります。

Raspberry Pi 4 は発熱もそれなりにありますが、今回の構成では、少なくとも通常の検証用途であればファンレスでも十分運用できそうです。

次回は **作業用PCのVS CodeからSSHでRaspberry Piを編集する** を進めていきます。