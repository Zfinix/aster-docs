---
title: "Introduction"
description: "Aster is an open-source coding agent that reads your code, edits files, runs commands, and reviews changes, with any model you choose."
---

Aster is a coding agent that lives in your terminal. It reads your code, answers
questions about it, edits files, runs commands, and reviews your changes. It
works with any OpenAI-compatible provider: OpenRouter, OpenAI, Groq, Anthropic,
Z.ai, or a model running on your own machine.

<img src="/terminal.png" alt="Aster running in the terminal, showing the session header and prompt" />

One binary does all of it:

```sh
aster
```

That opens a chat bound to the repository you are in. Ask where the retry logic
lives, ask for a small change and a test, or hand it a diff to review. Everything
Aster does is visible: edits are gated by a permission mode you control, commands
run in a sandbox, and every session is saved under `~/.aster`.

## For AI agents

Every page is machine-readable. [llms.txt](/llms.txt) indexes the whole site
with descriptions, [llms-full.txt](/llms-full.txt) is all of it in one file,
and appending `.md` to any page URL returns clean markdown. There is also an
MCP server at `/mcp` (tools: `search_docs`, `get_page`) and a [SKILL.md](/SKILL.md)
for coding agents.

## What it does

- **Chats about your code** with the full repository in reach: file search,
  content search, language-server navigation, and document reading.
- **Edits and runs** under a permission mode from `plan` (look, do not touch) to
  `yolo` (no rules, no sandbox), with a rule language for everything between.
- **Reviews diffs** with a hypothesize-then-verify pipeline that tries to refute
  each finding before reporting it, and posts the result to a PR on request.
- **Remembers** across sessions: project facts always in context, named blocks
  read on demand.
- **Extends** with skills, plugins, and MCP servers, and fans work out to
  sub-agents.
- **Runs on a schedule** or over Telegram, headless, with the same config.

## Where to go next

- [Getting started](/getting-started) installs Aster and connects a model.
- [Chat](/chat) covers the TUI, keys, and slash commands.
- [Permissions](/permissions) explains the modes and the rule language.
- [Configuration](/configuration) is the complete `aster.yaml` reference.

## Where things live

| Path | What it is |
| --- | --- |
| `~/.aster/aster.yaml` | Global configuration |
| `aster.yaml` in a repo root | Project configuration, layered over the global one |
| `~/.aster/.env` | API keys, never in yaml |
| `~/.aster/sessions/` | Saved sessions |
| `~/.aster/logs/` | Provider and router logs |

Aster is open source at
[github.com/Zfinix/aster](https://github.com/Zfinix/aster). These docs are open
too, at [github.com/Zfinix/aster-docs](https://github.com/Zfinix/aster-docs).
