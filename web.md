---
title: "Web"
description: "Search, extract, crawl, sitemaps, and screenshots, as CLI commands and as the agent's web tools."
---

Aster ships a built-in `web` MCP server. Five operations, usable from the shell
and callable by the agent during a turn:

```sh
aster web search "query" [--limit 5] [--region us-en] [--safesearch strict]
aster web extract https://…
aster web crawl https://… [--max-pages 100] [--max-depth N] [--url-regex R] [--main-content-only] [--follow-subdomains] [--no-pdfs] [--stop-after-ms 80000]
aster web sitemap docs.rs [--max-links 500] [--url-regex R]
aster web screenshot https://… [--full-page]
```

Search and extract return clean Markdown, made for reading by a model.

## Keys

| Operation | Needs |
| --- | --- |
| `search`, `extract` | Nothing |
| `crawl` | `FIRECRAWL_API_KEY`, or `CONTEXT_DEV_API_KEY`, or the Cloudflare pair |
| `sitemap`, `screenshot` | `CONTEXT_DEV_API_KEY` |

`aster key list --all` shows every web key you have set and what each one buys.
Keys live in `.env` files like every other key; `aster key set
CONTEXT_DEV_API_KEY` writes one.

## In chat

The same five are the agent's `web/search`, `web/extract`, `web/crawl`,
`web/sitemap`, and `web/screenshot` tools. Ask it to look something up and it
picks one; results arrive as Markdown in the turn. `mcp.tools.deny` can filter
them like any other MCP tool.
