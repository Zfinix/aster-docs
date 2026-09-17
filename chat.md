---
title: "Chat"
description: "The TUI, keys, slash commands, one-shot mode, and streaming."
---

`aster` in a repository opens the chat TUI. Everything else is optional flags on
top of it.

```sh
aster                                # TUI in the current repo
aster "why does the build fail?"     # one-shot: print and exit (--print / -p)
echo "explain this repo" | aster     # piped stdin is the prompt
aster --continue                     # resume this repo's latest session
aster --resume [ID]                  # pick a session, or resume one by id
aster --session ID "next question"   # persist into a named session
aster --messages-json history.json   # caller owns the transcript (- for stdin)
aster --compact --messages-json h.json   # fold history into a summary, print it
aster --stream                       # NDJSON events out, approval replies in
aster --no-tools                     # plain chat, no read/search/edit
aster --no-mcp                       # start instantly; /mcp connects later
aster --allow-edits                  # let a scripted turn edit files
aster --permission-mode plan|manual|auto|edit|yolo
```

Chat, review, and fix also take `--model` and
`--effort off|low|medium|high|xhigh|max|ultra`.

## Keys

| Key | Does |
| --- | --- |
| `enter` | Send; while a turn runs it queues the message |
| `esc` | Interrupt the running turn; `esc esc` quits |
| `shift+tab` | Step to the next permission mode |
| `ctrl+j` | Newline without sending |
| `ctrl+o` | The `/switch` panel |
| `@` | Mention a repo file; images and documents attach as content |
| `↑ ↓` | Move the cursor, then step through past messages |

## Slash commands

| Command | Does |
| --- | --- |
| `/switch` | Thinking, mode, effort, model, provider in one panel |
| `/model [id]`, `/m` | Switch model or open the picker |
| `/provider [id\|url]`, `/p` | Switch endpoint, then pick a model |
| `/mode [name]` | plan, manual, auto, edit, yolo |
| `/effort [level]` | Set or cycle the reasoning budget |
| `/thinking` | Print the model's thinking in full or not |
| `/yolo` | Toggle yolo (guardrails off, red theme) |
| `/mom [resume]` | Show the [mom.yaml](/configuration#mom-yaml-model-routing) routing state; `resume` re-arms it after a manual `/model` |
| `/resume`, `/r` | Reopen a saved session |
| `/clear`, `/c` | Start fresh |
| `/compact` | Fold earlier turns into a summary |
| `/status` | Session, model, context, token usage |
| `/diff`, `/d` | Uncommitted changes |
| `/mcp` | MCP servers and their tools; connects them if `--no-mcp` skipped it |
| `/skills` | Pick a skill to load |
| `/memory` | What Aster remembers here |
| `/remember <text>` | Save a fact to memory |
| `/theme` | Open the theme picker; previews live as you arrow through |
| `/welcome` | Show or hide the session header, saved to `ui.welcome` |
| `/goal <condition>` | Loop turns until a judge model says the condition is met |
| `/help`, `/quit` | The list above; exit |

Installed skills that declare a command also appear as slash commands, for
example `/write-tests`.

## Themes

`/theme` opens a picker that previews live as you arrow through; Enter saves the
choice to `ui.theme` in aster.yaml. Built-ins include `dark`, `light`,
`midnight`, `forest`, `dracula`, `catppuccin`, `nord`, `gruvbox`, `solarized`,
`synthwave`, `github-dark`, `monokai`, `one-dark`, `aster-ocean`,
`aster-ember`, and `aster-orchid`. Custom themes are YAML files dropped into
`~/.aster/themes/` or `.aster/themes/`; they appear in the picker on the next
launch.

## Streaming for tools

`--stream` emits one JSON object per line. The desktop app and the VS Code
extension both consume this format, and it is stable output, not a log:

```sh
aster --stream "summarize the failing test"
```

Approval prompts arrive as events on stdout; reply on stdin to approve or deny,
which is how headless front-ends gate edits.
