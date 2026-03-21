---
title: "🚀 AstroWind [02] Anchor Scroll Navigation"
date: 2026-02-28
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "Modified the AstroWind header navigation to use anchor scrolling. Disabled ClientRouter and implemented in-page navigation."
author: "P-chan"
draft: false
---

## ■ AstroWind Series

- [🚀 AstroWind [01] Initial Setup](/en/log/2026-astrowind-01-setup)
- 🚀 AstroWind [02] Anchor Scroll Navigation
- [🚀 AstroWind [03] /ja /en Multilingual Structure (Nav, Layout, Canonical)](/en/log/2026-astrowind-03-ja-en-structure)
- [🚀 AstroWind [04] Google Analytics 4 with Consent Mode](/en/log/2026-astrowind-04-ga4-consent)

---

## ■ Purpose

Allow navigation from the AstroWind header to specific positions within a page (such as `#link-1`).

---

## ■ Background

In the default AstroWind setup, header links are not designed to scroll to anchors within a page.  
Therefore, additional link resolution logic was implemented in the header component.

---

## ■ Pull Request
https://github.com/pochomlab/pochomlab-astrowind-lab/pull/2

---

## ■ Implementation

### 1) navigation.ts: Use `@@@` as a placeholder instead of writing anchors directly

A test dropdown was added to `navigation.ts`, and the `href` value was set with a string containing `@@@`.

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

### 2) Header.astro: Replace `@@@` with `#` or `/#` depending on environment

**Added logic**

- Create `isProd` using `import.meta.env.PROD`
- Switch the replacement string `base` depending on environment  
  - Production: `'/#'`  
  - Local: `'#'`
- If `href` contains `@@@`, replace it to generate `finalHref`

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

### 3) Header.astro: Apply `resolveHref()` to both normal links and dropdown links

**Before (overview)**

- Inside `links.map(({ text, href, links }) => (...) )`
  - Normal links used `href={href}`
  - Dropdown links used `href={href2}`
- `aw-link-active` was determined by `href === currentPath` or `href2 === currentPath`


**After (overview)**

- Changed to `links.map((item) => { ... })` to generate `finalHref` for each link
- Unified `href` to `href={finalHref}`
- Updated `aw-link-active` comparison to ignore anchors:  
  `normalizePath(finalHref) === currentPath`

Normal links:

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

Dropdown links:

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

## ■ Specification Notes (Link Resolution in This Implementation)

If `navigation.ts` contains:

- `/homes/saas@@@link-1`

Header.astro converts it to:

- Local: `/homes/saas#link-1`
- Production: `/homes/saas/#link-1`

(The conversion rule depends on `base = isProd ? '/#' : '#'`.)

---

## ■ Summary of Changes

- navigation.ts  
  - Avoid writing `#` anchors directly; use `@@@` as a placeholder

- Header.astro  
  - Added `resolveHref()` to replace `@@@` with `#` depending on environment  
  - Added `normalizePath()` so anchor fragments do not affect `active` state detection  
  - Applied `resolveHref()` consistently to both normal links and dropdown links
