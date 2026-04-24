---
title: "🏠 Getting Started with Local LLMs [02] Choosing Models"
date: 2026-04-16
tags: ["LLM", "DevLog", "PochomLab"]
summary: "For my local LLM setup, I asked several generative AIs to suggest model candidates for two purposes: Raspberry Pi connection experiments and ZINE writing support. Then I narrowed down which models to try first."
series: Local-LLM
seriesOrder: 2
author: "P-chan"
draft: false
---

### Local LLM Setup Series

- [[01] Learning the Basics](/en/log/2026-local-llm-01-introduction)
- [02] Choosing Models
- [[03] Installing Ollama and Checking It Works](/en/log/2026-local-llm-03-ollama)
- [[04] Installing Open WebUI and Using It Across the LAN](/en/log/2026-local-llm-04-open-webui)

### 👀 Table of Contents

- [🍓 Models for Raspberry Pi Connection Experiments](#anchor1)
- [📚 Models for ZINE Writing and Structure Support](#anchor2)
- [🤔 Comparing the Tendencies of Each AI’s Suggestions](#anchor3)
- [🎯 Narrowing Down the First Models to Try](#anchor4)
- [✍️ Summary This Time](#anchor5)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🍓 Models for Raspberry Pi Connection Experiments

As a first step in trying local LLMs, I asked several generative AIs to suggest models suited for  
“connecting with a Raspberry Pi and checking whether it can respond.”

My PC setup is an RTX 4070 SUPER 12GB / 64GB RAM / Ryzen 7 7800X3D.  
With this configuration, it seems most realistic to begin with models in roughly the 4B to 9B range.

### Models Recommended by ChatGPT

> With an RTX 4070 SUPER 12GB / 64GB RAM / 7800X3D,  
> this is already a solid machine to use as a local LLM host for experimentation.  
> That said, the realistic target range is mainly 4B to 9B. If you start by dreaming too big and jump straight to large models, your research will be harder to move forward.

| No. | Model Name | Notes |
| - | - | - |
| 1 | Qwen3.5 4B | Good for checking the basic setup first. Fast and unlikely to fail. |
| 2 | Qwen3.5 9B | Main candidate. Good for personality tuning, long conversations, and design discussion. |
| 3 | Gemma 4 E4B | Useful for comparing a different model family and seeing differences in tone and personality. |
| 4 | Qwen3.5 27B | A heavier comparison test, mainly to see where the boundary is for practical daily use. |

### Models Recommended by Copilot

> RTX 4070 SUPER (12GB) + 7800X3D + 64GB RAM is a golden balance that fully covers lightweight to mid-sized local LLMs.

| No. | Model Name | Notes |
| - | - | - |
| 1 | Qwen2.5 7B | Stable personality and strong Japanese performance. |
| 2 | Qwen2.5 3B | Good for high-speed experiments, especially Raspberry Pi connection tests. |
| 3 | Phi-3.5 Mini / Medium | Adds more depth to the worldbuilding side. |
| 4 | Llama 3.1 8B | A candidate for future expansion, especially for longer text and reasoning support. |

### Models Recommended by Gemini

> Since the GPU has 12GB of VRAM, the best experience will likely come from fully loading models in the 8B to 10B class into VRAM and running them at high speed.

| No. | Model Name | Notes |
| - | - | - |
| 1 | Llama-3.1-8B (GGUF) | A high-performance standard model. Also good at Japanese. |
| 2 | Gemma-2-9B-it | A lightweight model developed by Google. |

The explanations for the first and second choices were also very practical.

- First choice: **Llama-3.1-8B-Instruct** (GGUF / Q8_0 or Q6_K)
  - Reason: With 12GB of VRAM, even a higher-bit quantization should still fit comfortably.
  - Size: Around 6GB to 8GB

- Second choice: **Gemma-2-9B-it** (GGUF / Q6_K)
  - Reason: Its Japanese tone tends to feel softer.
  - Size: Around 8GB

### A More Numerical View of What Seems Likely to Run Well

Copilot also summarized the practical range in table form.

| Model | Recommended Quantization | VRAM Usage | On RTX 4070 SUPER | Response Speed from RasPi |
| - | - | - | - | - |
| Qwen2.5 3B | Q4_K_M | 3–4GB | Plenty of room | Very fast |
| Qwen2.5 7B | Q4_K_M | 6–7GB | Plenty of room | Fast |
| Phi-3.5 Mini | Q4_K_M | 3GB | Plenty of room | Fast |
| Phi-3 Medium | Q4_K_M | 6GB | Plenty of room | Medium |
| Llama 3.1 8B | Q4_K_M | 8–9GB | Tight but workable | Medium |

---

<a id="anchor2" class="scroll-mt-24"></a>

## 📚 Models for ZINE Writing and Structure Support

Next, I also asked about models suited for supporting ZINE writing and structure.

What I want from a local LLM is not just casual chat.  
I also wanted to see whether it could help with drafting, chapter structure, organizing key points, and adjusting sentence endings and tone.

### Models Recommended by ChatGPT

> To put the conclusion first: for ZINE writing and structure, mid-sized instruct models that can naturally organize long text are more likely to be useful than oversized reasoning-heavy models.

| Model Name | Notes |
| - | - |
| Qwen3 14B | Good for chapter structure, heading organization, and turning ideas into bullet points. |
| Gemma 3 12B | Good at reading long text, restructuring it, and unifying tone. |
| LLM-jp 8B | Useful for comparing Japanese phrasing. |

### Models Recommended by Copilot

> To put it simply: local LLMs that really help with the “structure” of ZINE writing do exist.

| Model Name | Notes |
| - | - |
| Qwen2.5 14B | Strong at outlining, organizing key points, and structuring content. |
| Llama 3.1 8B | Good at making writing easier to read. |
| Gemma 9B | Good at adding a ZINE-like sense of warmth and tone. |

### Models Recommended by Gemini

> If you want to make use of this PC setup locally (RTX 4070 SUPER / 12GB VRAM), there are several models that are strong for brainstorming structure and revising drafts.

| Model Name | Notes |
| - | - |
| Llama-3-Swallow-8B-v0.1 (or Instruct) | Good balance of Japanese ability and structural strength. |
| Gemma-2-9B-IT | Also balanced in Japanese ability and structural support. |
| Command R | Stronger for context understanding and long-text consistency. |
| Mistral-Nemo-12B-Instruct-v1 | A good balance of speed and lightness. |

---

<a id="anchor3" class="scroll-mt-24"></a>

## 🤔 Comparing the Tendencies of Each AI’s Suggestions

Looking at them side by side, each generative AI had its own distinct tendency.

- **Copilot** tended to give practical suggestions separated clearly by use case
- **ChatGPT** tended to suggest candidates with an overall balance in mind
- **Gemini** tended to narrow things down based on what best fits the PC specs

For the Raspberry Pi connection experiment, the suggestions broadly followed the same flow:

- First, check the connection with a lightweight model
- Next, evaluate conversation quality with something in the 7B to 9B range
- Then, if needed, compare with heavier models

For ZINE writing support, on the other hand, the division seemed closer to each phase of the work:

- Models that are good for drafting
- Models that are good at organizing long text
- Models that are good at adjusting sentence endings and tone

So it looks like the strengths differ depending on the production step.

---

<a id="anchor4" class="scroll-mt-24"></a>

## 🎯 Narrowing Down the First Models to Try

Looking over all of this, these seem like the best candidates to start with.

### 1. First candidates for Raspberry Pi connection experiments
- **Qwen2.5 3B**
- **Qwen2.5 7B**
- **Llama 3.1 8B**

These seem to have a good balance of lightness, response speed, and stable Japanese output,  
which makes them well suited to the purpose of  
“getting it running,” “connecting it,” and “seeing how it responds.”

### 2. First candidates for ZINE writing support
- **Llama 3.1 8B / Llama-3-Swallow-8B family**
- **Gemma 9B / 12B family**
- **Qwen 14B family**

For this purpose, it seems better not to throw everything into real use all at once, but instead switch models depending on the production phase:

- Drafting, rough text layouts, and bullet points
- Turning ideas into fuller prose
- Adjusting sentence endings and tone

If I compare that to background art, programming, or video production, it might look something like this:

| ZINE | Background Art | Programming | Video |
| - | - | - | - |
| Drafts, rough text layouts, bullet points | Color planning | Front-end design / initial planning | Storyboard |
| Prose expansion and long-form writing | Paint-in / build-up | Implementation and back-end design | Video storyboard / rough edit |
| Adjusting endings and tone | Final polish | Cleanup and refactoring | Final compositing |

---

<a id="anchor5" class="scroll-mt-24"></a>

## ✍️ Summary This Time

What became clear this time is that choosing models for local LLMs seems easier if I decide on  
**entry-point models for each purpose**,  
rather than trying to find one single “strongest” model.

At least in the beginning, it seems more practical to separate them into:

- Lightweight models for connection experiments
- Mid-sized models for writing and structure support

That way, the direction of trial and error becomes much easier to see.

Next, I’ll actually install Ollama and start building a local LLM environment by running a lightweight model first.