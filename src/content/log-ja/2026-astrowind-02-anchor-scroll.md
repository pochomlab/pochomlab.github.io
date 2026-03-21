---
title: "🚀 AstroWind DevLog [02] アンカースクロールナビの実装"
date: 2026-02-28
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "AstroWindのヘッダーナビをアンカースクロールに変更。ClientRouterをOFFにしてページ内スクロールを実装。"
series: astrowind
seriesOrder: 2
author: "ぴーちゃん"
draft: false
---

## ■ AstroWind シリーズ

- [🚀 AstroWind [01] 初期設定](/ja/log/2026-astrowind-01-setup)
- 🚀 AstroWind [02] アンカースクロールナビの実装
- [🚀 AstroWind [03] /ja /en 多言語構成（ナビ・Layout・Canonical）](/ja/log/2026-astrowind-03-ja-en-structure)
- [🚀 AstroWind [04] Consent対応 Google Analytics4](/ja/log/2026-astrowind-04-ga4-consent)

---

## ■ 目的

AstroWind のヘッダーナビからページ内の特定位置（`#link-1` など）へ移動できるようにする。

---

## ■ 前提

AstroWind は標準状態のままだと、ヘッダーのリンクでアンカーへのスクロールを想定した作りになっていないため、ヘッダー側でリンク解決ロジックを追加する。

---

## ■ Pull Request
https://github.com/pochomlab/pochomlab-astrowind-lab/pull/2

---

## ■ 実施内容

### 1) navigation.ts：アンカーを直接書かず` @@@ `をプレースホルダとして埋め込む

`navigation.ts `にテスト用のドロップダウンを追加し、`href` に `@@@` を含めた文字列を設定した。


```ts
{
  text: 'Scroll Test',
  links: [
    { text: 'link-1', href: '/homes/saas@@@link-1' },
    { text: 'link-2', href: '/homes/saas@@@link-2' },
    { text: 'link-3', href: '/homes/saas@@@link-3' },
  ],
},
```
---

### 2) Header.astro：本番/ローカルで @@@ を # または /# に置換する

**追加した処理**

- import.meta.env.PROD から本番判定 isProd を作成
- 本番/ローカルで置換文字列 base を切り替え
  - 本番：`'/#'`
  - ローカル：`'#'`
- `href` に `@@@` が含まれる場合だけ置換して `finalHref` を作成

```TypeScript
const isProd = import.meta.env.PROD;
const base = isProd ? '/#' : '#';

const normalizePath = (href?: string) => (href ? href.split('#')[0] : href);

const resolveHref = (href?: string) => {
  if (!href) return href;
  return href.includes('@@@') ? href.replace('@@@', base) : href;
};
```
---

### 3) Header.astro：通常リンク / ドロップダウンの両方で `resolveHref()` を通すように変更

**変更前（概要）**

- `links.map(({ text, href, links }) => (...) ) `の中で
  - 通常リンクは 'href={href}'
  - ドロップダウンは 'href={href2}'
- `aw-link-active 判定は href === currentPath` / `href2 === currentPath`

**変更後（概要）**

- `links.map((item) => { ... })` に変更し、リンクごとに `finalHref` を生成
- `href` は `href={finalHref}` に統一
- `aw-link-active` は アンカーを除いたパス で比較するため `normalizePath(finalHref) === currentPath` に変更
  
通常リンク：

```ts
let finalHref = resolveHref(href);

<a
  class:list={[
    'hover:text-link dark:hover:text-white px-4 py-3 flex items-center whitespace-nowrap',
    { 'aw-link-active': normalizePath(finalHref) === currentPath },
  ]}
  href={finalHref}
>
  {text}
</a>
```

ドロップダウン側：

```ts
let finalHref = resolveHref(href2);

<a
  class:list={[
    'first:rounded-t last:rounded-b md:hover:bg-gray-100 hover:text-link dark:hover:text-white dark:hover:bg-gray-700 py-2 px-5 block whitespace-no-wrap',
    { 'aw-link-active': normalizePath(finalHref) === currentPath },
  ]}
  href={finalHref}
>
  {text2}
</a>
```
---

## ■ 仕様メモ（この実装でのリンク解決）

`navigation.ts` で

- `/homes/saas@@@link-1`

と書いた場合、Header.astro で以下に変換される：

- ローカル：`/homes/saas#link-1`
- 本番：`/homes/saas/#link-1`

（変換規則は `base = isProd ? '/#' : '#'` に依存）

---

## ■ 変更点まとめ

- navigation.ts：アンカー文字 # を直書きせず、@@@ を埋め込む方式にした
- Header.astro：
  - `@@@` を 本番/ローカルで `#` に置換する `resolveHref()` を追加
  - `active` 判定がアンカーでズレないよう `normalizePath()` を追加
  - 通常リンク/ドロップダウンリンクの両方で `resolveHref()` を通すよう統一
