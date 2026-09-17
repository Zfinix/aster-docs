---
title: "Environment variables"
description: "Every ASTER_* variable, what it does, and where it sits in the precedence order."
---

Environment variables sit between CLI flags and aster.yaml: **CLI flags >
environment > aster.yaml > defaults**. Keys are usually set in `.env` files
rather than the shell; both work the same once loaded.

## Model and provider

| Variable | Does |
| --- | --- |
| `ASTER_API_KEY` | Shared fallback key; a var named for the endpoint beats it |
| `ASTER_BASE_URL` | Override the endpoint; outranks aster.yaml |
| `ASTER_MODEL` | Override the model; outranks aster.yaml |
| `ASTER_EFFORT` | Reasoning budget: off, low, medium, high, xhigh, max, ultra |
| `ASTER_REASONING_EFFORT` | Alias for `ASTER_EFFORT` |
| `ASTER_MAX_TOKENS` | Completion cap; `off` lifts the cap |
| `ASTER_SEED` | Sampling seed; `off` disables fixing it |
| `ASTER_TIMEOUT_SECS` | Per-request timeout |
| `ASTER_MAX_RETRIES` | Retry count for failed requests |
| `ASTER_DEADLINE_SECS` | Whole-turn deadline |
| `ASTER_VISION_MODEL` | Model used to describe images for models that cannot see them |
| `ASTER_PRICE_PROMPT_PER_M`, `ASTER_PRICE_COMPLETION_PER_M` | Manual pricing for cost display |
| `ASTER_PROMPT_CACHE` | `off` disables explicit prompt-cache breakpoints |
| `ASTER_CATALOG_URL` | Override the model catalog URL |

## Agent behavior

| Variable | Does |
| --- | --- |
| `ASTER_MAX_TOOL_ROUNDS` | Cap on tool rounds per turn (default 60) |
| `ASTER_COMMAND_TIMEOUT` | Per-command timeout in seconds (default 300) |
| `ASTER_COMPACT_BUDGET` | Context budget that triggers compaction (default 192000 chars) |
| `ASTER_LANGUAGE` | Language every reply is written in; unset follows the user |
| `ASTER_GOAL_MAX_TURNS` | Cap for `/goal` loops (default 20) |
| `ASTER_ROUTER_TIER` | `cheap`, `balanced`, or `strong` for `model: auto` |
| `ASTER_AGENT_MAX_CONCURRENT` | Sub-agents running at the same time |
| `ASTER_AGENT_MAX_PER_TURN` | Sub-agent fan-out allowed per turn |
| `ASTER_AGENT_TIMEOUT` | Per-sub-agent timeout in seconds |
| `ASTER_COLLECTOR_MODEL` | Model that merges sub-agent reports |
| `ASTER_LEARN` | `0` turns off skill learning |

## Web and browser

| Variable | Does |
| --- | --- |
| `ASTER_WEB_SEARCH` | `1` gives the agent web search by default |
| `FIRECRAWL_API_KEY` | Enables `web crawl` |
| `CONTEXT_DEV_API_KEY` | Enables `crawl`, `sitemap`, `screenshot` |
| `CLOUDFLARE_API_ID`, `CLOUDFLARE_API_TOKEN` | Alternative keys for `crawl` |
| `ASTER_NO_BROWSER` | `1`: `open_preview` prints the URL instead of opening it |
| `ASTER_WEBMCP_CDP_URL` | Chrome remote debugging URL for the webmcp server |

## Review

| Variable | Does |
| --- | --- |
| `ASTER_VERIFY_MODEL` | Override `review.verify_model` |
| `ASTER_HYPOTHESIS_MODEL` | Override `review.hypothesis_model` |
| `ASTER_VERIFY_CONCURRENCY` | Parallel verifier count |
| `ASTER_ANALYZERS` | Analyzers for review, comma separated: `semgrep`, `ast-grep`; empty means the model alone |
| `ASTER_ASTGREP_RULES` | Extra ast-grep rules path |
| `ASTER_REPO` | Repo name shown in review reports when none is detected |

## Runtime and misc

| Variable | Does |
| --- | --- |
| `ASTER_TELEGRAM_TOKEN`, `ASTER_REMOTE_USERS` | [Remote control](/remote) |
| `ASTER_EDITOR` | Editor opened by config/edit commands |
| `ASTER_UI_DIR` | Serve a custom UI directory |
| `ASTER_MCP_EXTRA` | Extra MCP servers config |
| `ASTER_NO_UPDATE_CHECK` | `1` skips the release check |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry export |

`.env.example` in the main repository lists them with notes. `aster key list
--all` shows which are set and where they came from.
