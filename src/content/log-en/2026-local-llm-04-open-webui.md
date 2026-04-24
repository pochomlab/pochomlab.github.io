---
title: "🏠 Getting Started with Local LLMs [04] Installing Open WebUI and Using It Across a LAN"
date: 2026-04-24
tags: ["LLM", "DevLog", "PochomLab"]
summary: "I installed Open WebUI, connected it to Ollama, and confirmed that I could use my local LLM from another PC on the same LAN."
series: Local-LLM
seriesOrder: 4
author: "P-chan"
draft: false
---

### Local LLM Setup Series

- [[01] Learning the Basics](/en/log/2026-local-llm-01-introduction)
- [[02] Choosing Models](/en/log/2026-local-llm-02-models)
- [[03] Installing Ollama and Checking It Works](/en/log/2026-local-llm-03-ollama)
- [04] Installing Open WebUI and Using It Across a LAN

### 👀 Table of Contents

- [🛠️ Why Install Open WebUI](#anchor1)
- [🐍 Preparing Python 3.11](#anchor2)
- [📦 Installing Open WebUI](#anchor3)
- [🔗 Connecting It to Ollama](#anchor4)
- [🌐 Using It from Another PC on the Same LAN](#anchor5)
- [💾 Creating a Startup Batch File](#anchor6)
- [✍️ Notes This Time](#anchor7)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🛠️ Why Install Open WebUI

A local LLM can already run with Ollama alone, but it becomes much easier to use once it is available  
**through a browser on another PC**, such as a working laptop.

That is why I installed **Open WebUI** this time.

The goals were simple:

- to make the local LLM usable from a browser
- to access it from another PC on the same LAN
- to make model switching and chat testing easier

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🐍 Preparing Python 3.11

One thing that needed a little attention during setup was the Python version.

The current version, open-webui 0.8.12, supports **Python 3.11 or newer, but below 3.13**,  
so Python 3.13 was not supported.

Because of that, I removed my existing Python 3.13.1 installation,  
uninstalled it from the Windows Settings screen, and then prepared Python 3.11 using **Python Install Manager**.

### ✋ Installing Python Install Manager

I installed it from the Microsoft Store.

When it starts, it asks whether you want to add it to PATH, so I proceeded with **Yes**.

After that, I checked things in PowerShell or Command Prompt.

```batch
py list
```

```batch
py list --online
```

```batch
py install 3.11
```

<img
  src="/images/log/2026/0416-local-llm-6.webp"
  alt="Python 3.11 installation screen">

At this point, Python 3.11 was ready.

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📦 Installing Open WebUI

First, I created a working folder for the installation.

```PowerShell
mkdir D:\AI\open-webui
cd D:\AI\open-webui
```

Next, I created a virtual environment using Python 3.11.

```PowerShell
py -3.11 -m venv .venv
```

Then I activated it in PowerShell.

```PowerShell
.\.venv\Scripts\Activate.ps1
```

Once activated, I installed Open WebUI.

```PowerShell
python -m pip install --upgrade pip
pip install open-webui
```

To start it:

```PowerShell
open-webui serve
```

<img
  src="/images/log/2026/0416-local-llm-7.webp"
  alt="Open WebUI running">

Then I accessed it from a browser.

```
http://localhost:8080
```
<img
  src="/images/log/2026/0416-local-llm-8.webp"
  alt="Accessed from the browser">

---

<a id="anchor4" class="scroll-mt-24"></a>

## Connecting It to Ollama

After launching Open WebUI, I first created an admin account.

<img
  src="/images/log/2026/0416-local-llm-9.webp"
  alt="Admin account creation screen"
  width="800">

At first, I confirmed that it was not yet connected from the model selection screen.

<img
  src="/images/log/2026/0416-local-llm-10.webp"
  alt="Model selection screen before connection"
  width="800">

Then I changed the connection target from:

**Settings > Manage Ollama API Connections**

```
http://localhost:11434 → http://<host-pc-name>:11434
```

<img
  src="/images/log/2026/0416-local-llm-11.webp"
  alt="Ollama API connection settings"
  width="800">

After that change, Open WebUI was able to connect to Ollama.

I then confirmed that qwen2.5:3b could be selected from the model list.

<img
  src="/images/log/2026/0416-local-llm-12.webp"
  alt="Model available after connection"
  width="800">

I also entered a chat prompt and confirmed that it returned a response.

<img
  src="/images/log/2026/0416-local-llm-13.webp"
  alt="Chat response screen"
  width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🌐 Using It from Another PC on the Same LAN

Once everything above was working, the local LLM setup became available
**from another PC on the same LAN through a browser**.

That was exactly what I wanted to achieve:

- run Ollama on the main PC
- use Open WebUI as the browser-based interface
- access it from a working laptop or another machine

This made the environment much easier to use for experiments,
because inference runs locally while the operation can happen from another device.

---

<a id="anchor6" class="scroll-mt-24"></a>

## 💾 Creating a Startup Batch File

Just like I do for Stable Diffusion and kohya_ss,
I turned Open WebUI into a batch file so that it would be easier to launch from the VS Code terminal.

It can also be launched from PowerShell, but that sometimes involves extra permission-related setup,
so using a `.bat` file felt simpler this time.

```batch
@echo off
REM ===== Open WebUI startup batch =====

REM Move to D drive
d:

REM Move to the Open WebUI folder
cd D:\AI\open-webui

REM Create .venv if it does not exist (only needed the first time)
if not exist .venv (
    py -3.11 -m venv .venv
)

REM Activate the virtual environment
call .venv\Scripts\activate.bat

REM Start Open WebUI
call .venv\Scripts\open-webui serve

pause

```
---

<a id="anchor7"></a>

## ✍️ Notes This Time

After actually installing Open WebUI, I noticed that it has quite a lot of configuration options.
It gave me a small glimpse of how many tuning points may also exist behind cloud-based generative AI services.

It also looks like Open WebUI can be configured to work together with Stable Diffusion,
so that is something I would like to explore little by little in the future.