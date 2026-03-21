---

title: "🖥️ PochomLab Machine Build Log | RTX 4070 SUPER × 64GB Local Generative AI Setup"
date: 2026-03-17
tags: ["PochomLab", "Log", "BuildLog", "LabLog", "StableDiffusion", "PCBuild"]
summary: "A build log of the local generative AI workstation used in PochomLab. This setup is centered around an RTX 4070 SUPER and 64GB of memory, designed for practical long-term operation."
author: "P-chan"
draft: false
------------

## ■ Overview

This article documents the configuration of the production machine used in PochomLab.
It was built as a local environment for generative AI workflows, primarily using Stable Diffusion.

*All parts were purchased and assembled between October and November 2025.*

---

## ■ Purpose

* To document a real-world local generative AI setup
* To record the reasoning behind component selection
* To serve as a baseline for future upgrades and comparisons

---

## ■ Assumptions

* Running Stable Diffusion (SDXL) locally
* Supporting LoRA training and ControlNet workflows
* Stable operation under long-running workloads
* Compact Mini ITX form factor

---

## ■ Implementation

### 1. System Specifications

| Part         | Product name                                         | Price        | Shop    |
| ------------ | ---------------------------------------------------- | ------------ | ------- |
| PC Case      | CORSAIR 2000D AIRFLOW BLACK                          | ¥5,980       | TSUKUMO |
| Motherboard  | ASUS ROG STRIX B650E-I GAMING WIFI                   | ¥39,980      | TSUKUMO |
| CPU          | AMD Ryzen 7 7800X3D BOX                              | ¥52,980      | PCIDE   |
| Memory       | Kingston FURY Beast 64GB (2×32GB) 5600MT/s DDR5 CL36 | ¥38,880      | Amazon  |
| GPU          | PNY GeForce RTX 4070 SUPER 12GB VERTO OC Dual-fan    | ¥89,800      | PCIDE   |
| SSD          | SanDisk Extreme 2TB                                  | ¥22,990      | Amazon  |
| Power Supply | CORSAIR SF850L CP-9020245-JP                         | ¥20,468      | Sofmap  |
| CPU Cooler   | DEEPCOOL AK400                                       | ¥2,480       | TSUKUMO |
| Case Fan     | Noctua NF-A12x25 ×3                                  | ¥12,840      | Amazon  |
| OS           | Windows 11                                           | ¥21,500      | Amazon  |
| **Total**    |                                                      | **¥307,898** |         |

*Note: Prices and shops reflect the time of purchase (Oct–Nov 2025).*

---

### 2. Photos & Load State

<table>
  <thead>
    <tr>
      <th>Completed Build</th>
      <th>Internal Layout</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-01.webp"
          alt="PochomLab machine overview"
          width="512">
      </td>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-02.webp"
          alt="Internal layout"
          width="512">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Size comparison with A4 binders</td>
      <td>Photo taken during assembly</td>
    </tr>
  </tfoot>
</table>

<table>
  <thead>
    <tr>
      <th>Idle State (Task Manager)</th>
      <th>Under Load (Stable Diffusion)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-03.webp"
          alt="Idle GPU state"
          width="512">
      </td>
      <td>
        <img
          src="/images/log/2026/0317-pochomlab-spec-04.webp"
          alt="GPU under load"
          width="512">
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>GPU temperature ~34°C</td>
      <td>During Stable Diffusion usage, rises to ~70°C</td>
    </tr>
  </tfoot>
</table>

---

### 3. GPU Selection

The most critical component.

Initially, an RTX 4080 (16GB VRAM) was considered.
However, due to price and availability constraints, it was not a viable option.

Final choice:

* RTX 4070 SUPER (12GB)

For generative AI workloads:

* SDXL → Fully usable
* ControlNet → Usable with some limitations
* LoRA training → Works with parameter tuning

This resulted in a well-balanced and practical configuration.

---

### 4. Case (Mini ITX)

The system was designed with a compact Mini ITX form factor.

Key challenges:

* Heat management
* Maintainability

Final selection prioritized:

* Cooling performance
* Vertical airflow (“chimney” structure)
* Ease of assembly and maintenance

The result is a compact yet accessible internal layout.

---

### 5. CPU / Motherboard

* Ryzen 7 7800X3D
* ASUS ROG STRIX B650E-I

Having used AMD platforms for years, the choice was straightforward.
This is the first time using a ROG motherboard.

---

### 6. Memory (64GB)

* 32GB × 2 = 64GB

Prices were already rising at the time of purchase,
so the decision balanced performance and cost.

* EXPO II (6000MHz): not used
* EXPO I (5600MHz): stable operation

For generative AI workflows:

* LoRA training
* Batch generation
* Parallel workloads

64GB provides comfortable headroom.

---

### 7. SSD

Selected based on reliability and price-performance balance.

---

### 8. Power Supply (850W)

* CORSAIR SF850L

Reasons for selection:

* 850W provides sufficient headroom
* Fully modular for cable management
* Good compatibility with Mini ITX builds

In practice:

* No coil whine (even in winter conditions)
* Quiet operation

Stable under long workloads.

---

### 9. Cooling

* DEEPCOOL AK400
* Noctua fans ×3

Designed for long-running workloads such as LoRA training:

* Low noise
* High cooling performance

---

## ■ Results

* Stable long-term operation
* Successfully built a local Stable Diffusion environment
* No major issues during assembly

A practical and reliable generative AI workstation was achieved.

---

## ■ Notes

* GPU prices increased significantly after purchase
* Memory prices also surged
* Timing of the build was favorable

This domain is highly sensitive to market timing.

---

## ■ Postscript

This was my first self-built PC in over a decade,
since the Phenom II X3 720 BE era.

Previously, I focused on budget-oriented builds,
but this time prioritized stability.

The result:

* Smooth assembly
* Stable operation

A solid foundation for ongoing work in PochomLab.

---

## ■ Addendum (Price Situation as of 2026)

This system was originally built for approximately ¥300,000.  
However, as of 2026, component prices have changed significantly:

- GPU (RTX 4070 SUPER): over ¥200,000  
- Memory (64GB): approximately ¥160,000–¥180,000  

Rebuilding an equivalent system today would likely cost around  
¥550,000–¥580,000 in total.

PC component prices are highly influenced by market conditions,  
highlighting how critical timing is when building a system.
