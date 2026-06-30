---
title: "🍓 Getting Started with Raspberry Pi [03] Initial Setup and Basic Checks"
date: 2026-05-16
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "A record of the initial setup for Raspberry Pi 4, including SSH connection, package updates, remote desktop setup with xrdp, and HDMI resolution and audio adjustments."
series: raspberry-pi-4-setup
seriesOrder: 3
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [[02] Installing Raspberry Pi OS](/en/log/2026-raspberry-pi-02-os-installation)
- [03] Initial Setup and Basic Checks
- [[04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH](/en/log/2026-raspberry-pi-04-vscode-ssh)
- [[05] Setting Up a Python Environment](/en/log/2026-raspberry-pi-05-python-environment)
- [[06] Connecting from Raspberry Pi to a Local LLM](/en/log/2026-raspberry-pi-06-local-llm-connection)

### 👀Table of Contents

- [🔰 Initial Setup](#anchor1)
- [🔒 Trying an SSH Connection](#anchor2)
- [⬆️ Updating Package Information](#anchor3)
- [💻 Setting Up Remote Desktop Connection](#anchor4)
- [📺 HDMI Settings](#anchor5)
- [✍️ Summary](#anchor6)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🔰 Initial Setup

In the previous article, I finished installing Raspberry Pi OS.  
This time, I will continue from there and go through the initial setup.

To make the following steps easier, I will first configure the **locale** and **SSH** settings.

### Locale Settings

Menu bar → Raspberry Pi → Preference → Control Centre → Localization

<img src="/images/log/2026/0424-3-raspberry-pi-01.webp"
  alt="Localization screen"
  width="600">

### SSH Settings

Menu bar → Raspberry Pi → Preference → Control Centre → Interface

<img src="/images/log/2026/0424-3-raspberry-pi-02.webp"
  alt="Interface screen"
  width="600">

---

<a id="anchor2" class="scroll-mt-24"></a>

## 🔒 Trying an SSH Connection

After configuring the locale and SSH settings, restart the Raspberry Pi and check whether you can connect to it via SSH from your work PC.

Open Command Prompt or a terminal, and enter the following command.

```batch
ssh your-ID@hostname
```

If you can log in as shown below, the connection is working.

```batch
C:\Users>ssh pochomlab@pichom
pochomlab@pichom's password:
Linux pichom 6.12.75+rpt-rpi-v8 #1 SMP PREEMPT Debian 1:6.12.75-1+rpt1 (2026-03-11) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Wed Apr 22 15:55:54 2026 from fe80::9b11:2230:a7f6:ed25%eth0
pochomlab@pichom:~ $
```

On the first connection, you will be asked whether you want to trust and register this destination. If there is no problem, enter `yes`.

```batch
C:\Users\>ssh pochomlab@pichom
The authenticity of host 'pichom (192.168.68.63)' can't be established.
ED25519 key fingerprint is SHA256:oOOooOooOooOOOOOoooOOoOooOOOooOooOoOooOoOoo.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Once connected, it is also useful to try a few basic commands.

```bash
$ whoami
pochomlab
```

```bash
$ hostname
pichom
```

```bash
$ pwd
/home/pochomlab
```

The following commands are also useful for the first round of checks.

* `uname -a` → Check the OS and kernel
* `ip a` → Check the IP address
* `df -h` → Check available storage space
* `free -h` → Check memory usage

---

<a id="anchor3" class="scroll-mt-24"></a>

## ⬆️ Updating Package Information

Next, update the available package information.

```bash
$ sudo apt update
```

```bash
$ sudo apt upgrade -y
```

Updating at this stage helps reduce trouble when installing additional packages later.

---

<a id="anchor4" class="scroll-mt-24"></a>

## 💻Setting Up Remote Desktop Connection

Next, I will set up remote desktop access using xrdp.

First, install xrdp from the terminal.

```bash
$ sudo apt-get install xrdp
```

After the installation, reboot once.

```bash
$ sudo reboot
```

After rebooting, check whether xrdp is running.

```bash
$ sudo systemctl status xrdp
```

### raspi-config Settings

Next, open `raspi-config`.

```bash
$ sudo raspi-config
```

Select **Display Options**.

<img src="/images/log/2026/0424-3-raspberry-pi-03.webp"
  alt="Selecting Display Options"
  width="600">

Then select **Screen Blanking**.

<img src="/images/log/2026/0424-3-raspberry-pi-04.webp"
  alt="Selecting Screen Blanking"
  width="600">

You will be asked whether to enable Screen Blanking. Here, select **Yes** to enable it.

From what I found during this setup, if this setting is not enabled, the Raspberry Pi may stop accepting input on the local side.  
For that reason, I continued with this setting enabled.

<img src="/images/log/2026/0424-3-raspberry-pi-05.webp"
  alt="Selecting Yes"
  width="600">

After changing the setting, reboot again.

```bash
$ sudo reboot
```

### Connection Test

First, **log out from the local GUI session on the Raspberry Pi**.

Then launch Remote Desktop on Windows.

<img src="/images/log/2026/0424-3-raspberry-pi-06.webp"
  alt="Remote Desktop startup screen"
  width="400">

Open “Show Options” → “Advanced”, and make sure that **Use a web account to sign in to the remote computer** is **turned off**.

<img src="/images/log/2026/0424-3-raspberry-pi-07.webp"
  alt="Advanced settings screen"
  width="400">

If you can connect without any problems, the setup is complete.

<img src="/images/log/2026/0424-3-raspberry-pi-08.webp"
  alt="Remote connection logon screen"
  width="600">

<img src="/images/log/2026/0424-3-raspberry-pi-09.webp"
  alt="Remote desktop connection screen"
  width="600">

---

<a id="anchor5" class="scroll-mt-24"></a>

## 📺 HDMI Settings

The HDMI connection on the Raspberry Pi still seems to have some issues when left to automatic detection, so I added settings to the config file.  
With the Santek 7-inch monitor used this time, the resolution was recognized as **1024 × 768**, which made the display look vertically squashed.

There was also a situation where audio worked with `speaker-test`, but media players and browsers did not output audio through HDMI.

Use the following command for the speaker test.

```bash
$ speaker-test -c 2 -t wav
```

Open the configuration file.

```bash
$ sudo nano /boot/firmware/config.txt
```

Add the following lines to the end of the file.

```bash
hdmi_group=2
hdmi_mode=87
hdmi_cvt=1024 600 60 6 0 0 0
```

After adding them:

* Press `Ctrl + O` to save
* Press `Enter`
* Press `Ctrl + X` to exit

Then reboot.

After rebooting, if the correct resolution can be selected, and if the previously grayed-out HDMI output becomes selectable when right-clicking the sound icon in the upper-right menu bar, the setup is successful.

<img src="/images/log/2026/0424-3-raspberry-pi-11.webp"
  alt="Resolution selection screen"
  width="600">

<img src="/images/log/2026/0424-3-raspberry-pi-10.webp"
  alt="HDMI output became selectable"
  width="600">

---

<a id="anchor6" class="scroll-mt-24"></a>

## ✍️ Summary

This time, as the initial setup for Raspberry Pi 4, I enabled locale and SSH settings, updated package information, set up remote desktop access with xrdp, and adjusted HDMI resolution and audio settings.

Once this much is prepared, the Raspberry Pi becomes much easier to use as a foundation for future program development, communication tests with a local LLM, and various hardware and software checks.

The Raspberry Pi 4 does produce a fair amount of heat, but with this setup, it seems usable without a fan, at least for ordinary testing and verification work.

Next time, I will move on to **editing Raspberry Pi from VS Code on the work PC via SSH**.
