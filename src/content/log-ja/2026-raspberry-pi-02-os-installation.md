---
title: "🍓 Raspberry Piの導入 [02] Raspberry Pi OS のインストール"
date: 2026-05-08
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "Raspberry Pi Imager を使ってインストール用USBメモリーを作成し、そこから起動してSSDへ Raspberry Pi OS を書き込む手順をまとめました。"
series: raspberry-pi-4-setup
seriesOrder: 2
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [[01] ハードウェアのセットアップ](/ja/log/2026-raspberry-pi-01-hardware-setup)
- [02] Raspberry Pi OS のインストール
- [[03] 初期設定と動作確認](/ja/log/2026-raspberry-pi-03-initial-setup)

### 👀目次

- [💽インストール用USBメモリーの準備](#anchor1)
- [▶️USBメモリーから起動 → SSDへ書き込み](#anchor2)
- [✍️今回の整理](#anchor3)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 💽インストール用USBメモリーの準備

以前の Raspberry Pi 4 では、OS を microSDカードに書き込んで運用する構成が主流でした。
一方、現在の Raspberry Pi 4 では、インストール用の USBメモリーを使って起動し、Raspberry Pi に接続した SSD へ OS をインストールできるようになっています。

### 📟Raspberry Pi Imager

まずは Raspberry Pi 公式サイトの Software ページから **Raspberry Pi Imager** をダウンロードして起動します。

インストール時に言語選択が表示されます。日本語は用意されていなかったため、ここでは英語を選択しました。

<img src="/images/log/2026/0424-2-raspberry-pi-00.webp"
  alt="Select the language to use during the installation のダイアログ画面">


続いて、Raspberry Pi Ltd の USB ドライバをインストールするか確認画面が出るので、インストールしてそのまま進めます。

<img src="/images/log/2026/0424-2-raspberry-pi-01.webp"
  alt="USBドライバのインストール画面"
  width="600">

Raspberry Pi Imager が起動したら、使用するデバイス、OS、書き込み先を順番に選択していきます。

最初に **Raspberry Pi 4** を選択します。

<img src="/images/log/2026/0424-2-raspberry-pi-02.webp"
  alt="device 選択画面"
  width="600">

今回使う Raspberry Pi 4 は 8GB モデルなので、OS は **Raspberry Pi OS（64-bit）** を選びました。

<img src="/images/log/2026/0424-2-raspberry-pi-03.webp"
  alt="OS 選択画面"
  width="600">

書き込み先には **USB Reader USB Device** を選択します。  
今回は、Raspberry Pi OS（64-bit） の書き込みに **6.1GB以上** の空き容量が必要でした。

<img src="/images/log/2026/0424-2-raspberry-pi-04.webp"
  alt="Storage 選択画面"
  width="600">

続いて、ホスト名を入力します。

<img src="/images/log/2026/0424-2-raspberry-pi-05.webp"
  alt="hostname 入力画面"
  width="600">

次に、首都、タイムゾーン、キーボードレイアウトを設定します。

<img src="/images/log/2026/0424-2-raspberry-pi-06.webp"
  alt="location 選択画面"
  width="600">

その後、ユーザー名とパスワードを入力します。

<img src="/images/log/2026/0424-2-raspberry-pi-07.webp"
  alt="username 入力画面"
  width="600">

必要に応じて Wi-Fi の設定もここで入力できます。

<img src="/images/log/2026/0424-2-raspberry-pi-08.webp"
  alt="Wi-Fi 入力画面"
  width="600">

SSH を有効にするかどうかもここで選択できます。  
今回はモニターとキーボードを使う前提だったため無効のまま進めましたが、後の作業を考えると、最初から有効化しておいてもよさそうです。

<img src="/images/log/2026/0424-2-raspberry-pi-09.webp"
  alt="SSH 選択画面"
  width="600">

**Raspberry Pi Connect** は、Raspberry Pi 財団が提供している無料の公式リモートアクセスサービスです。  
こちらも今後試してみたいところですが、今回はひとまずスキップしました。

<img src="/images/log/2026/0424-2-raspberry-pi-10.webp"
  alt="Raspberry Pi Connect 選択画面"
  width="600">

設定が終わったら、USBメモリーへの書き込みを実行します。

<img src="/images/log/2026/0424-2-raspberry-pi-11.webp"
  alt="Write 画面"
  width="600">

以上で、インストール用USBメモリーの準備は完了です。

---

<a id="anchor2" class="scroll-mt-24"></a>

## ▶️USBメモリーから起動 → SSDへ書き込み

作成した USB メモリーを挿し、Raspberry Pi を起動します。

<img src="/images/log/2026/0424-2-raspberry-pi-12.webp"
  alt="Raspberry Pi の起動画面"
  width="600">

しばらくすると、Raspberry Pi OS が立ち上がります。

<img src="/images/log/2026/0424-2-raspberry-pi-13.webp"
  alt="Raspberry Pi OS の起動画面"
  width="600">

次に、ケース付属の USB ブリッジを背面に差し込みます。

<img src="/images/log/2026/0424-2-raspberry-pi-14.webp"
  alt="USB ブリッジ画面"
  width="600">

メニューバーから  
**Raspberry Pi → Accessories → SD Card Copier**  
を選択します。

<img src="/images/log/2026/0424-2-raspberry-pi-15.webp"
  alt="メニューの選択画面"
  width="600">

Copy To Device に SSD が選択されていることを確認します。
また、New partition UUIDs にチェックを入れておきます。コピー先の SSD に新しい UUID を割り当てるためです。

<img src="/images/log/2026/0424-2-raspberry-pi-16.webp"
  alt="SD Card Copier 選択画面"
  width="600">

書き込みが完了したら、シャットダウン後に USB メモリーを取り外して再起動します。

その後、SSD から Raspberry Pi OS が起動していることを確認する事が出来ました。

<img src="/images/log/2026/0424-2-raspberry-pi-17.webp"
  alt="USBを外して起動した画面"
  width="600">

以上で、Raspberry Pi OS のインストールは完了です。

---

<a id="anchor3" class="scroll-mt-24"></a>

## ✍️今回の整理

今回の作業では、生成AIと対話しながら Raspberry Pi 4 のセットアップを進めました。
ただ、USBメモリー起動まわりは古い情報も多く、microSDカード前提の説明や、SSD をいったん別PCへつないで書き込む手順が出てくることもあり、最初は少し混乱しました。

実際には、今回の Raspberry Pi 4 では USB ブートにそのまま対応しており、インストール用USBメモリーから起動して SSD に OS を入れる流れで進めることができました。
思っていたよりも特別な準備は少なく、一般的なOSインストールに近い感覚で作業できました。

次回は **Raspberry Pi の初期設定** を進めていきます。