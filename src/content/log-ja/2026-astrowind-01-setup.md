---
title: "🚀 AstroWind DevLog [01] 初期設定"
date: 2026-02-23
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "AstroWindをベースにPochomLabサイトの初期環境を構築。基本設定と開発環境を整理。"
series: astrowind
seriesOrder: 1
author: "ぴーちゃん"
draft: false
---

## ■ AstroWind シリーズ

- 🚀 AstroWind [01] 初期設定
- [🚀 AstroWind [02] アンカースクロールナビの実装](/ja/log/2026-astrowind-02-anchor-scroll)
- [🚀 AstroWind [03] /ja /en 多言語構成（ナビ・Layout・Canonical）](/ja/log/2026-astrowind-03-ja-en-structure)
- [🚀 AstroWind [04] Consent対応 Google Analytics4](/ja/log/2026-astrowind-04-ga4-consent)

---

## ■ 目的

AstroWindをPochomLab用の実験環境として初期化し、
GitHub Pagesで公開確認まで行う。

---

## ■ 実施内容

- 空リポジトリにAstroWindテンプレートをコミット
- config.yaml をPochomLab仕様に最小変更
- deploy.yml を追加
- Pages → Source を GitHub Actions に設定
- GitHub Pages表示確認

---

## ■ Repository

https://github.com/pochomlab/pochomlab-astrowind-lab

## ■ Pull Request
https://github.com/pochomlab/pochomlab-astrowind-lab/pull/1

---

## ■ config.yaml
```yaml
site:
  name: PochomLab AstroWind Lab
  site: 'https://pochomlab.github.io'
  base: '/pochomlab-astrowind-lab'
  trailingSlash: false

  googleSiteVerificationId: null

# Default SEO metadata
metadata:
  title:
    default: PochomLab
    template: '%s — PochomLab'
  description: "PochomLabのAstroWind研究ラボ."
  robots:
    index: true
    follow: true
  openGraph:
    site_name: PochomLab AstroWind Lab
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle:
    site:
    cardType: summary_large_image

i18n:
  language: ja
  textDirection: ltr

apps:
  blog:
    isEnabled: false
    postsPerPage: 6

    post:
      isEnabled: false
      permalink: '/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: false
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: false

    category:
      isEnabled: false
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: false

    tag:
      isEnabled: false
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: false
    relatedPostsCount: 0

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

## ■ Deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```
