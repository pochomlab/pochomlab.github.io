---
title: "🚀 AstroWind DevLog [04] Google Analytics 4 with Consent Mode"
date: 2026-03-08
tags: ["AstroWind", "DevLog", "PochomLab"]
summary: "Implemented Google Analytics 4 with Consent Mode. Analytics events are sent only after user consent."
author: "P-chan"
draft: false
---

## ■ AstroWind Series

- [🚀 AstroWind [01] Initial Setup](/en/log/2026-astrowind-01-setup)
- [🚀 AstroWind [02] Anchor Scroll Navigation](/en/log/2026-astrowind-02-anchor-scroll)
- [🚀 AstroWind [03] /ja /en Multilingual Structure (Nav, Layout, Canonical)](/en/log/2026-astrowind-03-ja-en-structure)
- 🚀 AstroWind [04] Google Analytics 4 with Consent Mode

---

## ■ Purpose

Implement **Google Analytics 4** with support for a  
**cookie consent banner**.

Analytics events are sent **only after the user grants consent**.

---

## ■ Design Policy

The following implementation policy was adopted.

- **No analytics data is sent to GA4 before user consent**
- Use Google **Consent Mode**
- Disable GA4 automatic `send_page_view`
- Send `page_view` **manually**
- Because anchor-scroll navigation is used,  
  **ClientRouter is disabled**

Instead of Astro's SPA navigation,  
analytics tracking is based on **normal page loads**.

---

## ■ Pull Request
https://github.com/pochomlab/pochomlab-astrowind-lab/pull/4

---

## ■ Implementation

The following components were added.

### 1. AnalyticsWithConsent.astro

Loads the GA4 tag and configures the  
**initial Consent Mode state**.

Initial setting:

>analytics_storage: denied

This prevents GA4 from storing analytics data  
before user consent.

Automatic page view tracking (`send_page_view`)  
is also disabled, and page view events are  
controlled manually.

---

### 2. ConsentBanner.astro

Implements the **cookie consent banner** displayed  
at the bottom of the site.

Features:

- Accept / Reject buttons
- Consent state stored via `localStorage`
- Executes `gtag('consent', 'update')` only when consent is granted

The consent state is stored with the following key.


>consent


Stored value:


>granted

---

### 3. ga4.js

A script that sends a **page_view event**  
on page load.

>gtag('event', 'page_view')

The event is sent **only if both conditions are met**:

- `gtag` is initialized
- User consent has been granted


---

### 4. Layout.astro Updates

The layout was updated to include:

- AnalyticsWithConsent
- ConsentBanner
- page_view dispatch script

>```<script src="/utils/ga4.js">```

---

### 5. config.yaml

Added the Google Analytics ID  
to the AstroWind configuration.

``` vendors: googleAnalytics: id: G-XXXXXXXXXX ```

A **dummy ID** is used in the Pull Request.

---

## ■ Notes

On mobile screens, the navigation menu  
covers the entire screen layout.

For this reason, the consent banner text  
is displayed in **both Japanese and English**.

This ensures that the consent message  
remains understandable even if the  
language switcher is hidden.
