---
title: "Plugins"
description: "Agent Plugins packages, skills plus MCP servers, install unchanged."
---

Plugins are [Agent Plugins](https://github.com/openai/agent-plugins) packages: a
bundle of skills and MCP servers that installs as one unit. Aster reads the
format unchanged. A plugin's MCP servers appear under names like
`<plugin>/<server>`, and its skills appear in `/skills`.

```sh
aster plugins add owner/repo | ./dir [-p] [--plugin name] [--all] [-y] [-l] [--force]
aster plugins list [-p|-g]
aster plugins remove name [--purge] [-y]
aster plugins validate [./dir]
```

`-p` installs into the project instead of globally. `--purge` on remove also
deletes the plugin's cached skills and servers.

## Where they land

Installed plugins live under the skills root next to regular skills, and their
server contributions merge into the MCP catalog. Names `aster.yaml` already
defines win a collision; a plugin only fills gaps.
