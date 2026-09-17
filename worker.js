let searchIndex;

async function getIndex(env) {
  if (!searchIndex) {
    const res = await env.ASSETS.fetch(new URL('/search-index.json', 'https://x'));
    searchIndex = await res.json();
  }
  return searchIndex;
}

function jsonrpc(id, result) {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id, result }), {
    headers: { 'content-type': 'application/json' },
  });
}

async function handleMcp(request, env) {
  if (request.method === 'GET') return new Response('SSE not supported', { status: 405 });
  const body = await request.json();
  const { id, method, params } = body;
  if (method === 'initialize') {
    return jsonrpc(id, {
      protocolVersion: params.protocolVersion || '2025-03-26',
      capabilities: { tools: {} },
      serverInfo: { name: 'aster-docs', version: '1.0.0' },
    });
  }
  if (method === 'tools/list') {
    return jsonrpc(id, {
      tools: [
        {
          name: 'search_docs',
          description: 'Search the Aster documentation by keyword. Returns matching page slugs, titles, and descriptions.',
          inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
        },
        {
          name: 'get_page',
          description: 'Read one documentation page as markdown. Pass a page slug like "configuration" or a full docs.withaster.dev URL.',
          inputSchema: { type: 'object', properties: { page: { type: 'string' } }, required: ['page'] },
        },
      ],
    });
  }
  if (method === 'tools/call') {
    const { name, arguments: args } = params;
    if (name === 'search_docs') {
      const q = String(args.query || '').toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      const idx = await getIndex(env);
      const hits = idx
        .map((p) => {
          const hay = `${p.slug} ${p.title} ${p.desc}`.toLowerCase();
          return { p, score: terms.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0) };
        })
        .filter((h) => h.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      const text = hits.length
        ? hits.map((h) => `${h.p.title}: ${h.p.slug}.md - ${h.p.desc}`).join('\n')
        : `No pages matched "${args.query}".`;
      return jsonrpc(id, { content: [{ type: 'text', text }] });
    }
    if (name === 'get_page') {
      const raw = String(args.page || '');
      const slug = raw.replace(/\.md$/, '').replace(/\/+$/, '').split('/').pop() || 'index';
      const res = await env.ASSETS.fetch(new URL(`/${slug}.md`, 'https://x'));
      if (!res.ok) {
        const idx = await getIndex(env);
        return jsonrpc(id, { content: [{ type: 'text', text: `No page "${raw}". Available: ${idx.map((p) => p.slug).join(', ')}` }] });
      }
      return jsonrpc(id, { content: [{ type: 'text', text: await res.text() }] });
    }
    return jsonrpc(id, { error: { code: -32602, message: `Unknown tool: ${name}` } });
  }
  if (method?.startsWith('notifications/')) return new Response(null, { status: 202 });
  return jsonrpc(id ?? null, { error: { code: -32601, message: `Method not found: ${method}` } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/mcp') return handleMcp(request, env);
    const accept = request.headers.get('accept') || '';
    const wantsMarkdown = accept.includes('text/markdown');
    const isAssetPath = path.startsWith('/_next') || /\.[a-z0-9]+$/i.test(path);
    if (wantsMarkdown && !isAssetPath) {
      const slug = path === '/' ? 'index' : path.replace(/\/+$/, '');
      const md = await env.ASSETS.fetch(new URL(`${slug}.md`, url.origin));
      if (md.ok) return md;
    }
    return env.ASSETS.fetch(request);
    return env.ASSETS.fetch(request);
  },
};
