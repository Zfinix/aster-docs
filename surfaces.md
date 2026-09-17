---
title: "Interfaces"
description: "Terminal, browser, VS Code, Zed, and desktop. One binary, one config."
---

| Surface | How |
| --- | --- |
| Terminal TUI | `aster` (interactive chat in your terminal) |
| One-shot CLI | `aster -p "question"`, `aster review`, `aster fix`, `aster run` |
| Browser | `aster serve [--port 8080] [--host 0.0.0.0] [--no-open]` |
| VS Code / Cursor | The `editors/vscode` extension |
| Zed | `aster acp` as a custom agent server |
| Any ACP editor | `aster acp` speaks the Agent Client Protocol on stdio |
| Desktop | The Tauri app in `desktop/` |
| Telegram | `aster remote telegram` |
| iMessage | `aster remote imessage` (macOS) or `aster remote photon` |
| Scheduled / headless | `aster run` + `aster cron` from `aster.yaml` |

## Terminal TUI

```sh
aster
```

The full chat experience in your terminal: streamed replies, tool calls with
diffs, plan approvals, themes, and slash commands. `shift+tab` cycles
permission modes.

## One-shot CLI

```sh
aster -p "why is this test failing?"
aster review
aster fix --findings-json findings.json --apply
```

Same agent, no interactive session. Plain text out by default when piped,
`--json` for machine-readable output. This is the form scripts and CI use.

## Browser

```sh
aster serve
```

Serves the chat UI at `http://localhost:4187` and opens it. Off loopback, a
token is required in the URL, so an exposed port is not an open door.

## VS Code and Cursor

The extension embeds the chat in a sidebar, tab, or window.

- `cmd+shift+a` opens Aster, `cmd+alt+k` the command menu, `cmd+alt+n` a new
  session, `cmd+alt+r` reopens a session
- `alt+a` sends the current selection as an @-mention
- Review findings land in the Problems pane
- Settings: `aster.binaryPath`, `aster.minConfidence`,
  `aster.publishDiagnostics`, `aster.extraArgs`

## Zed

`aster acp` speaks the Agent Client Protocol. Register it in Zed's
`settings.json` as a custom agent server:

```json
{
  "agent": {
    "custom_servers": {
      "aster": {
        "command": "aster",
        "args": ["acp", "--permission-mode", "edit"]
      }
    }
  }
}
```

Flags: `--permission-mode`, `--model`, `--no-mcp`, `--trace`.

## Desktop

The Tauri app in `desktop/` wraps the same agent with a native window. It shells
out to the `aster` binary on PATH, so `make install` keeps it current.

## Telegram, iMessage, Photon

`aster remote` bridges a messaging channel to the agent, so you drive it from
your phone:

- `aster remote telegram` long-polls a bot token from @BotFather, no public URL
  needed
- `aster remote imessage` bridges Messages.app natively (macOS only)
- `aster remote photon` bridges iMessage through a Photon agent server with
  signed webhooks

Permission prompts arrive as buttons in the chat.

## Headless and scheduled

`aster run "task"` runs one agent on one task with no terminal attached, and
`aster cron install` puts every schedule in `aster.yaml` into the OS scheduler.
Both resolve the same config as every other surface.

## One config everywhere

All surfaces resolve model, provider, mode, and keys from the same aster.yaml,
so `aster provider use openai` switches every surface at once.
