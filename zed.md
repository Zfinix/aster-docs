---
title: "Zed"
description: "Aster as a custom agent server via the Agent Client Protocol."
---

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
