export type SidebarItem = { title: string; href: string };
export type SidebarGroup = { title: string; items: SidebarItem[] };

export const sidebar: SidebarGroup[] = [
  {
    title: 'Start',
    items: [
      { title: 'Introduction', href: '/docs/' },
      { title: 'Getting started', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Using Aster',
    items: [
      { title: 'Chat', href: '/docs/chat' },
      { title: 'Sessions', href: '/docs/sessions' },
      { title: 'Permissions', href: '/docs/permissions' },
      { title: 'Memory', href: '/docs/memory' },
    ],
  },
  {
    title: 'Extending',
    items: [
      { title: 'Skills', href: '/docs/skills' },
      { title: 'Plugins', href: '/docs/plugins' },
      { title: 'MCP servers', href: '/docs/mcp' },
      { title: 'Web', href: '/docs/web' },
    ],
  },
  {
    title: 'Automation',
    items: [
      { title: 'Sub-agents', href: '/docs/agents' },
      { title: 'Schedules', href: '/docs/schedules' },
      { title: 'Remote control', href: '/docs/remote' },
      { title: 'Goals', href: '/docs/goals' },
    ],
  },
  {
    title: 'Workflows',
    items: [
      { title: 'Review', href: '/docs/review' },
      { title: 'Fix', href: '/docs/fix' },
      { title: 'Surfaces', href: '/docs/surfaces' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Configuration', href: '/docs/configuration' },
      { title: 'CLI commands', href: '/docs/cli' },
      { title: 'Environment variables', href: '/docs/env' },
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
    ],
  },
];

export const flatSidebar: SidebarItem[] = sidebar.flatMap((g) => g.items);

export function neighbors(pathname: string): { prev?: SidebarItem; next?: SidebarItem } {
  const path = pathname.endsWith('/') && pathname !== '/docs/'
    ? pathname.slice(0, -1)
    : pathname;
  const i = flatSidebar.findIndex((item) => item.href === path);
  if (i === -1) return {};
  return { prev: flatSidebar[i - 1], next: flatSidebar[i + 1] };
}
