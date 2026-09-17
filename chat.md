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

Sixteen built-in palettes, switchable live with `/theme` in the session. Each
swatch below uses the exact background and accent colors from the theme
itself.

<table style="width: 100%; border-collapse: separate; border-spacing: 10px; margin-top: 1rem;">
  <tr>
    <td style="background: #191919; border-radius: 10px; padding: 14px 16px; width: 25%;"><span style="color: #f2764f; font-family: monospace;">❯</span> <span style="color: #ffffff; font-family: monospace;">default</span><br/><span style="color: #8a8a85; font-size: 12px;">the default warm dark palette</span></td>
    <td style="background: #0b1929; border-radius: 10px; padding: 14px 16px; width: 25%;"><span style="color: #4fd6e0; font-family: monospace;">❯</span> <span style="color: #cfe3f5; font-family: monospace;">aster-ocean</span><br/><span style="color: #8ba3b9; font-size: 12px;">the signature aster deep-teal dark</span></td>
    <td style="background: #1a1410; border-radius: 10px; padding: 14px 16px; width: 25%;"><span style="color: #ff7b39; font-family: monospace;">❯</span> <span style="color: #f2e5d5; font-family: monospace;">aster-ember</span><br/><span style="color: #b39b7e; font-size: 12px;">warm charcoal, burning orange</span></td>
    <td style="background: #17121f; border-radius: 10px; padding: 14px 16px; width: 25%;"><span style="color: #c678dd; font-family: monospace;">❯</span> <span style="color: #e8ddf5; font-family: monospace;">aster-orchid</span><br/><span style="color: #a896c4; font-size: 12px;">violet dark, magenta accent</span></td>
  </tr>
  <tr>
    <td style="background: #1e1f29; border-radius: 10px; padding: 14px 16px;"><span style="color: #ff79c6; font-family: monospace;">❯</span> <span style="color: #f8f8f2; font-family: monospace;">dracula</span><br/><span style="color: #9c95a8; font-size: 12px;">purple and pink on dark slate</span></td>
    <td style="background: #1e1e2e; border-radius: 10px; padding: 14px 16px;"><span style="color: #f5c2e7; font-family: monospace;">❯</span> <span style="color: #c6d0e5; font-family: monospace;">catppuccin</span><br/><span style="color: #9aa5be; font-size: 12px;">warm pastels on mauve</span></td>
    <td style="background: #2e3440; border-radius: 10px; padding: 14px 16px;"><span style="color: #88c0d0; font-family: monospace;">❯</span> <span style="color: #e5e9f0; font-family: monospace;">nord</span><br/><span style="color: #9ca3af; font-size: 12px;">cool blues on slate</span></td>
    <td style="background: #1d2021; border-radius: 10px; padding: 14px 16px;"><span style="color: #fe8019; font-family: monospace;">❯</span> <span style="color: #ebdbb2; font-family: monospace;">gruvbox</span><br/><span style="color: #a89968; font-size: 12px;">earthy amber and orange</span></td>
  </tr>
  <tr>
    <td style="background: #002b36; border-radius: 10px; padding: 14px 16px;"><span style="color: #268bd2; font-family: monospace;">❯</span> <span style="color: #93a1a1; font-family: monospace;">solarized</span><br/><span style="color: #657b83; font-size: 12px;">muted teal and blue</span></td>
    <td style="background: #1a1a2e; border-radius: 10px; padding: 14px 16px;"><span style="color: #ff7edb; font-family: monospace;">❯</span> <span style="color: #f6f6f6; font-family: monospace;">synthwave</span><br/><span style="color: #a3a3c2; font-size: 12px;">neon pink to cyan</span></td>
    <td style="background: #222b3a; border-radius: 10px; padding: 14px 16px;"><span style="color: #58a6ff; font-family: monospace;">❯</span> <span style="color: #c9d1d9; font-family: monospace;">github-dark</span><br/><span style="color: #8b949e; font-size: 12px;">GitHub's calm blue dark palette</span></td>
    <td style="background: #2d2a2e; border-radius: 10px; padding: 14px 16px;"><span style="color: #fc9817; font-family: monospace;">❯</span> <span style="color: #fcfcfa; font-family: monospace;">monokai</span><br/><span style="color: #928374; font-size: 12px;">classic Sublime/Monokai Pro palette</span></td>
  </tr>
  <tr>
    <td style="background: #282c34; border-radius: 10px; padding: 14px 16px;"><span style="color: #61afef; font-family: monospace;">❯</span> <span style="color: #abb2bf; font-family: monospace;">one-dark</span><br/><span style="color: #828997; font-size: 12px;">Atom One Dark blues and mint</span></td>
    <td style="background: #0f1422; border-radius: 10px; padding: 14px 16px;"><span style="color: #7dc4ff; font-family: monospace;">❯</span> <span style="color: #ffffff; font-family: monospace;">midnight</span><br/><span style="color: #828fa8; font-size: 12px;">deep blue dark palette</span></td>
    <td style="background: #171c16; border-radius: 10px; padding: 14px 16px;"><span style="color: #a7c080; font-family: monospace;">❯</span> <span style="color: #ffffff; font-family: monospace;">forest</span><br/><span style="color: #9aa08a; font-size: 12px;">muted green dark palette</span></td>
    <td style="background: #f5f2ee; border-radius: 10px; padding: 14px 16px;"><span style="color: #c25a30; font-family: monospace;">❯</span> <span style="color: #1a1a1a; font-family: monospace;">light</span><br/><span style="color: #6a6a66; font-size: 12px;">for bright terminals</span></td>
  </tr>
</table>

## Streaming for tools

`--stream` emits one JSON object per line. The desktop app and the VS Code
extension both consume this format, and it is stable output, not a log:

```sh
aster --stream "summarize the failing test"
```

Approval prompts arrive as events on stdout; reply on stdin to approve or deny,
which is how headless front-ends gate edits.
