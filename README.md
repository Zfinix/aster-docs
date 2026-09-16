# aster-docs

Mintlify docs for Aster, live at docs.withaster.dev.

- `mint dev` for local preview
- `mint validate` for a strict build check
- `bun run deploy` to export the static site, generate the AI surfaces, and ship it to Cloudflare

## AI surfaces

Self-hosting the export skips Mintlify's hosted AI layer, so `scripts/ai.mjs`
rebuilds it and `worker.js` serves it:

- `/llms.txt` and `/llms-full.txt`, generated from `docs.json` nav
- any page as markdown by appending `.md`, or via `Accept: text/markdown`
- an MCP server at `/mcp` with `search_docs` and `get_page` tools
- `/SKILL.md` for coding agents, plus `/.well-known/ai-plugin.json` and `/.well-known/mcp.json`
- `robots.txt` and `sitemap.xml`

`mint score` caches results per domain; trust `curl` over its output for this
site.
