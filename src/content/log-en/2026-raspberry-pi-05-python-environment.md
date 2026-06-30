---
title: "🍓 Getting Started with Raspberry Pi [05] Setting Up a Python Environment"
date: 2026-06-14
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "This article sets up a Python virtual environment on Raspberry Pi, installs requests, checks basic operation, and creates a requirements.txt file."
series: raspberry-pi-4-setup
seriesOrder: 5
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Installing Raspberry Pi OS](/en/log/2026-raspberry-pi-02-os-installation)
- [[03] Initial Setup and Operation Check](/en/log/2026-raspberry-pi-03-initial-setup)
- [[04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH](/en/log/2026-raspberry-pi-04-vscode-ssh)
- [05] Setting Up a Python Environment
- [[06] Connecting from Raspberry Pi to a Local LLM](/en/log/2026-raspberry-pi-06-local-llm-connection)

### 👀 Table of Contents

- [🏠 Setting up a Python development environment to communicate with a local LLM](#anchor1)
- [✅ Checking the Python version](#anchor2)
- [📂 Creating a working folder](#anchor3)
- [🌐 Creating a virtual environment](#anchor4)
- [🔃 Updating pip](#anchor5)
- [📥 Installing requests](#anchor6)
- [🐍 Creating a Python file for a basic operation check](#anchor7)
- [📡 Checking network communication](#anchor8)
- [📄 Creating requirements.txt](#anchor9)
- [✍️ Summary of this step](#anchor10)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🏠 Setting up a Python development environment to communicate with a local LLM

In the previous article, I connected to the Raspberry Pi from VS Code on my work laptop using Remote-SSH, and confirmed that I could edit and run files directly on the Raspberry Pi.

This time, I will prepare the development environment a little further so that the Raspberry Pi can connect to the local LLM running on the PochomLab machine.

First, I will create a Python virtual environment on the Raspberry Pi, install a library for HTTP requests, and run a simple operation check.

---

<a id="anchor2" class="scroll-mt-24"></a>

## ✅ Checking the Python version

Raspberry Pi OS usually comes with Python installed, so first I checked the version.

```bash
python3 --version
````

I also checked pip.

```bash
python3 -m pip --version
```

If Python or venv is not installed, you can install them with the following commands.

```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv
```

---

<a id="anchor3" class="scroll-mt-24"></a>

## 📂 Creating a working folder

For future development, I decided to create a `projects` folder and keep each project inside it.

This time, I created a working folder called `pochomlab-pi`.

```bash
mkdir -p ~/projects/pochomlab-pi
cd ~/projects/pochomlab-pi
```

When writing experimental code on the Raspberry Pi, separating the working location like this makes the project easier to manage.

---

<a id="anchor4" class="scroll-mt-24"></a>

## 🌐 Creating a virtual environment

To avoid changing the Python environment of the entire Raspberry Pi directly, I created a virtual environment using `venv`.

```bash
python3 -m venv .venv
```

Then I activated the virtual environment.

```bash
source .venv/bin/activate
```

Once the virtual environment is activated, the terminal prompt will look something like this.

```bash
(.venv) pochomlab@pichom:~/projects/pochomlab-pi $
```

If `(.venv)` is shown, it means the current terminal session is working inside the virtual environment.

<img src="/images/log/2026/0427-5-raspberry-pi-01.webp"
alt="Screenshot showing the activated virtual environment"
width="800">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🔃Updating pip

With the virtual environment activated, I updated pip.

```bash
python -m pip install --upgrade pip
```

The `python` command used here refers to the Python inside the virtual environment.

### What to do if VS Code shows a warning

VS Code may show a warning saying that the package might be installed into the global environment.

<img src="/images/log/2026/0427-5-raspberry-pi-02.webp"
alt="Screenshot showing a warning from VS Code"
width="400">

Even in that case, if `(.venv)` is displayed in the terminal like below, the virtual environment is active.

```bash
(.venv) pochomlab@pichom:~/projects/pochomlab-pi $
```

If you run `pip install` in this state, the library will be installed inside the `.venv` created for this project, not into the Raspberry Pi system-wide Python environment.

---

<a id="anchor6" class="scroll-mt-24"></a>

## 📥 Installing requests

From the next article onward, I will access the Ollama API on the PochomLab machine, so I installed `requests`, a library for sending HTTP requests.

```bash
pip install requests
```

Then I checked whether it was installed correctly.

```bash
python -c "import requests; print(requests.__version__)"
```

If the version number is displayed, the installation of `requests` is complete.

---

<a id="anchor7" class="scroll-mt-24"></a>

## 🐍Creating a Python file for a basic operation check

If you have not connected to the Raspberry Pi with VS Code Remote-SSH yet, connect first.

Inside the working folder, I created `hello.py`.

```markdown
~/projects/pochomlab-pi/
├── .venv/
└── hello.py
```

Then I wrote the following code in `hello.py` and saved it.

```python
print("Hello from Raspberry Pi!")
```

I ran it from the terminal.

```bash
python hello.py
```

If the following message is displayed, the Python development environment is working correctly.

```bash
Hello from Raspberry Pi!
```

<img src="/images/log/2026/0427-5-raspberry-pi-03.webp"
alt="Screenshot showing Hello from Raspberry Pi!"
width="800">

---

<a id="anchor8" class="scroll-mt-24"></a>

## 📡 Checking network communication

Next, I tested whether Python could send an HTTP request to the web.

```python
import requests

response = requests.get("https://example.com")
print(response.status_code)
```

`example.com` is just a sample address for checking the request.

After running the script, if `200` is displayed as below, the request was successful.

```bash
200
```

<img src="/images/log/2026/0427-5-raspberry-pi-04.webp"
alt="Screenshot showing 200"
width="800">

This confirmed that Python running on the Raspberry Pi can send HTTP requests to an external website.

---

<a id="anchor9" class="scroll-mt-24"></a>

## 📄 Creating requirements.txt

To make it easier to recreate the same environment later, I exported the list of libraries installed in the current virtual environment to `requirements.txt`.

```bash
pip freeze > requirements.txt
```

After creating it, the folder structure looks like this.

```markdown
~/projects/pochomlab-pi/
├── .venv/
├── hello.py
└── requirements.txt
```

With `requirements.txt`, the same libraries can be installed in another environment with the following command.

```bash
pip install -r requirements.txt
```

Even for a small test project, creating this file from the beginning makes it easier to keep things organized later.

<img src="/images/log/2026/0427-5-raspberry-pi-05.webp"
alt="Screenshot showing requirements.txt"
width="800">

---

<a id="anchor10" class="scroll-mt-24"></a>

## ✍️ Summary of this step

This time, I prepared a Python development environment on the Raspberry Pi as a first step toward connecting it to a local LLM.

The work included checking Python and pip, creating a working folder, creating a virtual environment, installing `requests`, running a simple Python script, and confirming HTTP request communication.

Everything went smoothly without any major issues.

Next time, I will actually connect from the Raspberry Pi to the local LLM running on the PochomLab machine.
