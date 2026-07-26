---
title: "🍓 Getting Started with Raspberry Pi [07] Trying Ollama and Lightweight Models on Raspberry Pi"
date: 2026-07-26
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "This article installs Ollama on a Raspberry Pi 4 8GB, runs lightweight models such as qwen2.5:0.5b, tinyllama, gemma3:1b, qwen2.5:1.5b, and gemma3:4b, and checks response speed, CPU temperature, and overall feel."
series: raspberry-pi-4-setup
seriesOrder: 7
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Installing Raspberry Pi OS](/en/log/2026-raspberry-pi-02-os-installation)
- [[03] Initial Setup and Operation Check](/en/log/2026-raspberry-pi-03-initial-setup)
- [[04] Editing Raspberry Pi Files from VS Code via Remote-SSH](/en/log/2026-raspberry-pi-04-vscode-ssh)
- [[05] Setting Up a Python Environment](/en/log/2026-raspberry-pi-05-python-environment)
- [[06] Connecting from Raspberry Pi to a Local LLM](/en/log/2026-raspberry-pi-06-local-llm-connection)
- [07] Trying Ollama and Lightweight Models on Raspberry Pi

### 👀 Table of Contents

- [🔥 Trying lightweight models on Raspberry Pi](#anchor1)
- [✅ Pre-checks](#anchor2)
- [🔃 Updating the OS](#anchor3)
- [📥 Installing Ollama](#anchor4)
- [🤖 Installing lightweight models](#anchor5)
- [⌨️ Checking operation from the CLI](#anchor6)
- [📡 Connecting to Ollama running on the Raspberry Pi itself from Python](#anchor7)
- [📊 Results](#anchor8)
- [✍️ Summary of this step](#anchor9)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🔥 Trying lightweight models on Raspberry Pi

In the previous article, I confirmed that a Python program running on the Raspberry Pi could send requests to the local LLM on the PochomLab machine.

This time, I will install Ollama on the Raspberry Pi 4 8GB and try running lightweight models directly on the Raspberry Pi itself.

I will also check the response speed, heat generation, and overall heaviness to see how much a Raspberry Pi can handle as a standalone local LLM environment.

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅ Pre-checks

First, I checked the OS, CPU, memory, storage, and temperature status on the Raspberry Pi side.

Check the OS and CPU.

```bash
$ uname -a
````

Check the memory.

```bash
$ free -h
```

Check the storage.

```bash
$ df -h
```

Check the CPU temperature.

```bash
$ vcgencmd measure_temp
```

If `vcgencmd` is not available, it can be installed with the following command.

```bash
$ sudo apt install -y libraspberrypi-bin
```

By checking the state before installing Ollama, it becomes easier to compare heat and load changes later.

<img
src="/images/log/2026/0428-7-raspberry-pi-01.webp"
alt="Results of running each command"
width="800">

---

<a id="anchor3" class="scroll-mt-24"></a>

## 🔃 Updating the OS

Before installing Ollama, I updated Raspberry Pi OS.

```bash
$ sudo apt update
$ sudo apt upgrade -y
```

Reboot if necessary.

```bash
$ sudo reboot
```

---

<a id="anchor4" class="scroll-mt-24"></a>

## 📥 Installing Ollama

For the Linux version of Ollama, the official download page provides the following installation command.

```bash
$ curl -fsSL https://ollama.com/install.sh | sh
```

After installation, I checked whether Ollama was available.

```bash
$ which ollama
$ ollama --version
```

Next, I checked the service status.

```bash
$ systemctl status ollama
```

If it is not running, start it with the following command.

```bash
$ sudo systemctl start ollama
```

I also enabled automatic startup.

```bash
$ sudo systemctl enable ollama
```

Finally, I checked whether the API responded.

```bash
$ curl http://localhost:11434/api/tags
```

Even if no model has been installed yet, Ollama itself is working if JSON is returned.

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🤖 Installing lightweight models

Since this test is on a Raspberry Pi 4 8GB, I started with lightweight models in the 0.5B to 1B range.

First, I checked with a very small model.

```bash
$ ollama pull qwen2.5:0.5b
```

```bash
$ ollama pull tinyllama
```

In the Ollama library, Qwen2.5 is available in several sizes, such as 0.5b, 1.5b, and 3b.

For a lightweight test on Raspberry Pi, starting with 0.5b seems like the safer choice.

If there seems to be enough room, I will try models around this size next.

```bash
$ ollama pull qwen2.5:1.5b
```

```bash
$ ollama pull gemma3:1b
```

Finally, I will also try a slightly larger model as a stress test.

```bash
$ ollama pull gemma3:4b
```

A 4B-class model may be quite heavy on a Raspberry Pi 4, but I wanted to check how far it could actually run.

---

<a id="anchor6" class="scroll-mt-24"></a>

## ⌨️ Checking operation from the CLI

First, I started a model from the CLI.

```bash
$ ollama run qwen2.5:0.5b
```

Here is the sample prompt.

```bash
> 日本語で短く自己紹介してください。
```

If a response comes back, the basic operation check for Ollama and the model is complete.

<img
src="/images/log/2026/0428-7-raspberry-pi-02.webp"
alt="Screenshot of checking operation from the CLI"
width="800">

---

<a id="anchor7" class="scroll-mt-24"></a>

## 📡 Connecting to Ollama running on the Raspberry Pi itself from Python

In [[06]](/en/log/2026-raspberry-pi-06-local-llm-connection), I sent requests from the Raspberry Pi to Ollama running on the PochomLab machine.

This time, I will send requests to Ollama running on the Raspberry Pi itself.

`ollama_pi_test.py`

```python
import time
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

payload = {
    "model": "qwen2.5:0.5b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

start = time.time()

response = requests.post(OLLAMA_URL, json=payload, timeout=300)
response.raise_for_status()

elapsed = time.time() - start
data = response.json()

print(data["response"])
print(f"\nElapsed: {elapsed:.2f} sec")
```

Run the script.

```bash
$ python ollama_pi_test.py
```

This script displays both the response text and the execution time.

Even with the same model, the first run took longer because the model had to be loaded. The second response time was shorter than the first one.

---

<a id="anchor8" class="scroll-mt-24"></a>

## 📊 Results

The actual results were as follows.

| Model        |  Size | First response | Second response | CPU temp | Notes              |
| ------------ | ----: | -------------: | --------------: | -------: | ------------------ |
| qwen2.5:0.5b | 397MB |      10.33 sec |        1.52 sec |    42.3℃ |                    |
| tinyllama    | 637MB |       8.14 sec |        2.68 sec |    43.3℃ | Unnatural Japanese |
| gemma3:1b    | 815MB |       7.24 sec |        2.17 sec |    43.3℃ |                    |
| qwen2.5:1.5b | 986MB |       9.54 sec |        2.32 sec |    43.8℃ |                    |
| gemma3:4b    | 3.3GB |      24.18 sec |        6.46 sec |    45.2℃ | Feels heavy        |

Within the scope of this test, models in the 0.5B to 1.5B range felt usable enough for basic operation checks on a Raspberry Pi 4 8GB.

On the other hand, once it reaches the 4B class, the waiting time before a response becomes quite long, so it feels a little difficult to use lightly.

Here are a few screenshots of the responses.

Response from tinyllama.

<img
src="/images/log/2026/0428-7-raspberry-pi-03.webp"
alt="Screenshot of the tinyllama response"
width="800">

Response from gemma3:4b.

<img
src="/images/log/2026/0428-7-raspberry-pi-04.webp"
alt="Screenshot of the gemma3:4b response"
width="800">

---

<a id="anchor9" class="scroll-mt-24"></a>

## ✍️ Summary of this step

This time, I installed Ollama on a Raspberry Pi 4 8GB and checked the operation of lightweight models by sending requests from a Python program.

Based on the execution speed, models in the 0.5B to 1.5B range seem to be realistic options.

The 4B model did run, but in terms of execution speed, it felt too heavy to handle comfortably on a Raspberry Pi 4.

Next time, based on these results, I will create a simple response program on the Raspberry Pi.
