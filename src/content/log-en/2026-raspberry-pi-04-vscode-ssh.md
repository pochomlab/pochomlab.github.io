---
title: "🍓 Getting Started with Raspberry Pi [04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH"
date: 2026-05-31
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "A record of connecting to a Raspberry Pi from VS Code on a work PC using Remote-SSH, then editing files and running Python on the Raspberry Pi."
series: raspberry-pi-4-setup
seriesOrder: 4
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Installing Raspberry Pi OS](/en/log/2026-raspberry-pi-02-os-installation)
- [[03] Initial Setup and Basic Checks](/en/log/2026-raspberry-pi-03-initial-setup)
- [04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH
- [[05] Setting Up a Python Environment](/en/log/2026-raspberry-pi-05-python-environment)
- [[06] Connecting from Raspberry Pi to a Local LLM](/en/log/2026-raspberry-pi-06-local-llm-connection)

### 👀Table of Contents

- [🌱 The first step toward turning Raspberry Pi into a small development machine](#anchor1)
- [🛠️ Installing Remote-SSH](#anchor2)
- [🔗 Connecting to Raspberry Pi from VS Code](#anchor3)
- [✅ Checking the connection](#anchor4)
- [🐍 Running a Python program](#anchor5)
- [✍️ Summary](#anchor6)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🌱The first step toward turning Raspberry Pi into a small development machine

Up to the previous article, I finished the initial setup of the Raspberry Pi 4 and checked that the basic operation was working.

However, keeping a keyboard, mouse, and monitor connected directly to the Raspberry Pi while working is a little inconvenient as a development environment. It also increases the amount of equipment on the desk and can quickly take up workspace.

So this time, I will connect to the Raspberry Pi from VS Code on my work PC via SSH, and make it possible to edit files on the Raspberry Pi directly.

With VS Code Remote-SSH, I can keep using VS Code on my work PC, while the actual file editing and terminal operations happen on the Raspberry Pi side. It looks like the usual VS Code, but the files being opened and the commands being run are all on the Raspberry Pi.

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🛠️ Installing Remote-SSH

First, install the Remote-SSH extension in VS Code on the work PC.

Open the Extensions icon on the left side of VS Code, then type `Remote-SSH` into the search box.

Select the Remote-SSH extension that appears and install it.

<img src="/images/log/2026/0424-4-raspberry-pi-01.webp"
  alt="Remote-SSH extension description screen"
  width="600">

That completes the installation.

On the Raspberry Pi side, there should be no problem as long as SSH is already enabled from the previous setup.

---

<a id="anchor3" class="scroll-mt-24"></a>

## 🔗 Connecting to Raspberry Pi from VS Code

After installing Remote-SSH, try connecting to the Raspberry Pi from VS Code.

Click the blue `><`-like icon in the lower-left corner of VS Code.

From the menu that appears, select the following item.

```Markdown
Remote-SSH: Connect to Host...
```

<img src="/images/log/2026/0424-4-raspberry-pi-02.webp"
  alt="Connect to Host... screen"
  width="600">

If the connection target has not been registered yet, select `Add New SSH Host...`.

Enter the SSH connection command as follows.

```Markdown
ssh your-ID@hostname
```

Replace `your-ID` and `hostname` with the values for your own environment.

For example, if the user name is `pochomlab` and the host name is `pichom`, the command will be as follows.

```Markdown
ssh pochomlab@pichom
```

Next, select the SSH configuration file to update.

On Windows, it is usually located somewhere like this.

```Markdown
C:\Users\your-ID\.ssh\config
```

Once registration is complete, the host name you registered will appear in the command palette.

```Markdown
hostname
```

When you select the connection target, VS Code asks for the type of remote host.

```Markdown
Select the platform of the remote host "hostname"
```

Since this connects to Raspberry Pi OS, select `Linux`.

After that, enter the Raspberry Pi password.

```Markdown
your-password
```

On the first connection, VS Code Server will be downloaded automatically to the Raspberry Pi side.

<img src="/images/log/2026/0424-4-raspberry-pi-03.webp"
  alt="VS Code Server download screen"
  width="600">

After waiting a little, the connection will complete.

Once connected, the host name of the connection target appears in the blue icon area at the lower-left corner of VS Code.

<img src="/images/log/2026/0424-4-raspberry-pi-04.webp"
  alt="Screen showing the host name"
  width="600">


Now VS Code on the work PC is connected to the Raspberry Pi.

---

<a id="anchor4" class="scroll-mt-24"></a>

## ✅Checking the connection

### Opening a folder

Once connected, try opening a folder on the Raspberry Pi side from VS Code.

From the menu, select the following.

```markdown
File → Open Folder
```

First, try opening the home directory.

<img src="/images/log/2026/0424-4-raspberry-pi-05.webp"
  alt="Open folder screen"
  width="600">

When opening a folder, a confirmation message like the following may appear.

```Markdown
Do you trust the authors of the files in this folder?
```

This time, it is the home directory on my own Raspberry Pi, so I select the following.

```Markdown
Trust Folder and Continue
```

Enter the Raspberry Pi password if necessary.

```Markdown
your-password
```

Now the Raspberry Pi home directory appears in VS Code.

<img src="/images/log/2026/0424-4-raspberry-pi-06.webp"
  alt="Home directory opened in VS Code"
  width="600">


### Running commands

Next, open the VS Code terminal and check whether commands are actually being run on the Raspberry Pi side.

Run the following commands.

```bash
pwd
```

```bash
hostname
```

```bash
python3 --version
```
<img src="/images/log/2026/0424-4-raspberry-pi-07.webp"
  alt="Command execution screen"
  width="600">

If `pwd` shows a directory on the Raspberry Pi side, and `hostname` shows the Raspberry Pi host name, then the terminal is operating on the remote machine.

Also, if `python3 --version` displays the Python version, Python on the Raspberry Pi side is being recognized correctly.

At this point, even though I am using VS Code on the work PC, the files being opened and the terminal being used both exist on the Raspberry Pi side.

This is really convenient.

---

<a id="anchor5" class="scroll-mt-24"></a>

## 🐍 Running a Python program

Finally, create a simple Python program from VS Code and run it on the Raspberry Pi side.

First, create a test folder under the home directory.

```bash
mkdir pochomlab-pi-tests
```

Open the folder you created, then create a new file named `hello_pi.py`.

```bash
/home/pochomlab/pochomlab-pi-tests/hello_pi.py
```

Keep the file contents simple for the first test.

```python
print("Hello from Raspberry Pi via VS Code Remote SSH!")
```

After saving the file, run the Python file from the VS Code terminal.

```bash
cd pochomlab-pi-tests
python3 hello_pi.py
```

If the following output appears, the test is successful.

```bash
Hello from Raspberry Pi via VS Code Remote SSH!
```

<img src="/images/log/2026/0424-4-raspberry-pi-08.webp"
  alt="Python program execution screen"
  width="600">

This confirms that I can create a Python file on the Raspberry Pi from VS Code on the work PC, then run it directly on the Raspberry Pi side.

---

<a id="anchor6" class="scroll-mt-24"></a>

## ✍️ Summary

This time, I connected to the Raspberry Pi from VS Code on my work PC using Remote-SSH, and confirmed that I could edit and run files on the Raspberry Pi side.

Once this is working, the Raspberry Pi becomes much easier to use as a small experimental PC.

Instead of connecting a keyboard and mouse to the Raspberry Pi every time, I can edit files directly from the work PC I normally use, which makes the development flow much smoother.

Especially for future experiments such as Python testing or connecting from the Raspberry Pi to the local LLM running on the main PC, this Remote-SSH environment will likely become an important foundation.

Next time, I will move on to **setting up the Python environment on the Raspberry Pi**.
