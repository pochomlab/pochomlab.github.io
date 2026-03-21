---
title: "📃 Log Registration Sample"
date: 2026-03-19
tags: ["Log", "Events", "PochomLab"]
summary: "A sample that organizes the specifications and writing rules for Log post front matter."
#series: 
#seriesOrder:
author: "P-chan"
draft: false
---

## ■ About This Log Page

- Log posts are published in both Japanese and English.
- You can write articles in Markdown format.
- When omitting an item, delete the label itself or comment it out with (#).

```yaml
---
title: "Title"
date: 2025-01-01
tags: ["Log", "DevLog", "BuildLog", "LabLog"]
summary: "Summary"
#series: "" 
#seriesOrder: 0
author: "display name"
draft: true
---

Body...

```

## ■ title (required)

- Enter the title of the Log article.

## ■ date (required)

- Enter the date of the Log article.
- Normally, this should be the publication date or the date you want to keep as a record.

## ■ tags (optional)

- Enter tags related to the content of the article as an array.
- Example: ["Log", "DevLog", "PochomLab"]

## ■ summary (optional)

- Enter a short summary to be shown in article lists or on cards.
- If omitted, it may simply be left unset.

## ■ series (optional)

- Specify this when you want to group the article as part of a series.
- It can be omitted for standalone articles.

## ■ seriesOrder (optional)

- Specify the order within the series as a number.
- If you do not use series, this can be omitted.

## ■ author (required)

- For author, please enter the display name used for publication.

## ■ draft (required)

- If set to true (draft), the card will not appear on the events page.
- If set to false, it will be published.

## ■ About Multilingual Support

- Each language version is created by sharing each article file with generative AI for translation and adjustment.
