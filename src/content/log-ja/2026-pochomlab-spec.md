---

title: "🖥️ PochomLab制作マシン構成ログ｜4070 SUPER × 64GB ローカル生成環境"
date: 2026-03-17
tags: ["PochomLab", "Log", "BuildLog", "LabLog", "StableDiffusion", "自作PC"]
summary: "PochomLabで使用している生成AIローカル環境の構成ログ。RTX 4070 SUPERと64GBメモリを中心に、実運用を前提とした構成と選定理由を記録する。"
author: "ぴーちゃん"
draft: false
------------

## ■ 概要

PochomLabで使用している制作マシンの構成をログとして記録する。
Stable Diffusionを中心とした生成AI環境をローカルで運用するために構築した。

*2025年10月〜11月にパーツ購入・組み立てを実施*

---

## ■ 目的

* 生成AIローカル環境の実例を残す
* パーツ選定の判断基準を記録する
* 今後のアップグレードや比較の基準とする

---

## ■ 前提

* Stable Diffusion（SDXL）をローカルで運用
* LoRA学習・ControlNet使用を想定
* 長時間稼働（学習）に耐える安定性
* Mini ITX構成で省スペース化

---

## ■ 実施内容

### 1. 構成スペック

| パーツ        | 商品名                                        | 値段    | ショップ    |
| ------------ | --------------------------------------------------- | -------- | ------- |
| PCケース     | CORSAIR 2000D AIRFLOW BLACK                         | ¥5,980   | TSUKUMO |
| マザーボード  | ASUS ROG STRIX B650E-I GAMING WIFI                  | ¥39,980  | TSUKUMO |
| CPU          | AMD Ryzen 7 7800X3D BOX                             | ¥52,980  | PCIDE   |
| メモリー      | Kingston FURY Beast 64GB(2x32GB) 5600MT/s DDR5 CL36 | ¥38,880  | Amazon  |
| GPU          | PNY GeForce RTX 4070 SUPER 12GB VERTO OC デュアルファン | ¥89,800  | PCIDE   |
| SSD          | SanDisk Extreme 2TB                                 | ¥22,990  | Amazon  |
| 電源 | CORSAIR SF850L CP-9020245-JP                        | ¥20,468  | Sofmap  |
| CPU クーラー  | DEEPCOOL AK400                                      | ¥2,480   | TSUKUMO |
| ケースファン  | Noctua NF-A12x25 x3                                 | ¥12,840  | Amazon  |
| OS           | Windows11                                           | ¥21,500  | Amazon  |
| **合計**        |                                                     | **¥307,898** |         |

*※価格および購入ショップは購入当時（2025年10〜11月）のもの*

---

### 2. 写真・負荷状況

<table>
  <thead>
    <tr>
      <th>完成外観</th>
      <th>内部構成</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-01.webp"
          alt="PochomLabマシンの画像01"
          width="512">
      </td>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-02.webp"
            alt="PochomLabマシンの画像02"
            width="512">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>A4クリアブックとのサイズ比較</td>
      <td>組み立て途中に撮影した写真</td>
    </tr>
  </tfoot>
</table>

<table>
  <thead>
    <tr>
      <th>アイドル時タスクマネージャー</th>
      <th>生成時タスクマネージャー</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-03.webp"
          alt="アイドル時タスクマネージャー"
          width="512">
      </td>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-04.webp"
            alt="生成時タスクマネージャー"
            width="512">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>4070 super の温度は34度</td>
      <td>Stable Diffusion使用時。一気に70度前後まで上昇</td>
    </tr>
  </tfoot>
</table>

---

### 3. GPU選定

最重要パーツ。

当初はVRAM 16GBのRTX 4080を検討したが、
価格・入手性の問題から断念。

結果として：

* RTX 4070 SUPER（12GB）

を選択。

生成AI用途においては：

* SDXL → 実用可能
* ControlNet → 制限付きで併用可能
* LoRA学習 → 設定調整で対応

「現実的なバランス構成」となった。

---

### 4. ケース（Mini ITX）

省スペースを重視してMini ITXを採用。

ただし課題は：

* 発熱
* メンテナンス性

最終的に：

* 冷却性能
* エアフロー（煙突型構造）
* 作業性

を重視して選定。

結果として内部スペースにも余裕があり、
メンテナンスしやすい構成になった。

---

### 5. CPU / マザーボード

* Ryzen 7 7800X3D
* ASUS ROG STRIX B650E-I

長年AMDを使用しているため選定はスムーズ。

ROGシリーズは初採用。

---

### 6. メモリ（64GB）

* 32GB × 2 = 64GB

購入時点で既に価格上昇傾向にあり、
性能と価格のバランスで決定。

* EXPO II（6000MHz）は未採用
* EXPO I（5600MHz）で安定運用

Stable Diffusion用途では：

* LoRA学習
* 大量生成
* 同時作業

を考えると64GBは余裕を生む。

---

### 7. SSD

価格と安定性のバランス重視で選定。

---

### 8. 電源（850W）

* CORSAIR SF850L

選定理由：

* 850Wで余裕を確保
* プラグイン式で配線しやすい
* Mini ITXとの相性

実運用では：

* コイル鳴きなし
* 静音性良好

長時間運用でも安定している。

---

### 9. 冷却（CPUクーラー・ファン）

* DEEPCOOL AK400
* Noctuaファン ×3

LoRA学習など長時間稼働を前提に：

* 静音性
* 冷却性能

を重視。

---

## ■ 結果

* 安定動作（長時間運用可）
* Stable Diffusion環境構築成功
* トラブルなく組み上げ完了

生成AI用途として実用レベルの環境が構築できた。

---

## ■ メモ

* GPU価格は購入後に高騰
* メモリも同様に価格上昇
* 構成タイミングとしては良かった

「時期の影響」を強く受ける領域。

---

## ■ 作成後記

自作PCは Phenom II X3 720 BE 以来となり、
約十数年ぶりの構築となった。

これまで廉価パーツ中心だったが、
今回は「安定動作」を最優先に選定。

結果として：

* 詰まりなく組み立て
* 安定動作

という形に収まった。

---

## ■ 追記（2026年時点の価格状況）

本構成は約30万円で構築したが、  
現在（2026年時点）では以下のように価格が大きく変動している：

- GPU（RTX 4070 SUPER）：約20万円以上
- メモリ（64GB）：約16万〜18万円

同等構成を現在組む場合、  
総額は約55万〜58万円程度になる見込み。

パーツ価格は市場の影響を強く受けるため、  
構築タイミングが非常に重要であることがわかる。
