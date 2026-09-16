---
title: "Surfaces"
description: "Terminal, browser, VS Code, Zed, and desktop. One binary, one config."
---

| Surface | How |
| --- | --- |
| Terminal | `aster` |
| Browser | `aster serve [--port 8080] [--host 0.0.0.0] [--no-open]` |
| VS Code / Cursor | The `editors/vscode` extension |
| Zed | `aster acp` as a custom agent server |
| Desktop | The Tauri app in `desktop/` |

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

## One config everywhere

All surfaces resolve model, provider, mode, and keys from the same aster.yaml,
so `aster provider use openai` switches every surface at once.
