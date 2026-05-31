---
title: "🍓 Getting Started with Raspberry Pi [02] Installing Raspberry Pi OS"
date: 2026-05-08
tags: ["Raspberry Pi", "DevLog", "PochomLab"]
summary: "A record of creating an installation USB drive with Raspberry Pi Imager, booting from it, and writing Raspberry Pi OS to the SSD."
series: raspberry-pi-4-setup
seriesOrder: 2
author: "P-chan"
draft: false
---

### Getting Started with Raspberry Pi 4

- [[01] Hardware Setup](/en/log/2026-raspberry-pi-01-hardware-setup)
- [02] Installing Raspberry Pi OS
- [[03] Initial Setup and Basic Checks](/en/log/2026-raspberry-pi-03-initial-setup)
- [[04] Editing Raspberry Pi Files from VS Code on a Work PC via SSH](/en/log/2026-raspberry-pi-04-vscode-ssh)

### 👀Table of Contents

- [💽 Preparing the Installation USB Drive](#anchor1)
- [▶️ Booting from the USB Drive → Writing to the SSD](#anchor2)
- [✍️ Notes from This Step](#anchor3)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 💽 Preparing the Installation USB Drive

On older Raspberry Pi 4 setups, the common approach was to write the OS to a microSD card and run the system from there.
On the current Raspberry Pi 4, however, it is possible to boot from an installation USB drive and install the OS onto an SSD connected to the Raspberry Pi.

### 📟 Raspberry Pi Imager

First, download and launch **Raspberry Pi Imager** from the Software page on the official Raspberry Pi website.

During installation, a language selection screen appears. Japanese was not available, so I selected English here.

<img src="/images/log/2026/0424-2-raspberry-pi-00.webp"
  alt="Select the language to use during the installation dialog">


Next, a confirmation screen appears asking whether to install the USB driver from Raspberry Pi Ltd. I installed it and continued.

<img src="/images/log/2026/0424-2-raspberry-pi-01.webp"
  alt="USB driver installation screen"
  width="600">

Once Raspberry Pi Imager starts, select the device, OS, and storage destination in order.

First, select **Raspberry Pi 4**.

<img src="/images/log/2026/0424-2-raspberry-pi-02.webp"
  alt="Device selection screen"
  width="600">

Since the Raspberry Pi 4 used here is the 8GB model, I chose **Raspberry Pi OS (64-bit)**.

<img src="/images/log/2026/0424-2-raspberry-pi-03.webp"
  alt="OS selection screen"
  width="600">

For the storage destination, select **USB Reader USB Device**.  
In this case, writing Raspberry Pi OS (64-bit) required at least **6.1GB** of free space.

<img src="/images/log/2026/0424-2-raspberry-pi-04.webp"
  alt="Storage selection screen"
  width="600">

Next, enter the hostname.

<img src="/images/log/2026/0424-2-raspberry-pi-05.webp"
  alt="Hostname input screen"
  width="600">

Then set the country, time zone, and keyboard layout.

<img src="/images/log/2026/0424-2-raspberry-pi-06.webp"
  alt="Location selection screen"
  width="600">

After that, enter the username and password.

<img src="/images/log/2026/0424-2-raspberry-pi-07.webp"
  alt="Username input screen"
  width="600">

Wi-Fi settings can also be entered here if needed.

<img src="/images/log/2026/0424-2-raspberry-pi-08.webp"
  alt="Wi-Fi input screen"
  width="600">

You can also choose whether to enable SSH at this stage.  
This time, I left it disabled because I planned to use a monitor and keyboard. Considering the later workflow, though, enabling SSH from the start would also have been a good option.

<img src="/images/log/2026/0424-2-raspberry-pi-09.webp"
  alt="SSH selection screen"
  width="600">

**Raspberry Pi Connect** is a free official remote access service provided by the Raspberry Pi Foundation.  
I would like to try it in the future, but for this setup I skipped it for now.

<img src="/images/log/2026/0424-2-raspberry-pi-10.webp"
  alt="Raspberry Pi Connect selection screen"
  width="600">

Once the settings are complete, start writing the image to the USB drive.

<img src="/images/log/2026/0424-2-raspberry-pi-11.webp"
  alt="Write screen"
  width="600">

With this, the installation USB drive is ready.

---

<a id="anchor2" class="scroll-mt-24"></a>

## ▶️ Booting from the USB Drive → Writing to the SSD

Insert the USB drive you created, then boot the Raspberry Pi.

<img src="/images/log/2026/0424-2-raspberry-pi-12.webp"
  alt="Raspberry Pi boot screen"
  width="600">

After a short while, Raspberry Pi OS starts up.

<img src="/images/log/2026/0424-2-raspberry-pi-13.webp"
  alt="Raspberry Pi OS startup screen"
  width="600">

Next, attach the USB bridge that came with the case to the back of the unit.

<img src="/images/log/2026/0424-2-raspberry-pi-14.webp"
  alt="USB bridge screen"
  width="600">

From the menu bar, select  
**Raspberry Pi → Accessories → SD Card Copier**.

<img src="/images/log/2026/0424-2-raspberry-pi-15.webp"
  alt="Menu selection screen"
  width="600">

Confirm that the SSD is selected under Copy To Device.
Also enable New partition UUIDs. This assigns new UUIDs to the destination SSD.

<img src="/images/log/2026/0424-2-raspberry-pi-16.webp"
  alt="SD Card Copier selection screen"
  width="600">

Once the write process is complete, shut down the Raspberry Pi, remove the USB drive, and restart it.

After that, I was able to confirm that Raspberry Pi OS was booting from the SSD.

<img src="/images/log/2026/0424-2-raspberry-pi-17.webp"
  alt="Boot screen after removing the USB drive"
  width="600">

With this, the Raspberry Pi OS installation is complete.

---

<a id="anchor3" class="scroll-mt-24"></a>

## ✍️ Notes from This Step

For this step, I proceeded with the Raspberry Pi 4 setup while talking things through with generative AI.
However, I found that there is still a lot of older information around USB boot. Some explanations assume a microSD card, while others describe writing the OS by connecting the SSD to another PC first, so the process was a little confusing at first.

In practice, this Raspberry Pi 4 supported USB boot as-is, and I was able to boot from the installation USB drive and install the OS onto the SSD from there.
There was less special preparation than I had expected, and the process felt fairly close to a standard OS installation.

Next time, I will move on to the **initial Raspberry Pi setup**.
