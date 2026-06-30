---
title: "🍓 Getting Started with Raspberry Pi [06] Connecting from Raspberry Pi to a Local LLM"
date: 2026-06-30
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "This article connects from Raspberry Pi to Ollama running on the PochomLab machine inside the LAN, and confirms that Python can send requests to the local LLM."
series: raspberry-pi-4-setup
seriesOrder: 6
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Installing Raspberry Pi OS](/en/log/2026-raspberry-pi-02-os-installation)
- [[03] Initial Setup and Operation Check](/en/log/2026-raspberry-pi-03-initial-setup)
- [[04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH](/en/log/2026-raspberry-pi-04-vscode-ssh)
- [[05] Setting Up a Python Environment](/en/log/2026-raspberry-pi-05-python-environment)
- [06] Connecting from Raspberry Pi to a Local LLM

### 👀 Table of Contents

- [🎯 Trying to connect from Raspberry Pi to a local LLM](#anchor1)
- [🦙 Checking whether Ollama is running](#anchor2)
- [📍 Checking the local IP address](#anchor3)
- [✅ Checking connectivity from Raspberry Pi](#anchor4)
- [➡️ Sending a request to the Ollama API from Python](#anchor5)
- [⏱️ Measuring the response time](#anchor6)
- [✍️ Summary of this step](#anchor7)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🎯 Trying to connect from Raspberry Pi to a local LLM

In the previous article, I prepared the Python development environment on the Raspberry Pi.

This time, I will use that Python environment to connect to a local LLM running on the PochomLab machine inside the LAN.

Instead of running a heavy LLM directly on the Raspberry Pi, the inference is handled by the PochomLab machine, while the Raspberry Pi sends requests over the network.

With this setup, the Raspberry Pi can handle lightweight processing, sensors, and simple input/output, while the heavier LLM processing is left to the more powerful machine.

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🦙 Checking whether Ollama is running

First, I checked whether Ollama was running on the PochomLab machine.

In PowerShell or Command Prompt, run the following command.

```batch
ollama list
````

If the list of installed models is displayed, it is OK.

To check the actual operation, start the model you want to use.

```batch
ollama run gemma3:12b
```

If you are using a different model, check it with that model name.

```batch
ollama run <model-name>
```

If the installed model can be run, the Ollama setup on the PochomLab machine is ready.

<img
src="/images/log/2026/0428-6-raspberry-pi-01.webp"
alt="Screen showing the Ollama model list"
width="800">

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📍 Checking the local IP address

Next, I checked the local IP address of the PochomLab machine so that the Raspberry Pi could connect to it.

On Windows, run the following command in PowerShell or Command Prompt.

```batch
ipconfig
```

Check the IPv4 address shown under the Wi-Fi or Ethernet section.

<img
src="/images/log/2026/0428-6-raspberry-pi-02.webp"
alt="Screen showing ipconfig on Windows and the IPv4 address"
width="800">

In this case, the Ollama API URL as seen from the Raspberry Pi is as follows.

```text
http://192.168.68.61:11434
```

The default port for Ollama is `11434`.

---

<a id="anchor4" class="scroll-mt-24"></a>

## ✅ Checking connectivity from Raspberry Pi

From here, I worked on the Raspberry Pi side.

First, I used `ping` to check whether the Raspberry Pi could reach the PochomLab machine over the network.

```bash
ping 192.168.68.61
```

If responses come back, it means the PochomLab machine is visible on the network, at least at the basic network level.

<img
src="/images/log/2026/0428-6-raspberry-pi-03.webp"
alt="Ping screen"
width="800">

Next, I used `curl` to check whether the Ollama API was accessible.

```bash
curl http://192.168.68.61:11434/api/tags
```

If JSON similar to a model list is returned, the Raspberry Pi can see Ollama running on the PochomLab machine.

```json
{
  "models": [
    ...
  ]
}
```

Once this works, Python should also be able to send requests to the same URL.

<img
src="/images/log/2026/0428-6-raspberry-pi-04.webp"
alt="Screen showing the model list"
width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## ➡️ Sending a request to the Ollama API from Python

I moved into the working folder created in the previous article, [Setting Up a Python Environment](/en/log/2026-raspberry-pi-05-python-environment).

```bash
cd ~/projects/pochomlab-pi
source .venv/bin/activate
```

First, I created `ollama_test.py`.

```bash
nano ollama_test.py
```

The contents are as follows.

```python
import requests

OLLAMA_URL = "http://192.168.68.61:11434/api/generate"

payload = {
    "model": "gemma3:12b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

response = requests.post(OLLAMA_URL, json=payload, timeout=120)
response.raise_for_status()

data = response.json()
print(data["response"])
```

After saving the file, I ran it.

```bash
python ollama_test.py
```

If a Japanese response is displayed, the test is successful.

At this point, I confirmed that a Python program running on the Raspberry Pi can send a request to the local LLM on the PochomLab machine.

<img
src="/images/log/2026/0428-6-raspberry-pi-05.webp"
alt="Screen showing a response returned from the Ollama API via Python on Raspberry Pi"
width="800">

---

<a id="anchor6" class="scroll-mt-24"></a>

## ⏱️ Measuring the response time

Next, I added a little more code to measure how long the response takes.

```python
import time
import requests

OLLAMA_URL = "http://192.168.68.61:11434/api/generate"

payload = {
    "model": "gemma3:12b",
    "prompt": "日本語で短く挨拶してください。",
    "stream": False,
}

start = time.time()

response = requests.post(OLLAMA_URL, json=payload, timeout=120)
response.raise_for_status()

elapsed = time.time() - start
data = response.json()

print(data["response"])
print(f"\nElapsed: {elapsed:.2f} sec")
```

I ran the script again.

```bash
python ollama_test.py
```

The first run takes a little longer because the model needs to be loaded.

In this environment, the first request took about 4.7 seconds.
After that, since the model was already loaded, responses came back in about 0.8 seconds.

Just seeing this difference makes it clear that, when using a local LLM, it is better to think separately about the initial model loading time and the response time after the model has been loaded.

<img
src="/images/log/2026/0428-6-raspberry-pi-06.webp"
alt="Screen showing response time measurement for a request from Raspberry Pi to the Ollama API"
width="800">

---

<a id="anchor7" class="scroll-mt-24"></a>

## ✍️ Summary of this step

This time, I connected from the Raspberry Pi to the local LLM running on the PochomLab machine, and confirmed that a Python program could send requests to it.

The flow checked in this article was as follows.

* Check whether Ollama is running on the PochomLab machine
* Check the local IP address of the PochomLab machine
* Check connectivity from the Raspberry Pi using `ping` and `curl`
* Send a request to the Ollama API from Python
* Measure how long the response takes

With this, I completed the first check needed to call a local LLM from the Raspberry Pi.

Next time, I will install Ollama on the Raspberry Pi itself and try running a lightweight model.
