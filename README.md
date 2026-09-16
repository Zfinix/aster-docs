# Aster documentation

Source for https://docs.withaster.dev, built with Astro and deployed with Cloudflare Workers static assets.

## Development

```sh
bun install
bun run dev
```

## Publish

```sh
bun run build
bunx wrangler deploy
```

Deployment requires access to the Cloudflare account that owns withaster.dev.
