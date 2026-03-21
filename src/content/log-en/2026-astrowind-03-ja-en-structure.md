---
title: "🚀 AstroWind [03] /ja /en Multilingual Structure (Nav, Layout, Canonical)"
date: 2026-03-01
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "Separated the AstroWind site into a multilingual structure using /ja and /en. Updated navigation, layout, canonical, and hreflang settings."
author: "P-chan"
draft: false
---

## ■ AstroWind Series

- [🚀 AstroWind [01] Initial Setup](/en/log/2026-astrowind-01-setup)
- [🚀 AstroWind [02] Anchor Scroll Navigation](/en/log/2026-astrowind-02-anchor-scroll)
- 🚀 AstroWind [03] /ja /en Multilingual Structure (Nav, Layout, Canonical)
- [🚀 AstroWind [04] Google Analytics 4 with Consent Mode](/en/log/2026-astrowind-04-ga4-consent)

---

## ■ Purpose

In an AstroWind-based site, separate Japanese and English using the `/ja/` and `/en/` directories, allowing the following elements to be managed independently for each language:

- Navigation (Header / Footer)
- Layout (loaded navigation and text)
- SEO (canonical / hreflang / html lang)

---

## ■ Background

- Pages are separated by language using `/ja/` and `/en/` directories.
- Navigation is split into `navigation-ja.ts` and `navigation-en.ts`.
- Page layouts are separated into `PageLayout_Ja.astro` and `PageLayout_En.astro`, switching which navigation file is loaded.

---

## ■ Pull Request

https://github.com/pochomlab/pochomlab-astrowind-lab/pull/3

---

## ■ Implementation

- Separated pages under `/ja` and `/en`.
- Added `navigation-ja.ts` and `navigation-en.ts`.
- Split layouts into `PageLayout_Ja.astro` and `PageLayout_En.astro`, switching the navigation source.
- Added a language switch (JA / EN) in `Header.astro`.
- Added canonical and hreflang handling to `Layout.astro`.
- Switched `<html lang>` dynamically based on the URL.
