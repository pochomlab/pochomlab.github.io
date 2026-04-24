---
title: "🏠 Getting Started with Local LLMs [03] Installing Ollama and Checking It Works"
date: 2026-04-19
tags: ["LLM", "DevLog", "PochomLab"]
summary: "I installed Ollama on Windows and confirmed that a local LLM could actually run by testing a lightweight model."
series: Local-LLM
seriesOrder: 3
author: "P-chan"
draft: false
---

### Local LLM Setup Series

- [[01] Learning the Basics](/en/log/2026-local-llm-01-introduction)
- [[02] Choosing Models](/en/log/2026-local-llm-02-models)
- [03] Installing Ollama and Checking It Works
- [[04] Installing Open WebUI and Using It Across the LAN](/en/log/2026-local-llm-04-open-webui)

### 👀 Table of Contents

- [🛠️ Installing Ollama](#anchor1)
- [✅ Checking It in PowerShell or Command Prompt](#anchor2)
  - [🤖 Trying a Lightweight Model](#anchor_a)
  - [🖥️ Checking It in the Ollama Window Too](#anchor_b)
- [✍️ What I Confirmed This Time](#anchor3)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🛠️ Installing Ollama

To start by running a local LLM directly on my own machine, I chose to install **Ollama**.

There are ways to install it from PowerShell, but this time I downloaded and installed the **Windows installer version** from the official website.

- Download from the official website  
<img
  src="/images/log/2026/0416-local-llm-1.webp"
  alt="Downloaded from the official website"
  width="800"
  style="border: 4px solid gray;">

- Installer launch screen  
<img
  src="/images/log/2026/0416-local-llm-2.webp"
  alt="Installer launch screen"
  width="800"
  style="border: 4px solid gray;">

- Ollama running after installation  
<img
  src="/images/log/2026/0416-local-llm-3.webp"
  alt="Ollama running after installation"
  width="800"
  style="border: 4px solid gray;">

I confirmed that Ollama installed successfully on Windows.

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅ Checking It in PowerShell or Command Prompt

After installation, the first thing to check is whether Ollama was installed correctly.

```batch
ollama --version
```

If a version number appears, the installation is complete.

<a id="anchor_a" class="scroll-mt-24"></a>

### 🤖 Trying a Lightweight Model

For the first test, I used Qwen2.5 3B, since it is lightweight and easy to try.

```batch
ollama run qwen2.5:3b
```

After launching it, I entered a short prompt like this for a quick check.

```batch
Introduce yourself in Japanese in exactly three lines.
```

Screenshot of the output in Command Prompt:

<img
  src="/images/log/2026/0416-local-llm-4.webp"
  alt="Checked in Command Prompt"
  width="800"
  style="border: 4px solid gray;">

<a id="anchor_b" class="scroll-mt-24"></a>

### 🖥️ Checking It from the Ollama Interface

After confirming it through the CLI, I also checked that the model was available from the Ollama side as well.

<img
  src="/images/log/2026/0416-local-llm-5.webp"
  alt="Checked in the Ollama window"
  width="800"
  style="border: 4px solid gray;">

At this point, I had confirmed that I could
**download a model into the local environment and get an actual response from it**.

---

<a id="anchor3" class="scroll-mt-24"></a>

## ✍️ What I Confirmed This Time

At this stage, I was able to confirm the following basics:

- Ollama installs correctly on Windows
- A lightweight model can be downloaded and launched directly
- Short Japanese interactions work without problems

That is already enough as a first step into local LLMs.

Next, I will install Open WebUI so that the setup becomes easier to use from a browser, and so that it can also be accessed from another PC on the same LAN.
