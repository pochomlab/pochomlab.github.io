---
title: "🍓 Raspberry Piの導入 [01] ハードウェアのセットアップ"
date: 2026-04-29
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "Raspberry Pi 4と周辺機器をそろえ、Argon ONE M.2ケースへの組み込みとモニターの動作確認までを記録しました。"
series: raspberry-pi-4-setup
seriesOrder: 1
author: "ぴーちゃん"
draft: false
---

### Raspberry Pi 4 の導入シリーズ

- [01] ハードウェアのセットアップ

### 👀目次

- [🧰用意した機材一式](#anchor1)
- [🛠️Raspberry Pi の組み立て](#anchor2)
- [📺モニターの準備](#anchor3)
- [✅Raspberry Pi の動作確認](#anchor4)
- [✍️今回の整理](#anchor5)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🧰用意した機材一式

今回使う Raspberry Pi は、2025年7月のはじめに🐍Python 学習用として購入していたものです。  
購入当時に一度だけ通電確認を行って以来、そのまましばらく手を付けずに置いていました。

<img
  src="/images/log/2026/0423-raspberry-pi-01.webp"
  alt="備品一覧画像"
  width="800">

今回は、ローカルLLMとの接続テストやそのほかの検証を進めるにあたり、モニターをはじめとした周辺機器もいくつか追加でそろえました。

| パーツ | 商品名 | 値段 | ショップ |
| - | -------------------------------- | -------- | ------- |
| シングルボード | Raspberry Pi 4 8GB（技適取得済） | ￥14,994 | Amazon |
| ケース | Argon ONE M.2 アルミニウムケース | ￥11,622 | Amazon |
| M.2 2280 SSD | Western Digital 480GB WD Green SATA | ￥6,697 | Amazon |
| 電源 | Anker PowerPort III Nano 20W（PD充電器 20W USB-C） | ￥1,780 | Amazon |
| USB-Cケーブル | Anker PowerLine III Flow USB-C & USB-C ケーブル | ￥1,790 | Amazon |
| HDMIケーブル | Twozoh Micro HDMI to HDMI ケーブル 1M | ￥973 | Yahoo!ショッピング |
| モニター | Santek オープンフレームタッチモニター 7inch（本体+専用カバー） | ￥11,891 | Amazon |
| キーボード | REDRAGON ゲーミングキーボード 銀軸92KEY | ￥5,480 | 楽天ビック |
| ミニHDMI変換アダプタ | ミニ HDMI オス to HDMI メス 変換アダプタ 2個セット | ￥319 | 楽天 |
**合計 ￥55,546**

HDMIケーブルとミニHDMI変換アダプタは、ケースに組み込んだ状態で使うだけなら必須ではありませんが、基板の状態で直接確認したい場面では必要になります。

モニターとキーボードも、SSHで遠隔操作する前提なら必須ではありません。  
手元にちょうどよいタッチ式の小型モニターがなく、キーボードの予備も PS/2 接続の古いものしかなかったため、テンキーレスのメカニカルキーボードを購入しました。

最低限必要なのは、**Raspberry Pi 本体、電源、ケーブル、microSDカード**あたりなので、もっと安価に始めることもできます。  
microSDカードは、手元に余っているスマートフォン用やデジカメ用のもので十分です。

購入当時から徐々に Raspberry Pi 関連の価格は上がっていた印象がありましたが、この記事を書いている2026年4月時点では、確認した範囲でかなり値上がりしていました。

- Raspberry Pi 4 8GB　￥14,994 → ￥27,800
- SSD　￥6,697 → ￥23,980

ケースは SATA ボード付きのものを購入したのですが、実際にはケース本体側にも SATA ボードが含まれており、結果として1枚余る形になりました。当時は「2台目の Raspberry Pi と、M.2 ボードなしの標準ケースを追加すればよいか」と軽く考えていたのですが、この価格高騰を見ると、しばらくは様子見になりそうです。

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🛠️Raspberry Pi の組み立て

まずは Raspberry Pi 本体をケースに組み込んでいきます。

<img
  src="/images/log/2026/0423-raspberry-pi-02.webp"
  alt="付属品一覧の画像"
  width="600">


最初に、Raspberry Pi のシングルボードを Argon ONE の拡張ボードへ接続します。

<img
  src="/images/log/2026/0423-raspberry-pi-03.webp"
  alt="Argon ONEの拡張ボードと接続した画像"
  width="600">

続いて、ケース天板側に熱伝導シートを貼り付けます。

<img
  src="/images/log/2026/0423-raspberry-pi-04.webp"
  alt="天板に熱伝導シートを張った画像"
  width="600">

その後、拡張ボードと接続した Raspberry Pi を天板側へ設置します。

<img
  src="/images/log/2026/0423-raspberry-pi-05.webp"
  alt="天板に設置している画像"
  width="600">

次に、ケース底面側にあたる M.2 ボードへ SSD を組み込みます。

<img
  src="/images/log/2026/0423-raspberry-pi-06.webp"
  alt="M.2ボードとSSDの画像"
  width="600">

<img
  src="/images/log/2026/0423-raspberry-pi-07.webp"
  alt="M.2ボードにSSDを組み込んだ画像"
  width="600">


最後に天板と底板をねじ止めすれば、組み立ては完了です。

<img
  src="/images/log/2026/0423-raspberry-pi-08.webp"
  alt="完成した正面画像"
  width="600">

背面から見ると、コネクタ類はこのような配置になっています。

<img
  src="/images/log/2026/0423-raspberry-pi-09.webp"
  alt="背面から見た画像"
  width="600">

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📺モニターの準備

続いて、今回あわせて購入したモニターも確認していきます。

<img
  src="/images/log/2026/0423-raspberry-pi-10.webp"
  alt="箱に入ったモニターの画像"
  width="600">

付属品は以下の通りでした。

- USB-A to USB-C ケーブル × 2
- HDMI to ミニHDMI ケーブル
- モニタースタンド

<img
  src="/images/log/2026/0423-raspberry-pi-11.webp"
  alt="開封したモニターの備品画像"
  width="600">

裏面は基板が露出した構造で、Raspberry Pi を取り付けられるようになっています。  
今回は専用カバーも購入しているので、中央のチップが熱くなるというレビューも踏まえ、ヒートシンクを付けてからカバーをかぶせる予定です。

<img
  src="/images/log/2026/0423-raspberry-pi-12.webp"
  alt="モニターの裏面画像"
  width="600">

スタンドを取り付けて通電確認もしてみます。  
モニターの電源には、手持ちの Android 用充電器を流用しました。必要なのは **5V-2A** のようです。電源条件が合わない場合は、赤色LEDが点灯しない仕様のようでした。

試しに **Anker PowerPort III Nano（5V=3A / 9V=2.22A）** をつないでみたところ、このモニターでは通電しませんでした。

<img
  src="/images/log/2026/0423-raspberry-pi-13.webp"
  alt="モニターが通電している背面の画像"
  width="600">

その後、作業用ノートPCを付属の HDMI ケーブルで接続し、表示確認も行いました。

<img
  src="/images/log/2026/0423-raspberry-pi-14.webp"
  alt="ノートPCと接続した画面"
  width="600">

### ヒートシンクと専用カバーの取り付け

後日、ヒートシンクと専用カバーが届いたので取り付けました。

ヒートシンクは、約40×40×11ミリのアルミ製ブラックタイプを購入しました。

<img
  src="/images/log/2026/0423-raspberry-pi-15.webp"
  alt="ヒートシンクと専用カバーの画像"
  width="600">

<img
  src="/images/log/2026/0423-raspberry-pi-16.webp"
  alt="ヒートシンクを設置した裏面画像"
  width="600">

<img
  src="/images/log/2026/0423-raspberry-pi-17.webp"
  alt="カバーを被せた画像"
  width="600">

背面のコントローラーチップの温度はかなり低くなりました。

Raspberry Piで使用していない時は作業用のサブモニタとして活用出来そうです。

---

<a id="anchor4" class="scroll-mt-24"></a>

## ✅Raspberry Pi の動作確認

Raspberry Pi 本体の動作確認は、購入当時に一度メインモニターへ接続して済ませていたため、今回は省いています。

ただ、これから初めてセットアップする場合は、この段階で一度モニターと Raspberry Pi を直接接続し、起動画面が表示されることを確認しておくと安心だと思います。  
あとから OS 書き込みや初期設定に進んだとき、ハードウェア側の切り分けがしやすくなります。

---

<a id="anchor5" class="scroll-mt-24"></a>

## ✍️今回の整理

🐍Python 学習用として用意していた Raspberry Pi ですが、今回ようやく周辺機器も含めたセットアップに着手しました。

初めての Raspberry Pi だったこともあり、必須ではない機材までそろえてしまった部分もありますが、それも含めて導入時の実録として残しておこうと思います。

次回は **Raspberry Pi OS のインストール** を進めていきます。
