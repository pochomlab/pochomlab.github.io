---
title: "🏠 Getting Started with Local LLMs [01] Learning the Basics"
date: 2026-04-15
tags: ["LLM", "DevLog", "PochomLab"]
summary: "As a first step toward adopting local LLMs, I organized basic terms such as Ollama, LM Studio, model naming, quantization, and RAG."
series: Local-LLM
seriesOrder: 1
author: "P-chan"
draft: false
---

### Local LLM Setup Series

- [01] Learning the Basics
- [[02] Choosing Models](/en/log/2026-local-llm-02-models)
- [[03] Installing Ollama and Checking It Works](/en/log/2026-local-llm-03-ollama)

### 👀 Table of Contents

- [🧪 Trying Out Local LLMs](#anchor1)
- [🖥️ Local AI Platforms](#anchor2)
- [💾 Models](#anchor3)
- [🔍 Reading Model Names](#anchor4)
- [👉 What Is Q4_K_M?](#anchor5)
- [📝 Quick Glossary](#anchor6)
- [✍️ Notes](#anchor7)

---

<a id="anchor1" class="scroll-mt-24"></a>

## 🧪 Trying Out Local LLMs

There are two main reasons I decided to try introducing local LLMs on the PochomLab machine.

### 1. Understanding a Local LLM Environment

First, I wanted to get a clear sense of how local LLMs actually run on the PochomLab machine.

In the future, I would also like to try a setup where a Raspberry Pi is used as a small terminal for input and display,  
while the actual inference runs on the PochomLab machine.  
As a first step toward that, I am starting by checking the basics of local LLMs on the main PC.

- What size of models can actually run
- How much speed I can expect
- What roles Ollama and LM Studio play
- Whether this can become a foundation for linking with other devices later on

### 2. Support for Structuring Writing for ZINE Production

The other purpose is to support writing structure for ZINE production.

Since the start of 2026, I have been encountering more situations where the output of cloud-based AI services feels inconsistent.

- Weak context retention
- Unstable structure
- Output quality fluctuates depending on load and tuning
- Things that worked yesterday may not work today
- It takes time to remove slop and hallucinations

Of course, these services are still useful in many situations, but the longer the writing or the more structural the task becomes,  
the more difficult it feels to keep building on the same assumptions each time.

For that reason, I decided to explore local LLMs as an environment that could help support the framework of writing.

### ✅ Advantages

- Less affected by connection issues or server congestion
- Can be handled as part of my own local environment
- Easier to choose models depending on the purpose

### ❌ Disadvantages

- Performance depends on the PC's hardware
- Model files are large, so storage and memory are also required
- Electricity and operating costs increase

---

## 🏃‍♂️ Organizing Terms as I Go

Once I started looking into local LLMs, model names and format names began appearing all at once.  
So first, I want to roughly organize the terms that come up often.

<a id="anchor2" class="scroll-mt-24"></a>

## 🖥️ Local AI Platforms

These are the foundations used to run and manage LLMs (Large Language Models) on your own PC.

**Ollama**

- A runtime platform that makes it easy to launch local LLMs
- Primarily operated through the command line
- Easy to use as a local API

**LM Studio**

- A desktop app with an easy-to-use GUI
- Makes it easy to search, download, and switch models
- Can also be used as a local server

---

<a id="anchor3" class="scroll-mt-24"></a>

## 💾 Models

LLMs are models trained on large amounts of text in order to understand and generate language.

Just as you choose models like `Anything XL` or `realisticVision` in Stable Diffusion,  
it seems likely that choosing which pretrained model to use will also become important with local LLMs.

**Below is a list of the models that came up as candidates while I was researching local LLMs this time.**

| Model Name | Company / Organization | Location |
| - | - | - |
| Llama | Meta | United States |
| Qwen | Alibaba Cloud | China |
| Gemma | Google DeepMind | United Kingdom |
| Phi | Microsoft | United States |
| Mistral | Mistral AI | France |
| LLM-jp | Large Language Model Research and Development Center (LLMC) | Japan |
| Command R | Cohere | Canada |

---

<a id="anchor4" class="scroll-mt-24"></a>

## 🔍 Reading Model Names

In local LLMs, you often see names like these:

- `Llama-3.1-8B-Instruct`
- `Llama-3.1-8B-Instruct-Q4_K_M.gguf`

At first they look long and intimidating, but they become easier to understand when broken down into parts.

### Parameter Count: "B"

The `B` in `8B` stands for Billion,  
and roughly indicates the scale of the model.

- `7B`: relatively lightweight and easier to run
- `8B`: a standard range that is still manageable on a personal PC
- `14B`: tends to perform better, but also requires more memory
- `70B`: very heavy

Bigger is not automatically better,  
but larger models do tend to be more demanding to run.

### Quantization: "Q"

`Q4` and `Q8` refer to types of quantization.  
This is a way of compressing and lightening a model so it can run more easily.

- `Q4`: light and easy to handle
- `Q5`: balanced
- `Q6` / `Q8`: more quality-oriented, but heavier

In general, larger numbers tend to preserve quality better,  
but they also increase file size and memory usage.

### GGUF (GPT-Generated Unified Format)

`GGUF` is a model format commonly used for local inference.  
It is especially widespread in environments based on `llama.cpp`.

---

<a id="anchor5" class="scroll-mt-24"></a>

## 👉 What Is Q4_K_M?

For example, a notation like `Q4_K_M` can be understood roughly as:

- based on 4-bit quantization
- using a K-family quantization method
- set up to balance lightness and quality

I think that level of understanding is enough for now.

Even without following the internal details from the beginning,  
it is easier to move forward if you think of it first as a lightweight, practical format.

In the local LLM world, `Q4_K_M` is often seen as a good balance between size and quality.

---

<a id="anchor6" class="scroll-mt-24"></a>

## 📝 Quick Glossary

### RAG

RAG is a mechanism where the model does not rely only on its internal knowledge,  
but first retrieves external documents or data and reflects that information in its answer.

For example, it can be useful for things like:

- having it read PDFs on your machine
- referencing your own notes
- combining it with document search

### Tool

A Tool is a mechanism that allows an LLM to use external functions.

For example:

- doing calculations
- searching
- reading files
- calling APIs

It is used when you want the model to do more than just generate text.

### Transformer

Transformer is the architecture that forms the foundation of modern LLMs.  
It is important as a core theory, but in the early stages,  
it is probably enough to understand it simply as the main framework behind current LLMs.

### Classify

This refers to processing that categorizes input text.

For example:

- sorting types of inquiries
- sentiment classification
- tagging
- label assignment

### Embed

This means converting words or sentences into numerical data that makes semantic similarity easier to handle.

It is often used as a foundation for RAG and search.

---

<a id="anchor7" class="scroll-mt-24"></a>

## ✍️ Notes

Since the beginning of 2026, I have increasingly felt fluctuations in the output quality of generative AI services.  
On April 15, I noticed a strong in-product prompt in ChatGPT encouraging users to move to a higher-tier model,  
and it made me feel that AI companies may have clearly entered a monetization phase.

From here on, rather than simply letting AI provide the answer,

- deciding what to make it do
- judging the output yourself
- preparing an environment suited to your own purpose

will likely become more and more important.

At PochomLab, that has already been the direction from the start,  
so this attempt to introduce local LLMs also feels like an extension of that path.

The period when it was possible to experiment freely with generative AI at low cost may gradually be coming to an end.  
As part of preparing for that change, I want to start exploring local LLMs at PochomLab as well.

As a first step, I will begin by organizing the basic terms and mechanisms.
