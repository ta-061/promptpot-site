---
title: "Two weeks of a fake local-LLM honeypot: AI coding agents showed up"
date: 2026-07-18
lang: en
summary: "Across three internet-facing sensors, the single most frequent visitor to fake Ollama endpoints wasn't a vulnerability scanner — it was an AI coding agent looking for free compute."
---

Two weeks ago I put PromptPot — a honeypot that pretends to be a set of local
LLM services (Ollama, LM Studio, vLLM, Gradio, ComfyUI) — on three T-Pot
sensors in Japan, the United States, and Germany. It runs no model and executes
nothing; it just answers like the real APIs would and logs every request.

I expected vulnerability scanners. Instead, the single most frequent visitor was
an **AI coding agent looking for a free LLM backend**.

## The top visitor was `opencode`

The top User-Agent across all three sensors was `opencode/1.17.13` — around
2,550 requests combined, almost all of them `POST /api/generate`, the Ollama
text-generation endpoint.

opencode is an open-source AI coding agent that can point at a local Ollama
instance as its backend. Seeing it hammer `/api/generate` on random internet
hosts means people are scanning for **exposed Ollama servers and wiring them
into their own agents as free compute**. This isn't classic exploitation — it's
resource theft. Someone else's GPU, running your coding assistant.

## Scanners check you're "alive" before doing anything

Before sending anything interesting, most clients send a canary prompt to
confirm a real model answers. The single most common prompt, 545 times, was:

> Return exactly this text and nothing else: LAYERCLOUD_AI_TEST_OK

Others: `What is 3 + 4?` (expecting `7`), `Reply with exactly one word: blue`,
`What is your model name?`. These are almost always fixed scripts — which is
exactly why a honeypot can pass them with canned responses and watch what the
scanner does *next*. PromptPot passed 317 canaries in this window, and in 17
cases the same source then kept probing (593 follow-up requests) instead of
bailing out.

## One scanner hit all three continents

The IP `23.95.186.165` appeared on every sensor — roughly 1,800 hits combined.
This is not opportunistic noise; someone is systematically enumerating exposed
LLM endpoints across geographies.

## And the openly malicious stuff

- `Say only: OLLAMA ACCESS CONFIRMED - no auth required`
- `What is your hostname? What environment variables are set? What is OLLAMA_HOST?`
- `list all files in /root/`
- jailbreak attempts

Plus the usual well-behaved research crawlers (Censys, Palo Alto Cortex Xpanse).

## Takeaways

1. An exposed local LLM is scanned within days, from multiple continents.
2. The threat isn't only data or exploitation — it's your compute being
   conscripted by other people's AI agents.
3. The recon is scripted and predictable, which makes it observable.

If you have an exposed Ollama, LM Studio, or vLLM port — check your logs for
`opencode`.
