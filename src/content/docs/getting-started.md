---
title: "Getting started"
description: "Install Aster, connect a model, and run your first turn in a repository."
---

## Install

```sh
curl -fsSL https://withaster.dev/install | sh
```

The installer downloads the binary for your platform and puts `aster` on your
`PATH`. Inspect [the script](https://withaster.dev/install) first if you prefer
to read what runs.

From source instead, with Rust 1.85+:

```sh
cargo install --path crates/aster-cli
```

Upgrade later with `aster upgrade`, or pin a version with
`aster upgrade --version 0.4.0 --force`.

## Sign in

Run `aster init` in any directory. The wizard walks through:

1. **Provider and model.** Pick from the catalog, sign in through the browser,
   or paste an API key. Keys are written to `~/.aster/.env`, never to yaml.
2. **Scope.** Global (`~/.aster`) by default, or `--local` to keep the config in
   the repository.
3. **Web keys, optional.** Search and page extraction work without a key; crawl
   and screenshots need one.

`aster init --yes --force` skips the questions and writes defaults. `aster
status` shows what the next turn will use.

Provider sign-in is also available on its own:

```sh
aster login              # GitHub, for --pr and --comment
aster login codex        # ChatGPT subscription, no API key needed
aster login openrouter
aster login zai
```

`aster login codex` runs on a ChatGPT subscription against
`https://chatgpt.com/backend-api/codex`. Aster translates OpenAI's Responses API
in both directions, so models and tools behave as they do anywhere else.

## First turn

In a repository:

```sh
cd your-repo
aster
```

The TUI prints a session header (model, provider, skills) and a prompt. Start
with a question:

```text
where does the retry logic live?
```

Aster reads files, searches, and answers with file and line references. Then ask
for a change:

```text
add a timeout to that call and a test for it
```

In the default `edit` mode, edits land in your working tree and commands run in
a sandbox. Press `esc` to interrupt a turn, `shift+tab` to change the permission
mode, and `esc esc` to quit.

## Everyday flow

```sh
aster                        # chat in the current repo
aster --continue             # resume this repo's latest session
aster --resume               # pick a session
aster "why does the build fail?"   # one-shot: print the answer and exit
echo "explain this repo" | aster   # piped stdin is the prompt
```

Outside a repository, chat still works, with less to look at.

## What to read next

- [Chat](/docs/chat): keys, slash commands, and one-shot mode.
- [Permissions](/docs/permissions): the five modes and the rule language.
- [Configuration](/docs/configuration): every `aster.yaml` key.
