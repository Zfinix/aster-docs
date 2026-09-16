---
title: "MCP servers"
description: "Connect Model Context Protocol servers, local or remote, with progressive injection and per-tool filters."
---

Aster speaks the [Model Context Protocol](https://modelcontextprotocol.io).
Servers are declared under `mcp.servers` in aster.yaml:

```yaml
mcp:
  servers:
    github:
      command: npx
      args: ["-y", "@modelcontextprotocol/server-github"]
      env:
        GITHUB_TOKEN: ${GITHUB_TOKEN}
    docs:
      url: https://docs.example.com/mcp
      headers:
        Authorization: Bearer ${DOCS_TOKEN}
```

`command` + `args` + `env` spawn a local server over stdio; `url` connects to a
remote one over streamable HTTP (`type: sse` for the deprecated HTTP+SSE
binding, `http` accepted as an alias). `disabled: true` skips a server without
deleting its config.

Two other sources add servers after the yaml is read: `.mcp.json` in the repo
root and `~/.aster/mcp.json` are read natively, and installed plugins
contribute theirs as `<plugin>/<server>`. Both only fill names `aster.yaml` did
not already define, so the yaml always wins a collision.

## Progressive injection

Tool inventories can be huge, so Aster does not paste them all into context.
The inventory is measured against a budget (`mcp.context_tokens` times
`mcp.inventory_percent`, default 1.5% of 100k). Within budget, tools are listed
in the prompt. Above it, the prompt lists servers only, and the model discovers
tools with a search call. Either way the agent finds the tool; the difference is
how much context it costs.

## Filtering tools

```yaml
mcp:
  tools:
    allow: []          # empty means every tool
    deny:
      - "web/crawl"
      - "browser/*"
```

Globs match against the `server/tool` id, and `deny` wins over `allow`. The
filter runs after every server has listed, so it covers the built-in `web`
server as well as third-party ones.

## Managing from the shell

```sh
aster mcp list [--no-connect]
aster mcp enable NAME | server/tool
aster mcp disable NAME | server/tool     # globs allowed
aster mcp import [--from claude|codex|cursor|opencode|hermes]
aster mcp remove [NAME]
aster mcp login NAME                     # OAuth for a remote server
```

`/mcp` in chat shows the same picture and connects servers if the session
started with `--no-mcp`.

## WebMCP

`mcp.webmcp` bridges tools a web page registers in your own Chrome. Start Chrome
with `--remote-debugging-port=9222` and the page's tools appear as MCP tools.
