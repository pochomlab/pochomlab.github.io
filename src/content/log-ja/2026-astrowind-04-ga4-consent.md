---
title: "🚀 AstroWind DevLog [04] Consent対応 Google Analytics4"
date: 2026-03-08
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "Consent Modeに対応したGoogle Analytics4を実装。ユーザー承諾後のみpage_viewを送信する構成を構築。"
series: astrowind
seriesOrder: 4
author: "ぴーちゃん"
draft: false
---

## ■ AstroWind シリーズ

- [🚀 AstroWind [01] 初期設定](/ja/log/2026-astrowind-01-setup)
- [🚀 AstroWind [02] アンカースクロールナビの実装](/ja/log/2026-astrowind-02-anchor-scroll)
- [🚀 AstroWind [03] /ja /en 多言語構成（ナビ・Layout・Canonical）](/ja/log/2026-astrowind-03-ja-en-structure)
- 🚀 AstroWind [04] Consent対応 Google Analytics4

---

## ■ 目的

コンセントバナー（Cookie同意）に対応した  
**Google Analytics4 の実装**を行う。

ユーザーの承諾を得た場合のみ、  
アクセス解析イベントを送信する構成とする。

---

## ■ 前提

今回の実装では、次の方針を採用した。

- 承諾を得るまで **GA4に分析情報を一切送らない**
- Google **Consent Mode を使用**
- GA4の `send_page_view` は **無効化**
- page_view は **手動送信**
- アンカーリンクスクロールを使用するため  
  **ClientRouter を OFF**

AstroのSPA遷移を使わず、  
**通常のページロードを前提とした計測**にしている。

---

## ■ Pull Request
https://github.com/pochomlab/pochomlab-astrowind-lab/pull/4

---

## ■ 実施内容

今回の実装では、次のコンポーネントを追加した。

### 1. AnalyticsWithConsent.astro

GA4タグの読み込みと  
**Consent Mode の初期設定**を行う。

初期状態では次の設定を適用する。

>analytics_storage: denied

これにより、ユーザー承諾前は  
GA4は解析データを保存しない。

また `send_page_view` を無効化し、  
page_view送信は手動制御に変更した。

---

### 2. ConsentBanner.astro

サイト下部に表示する  
**Cookie同意バナー**を実装。

機能：

- 同意 / 拒否ボタン
- localStorageによる状態保存
- 同意時のみ `gtag consent update` を実行

同意状態は次のキーで保存する。


>consent


保存値


>granted

---

### 3. ga4.js

ページロード時に  
**page_viewイベントを送信するスクリプト**。

>gtag('event', 'page_view')

ただし

- gtagが初期化済み
- 同意済み

この2条件を満たす場合のみ送信する。

---

### 4. Layout.astro の改修

次の処理を追加した。

- AnalyticsWithConsent の読み込み
- ConsentBanner の読み込み
- page_view送信用スクリプト

>```<script src="/utils/ga4.js">```

---

### 5. config.yaml の設定 AstroWindの設定に Google Analytics ID を追加。

``` vendors: googleAnalytics: id: G-XXXXXXXXXX ``` Pull Request では **ダミーIDを使用している。**

---

## ■ メモ

モバイル表示では メニューが画面全体を覆うレイアウトになるため、 コンセントバナーの文言は **日本語 / 英語の両方を表示**する形にした。 これにより 言語切替が隠れた場合でも 内容が理解できるようにしている。
