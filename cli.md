---
title: "CLI commands"
description: "Every aster subcommand, with the flags that matter."
---

Every subcommand takes `--json` (before or after it) and turns errors into
`{"ok":false,"error":…}`. Chat, review, and fix take `--model` and
`--effort off|low|medium|high|xhigh|max|ultra`. `aster <cmd> --help` is the
source of truth.

## Chat and sessions

| Command | Does |
| --- | --- |
| `aster` | Chat TUI in the current repo |
| `aster [PROMPT]` | One-shot: print the answer and exit (`--print`, `-p`) |
| `aster --continue` | Resume this repo's latest session |
| `aster --resume [ID]` | Pick a session, or resume one by id |
| `aster --stream` | NDJSON events out, approval replies in |
| `aster sessions …` | List, show, rename, delete, prune, import |

## Setup and status

| Command | Does |
| --- | --- |
| `aster init` | Wizard: provider + key into `~/.aster` (`--local`, `--yes --force`) |
| `aster login [TARGET]` | GitHub, or a provider, via browser |
| `aster logout` | Drop every stored login |
| `aster status` | What the next turn runs with |
| `aster upgrade` | Swap in the latest release (`--version`, `--force`) |
| `aster announce` | Undismissed release notes as JSON |

## Config, keys, providers, models

| Command | Does |
| --- | --- |
| `aster config` | Form in a terminal, table when piped |
| `aster config list/get/set/unset/path/edit` | Read and write settings |
| `aster config providers/models/model` | Catalog and selection |
| `aster key list/get/set/unset/path` | API keys in `.env` files |
| `aster provider list/use` | Endpoints |
| `aster model list/use/recommended/router` | Models and the auto tier |
| `aster mom check/route` | Validate and preview mom.yaml routing |

## Work

| Command | Does |
| --- | --- |
| `aster review` | Review a diff, range, or PR |
| `aster fix` | Patch findings from review JSON |
| `aster run AGENT TASK` | One headless agent run |
| `aster web search/extract/crawl/sitemap/screenshot` | Web as Markdown |
| `aster memory …` | Inspect and edit memory |
| `aster remember TEXT` | Save one fact to memory |
| `aster learn` | Score the last turn, refine the learned skill |
| `aster sessions …` | Session housekeeping |

## Extensions

| Command | Does |
| --- | --- |
| `aster skills …` | List, add, find, use, bundled, update, remove, init |
| `aster plugins …` | Add, list, remove, validate |
| `aster bots …` | Install and list published specialist bots |
| `aster mcp …` | List, enable, disable, import, remove, login |

## Automation

| Command | Does |
| --- | --- |
| `aster cron install/list/remove/run` | Scheduled runs |
| `aster remind MSG WHEN` | One-shot reminder |
| `aster remote telegram` | Telegram bot |
| `aster serve` | Browser UI |
| `aster acp` | Zed agent server |
