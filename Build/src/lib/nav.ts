import { getCollection } from "astro:content";

export interface NavNode {
  title: string;
  href: string;
  order: number;
  children: NavNode[];
}

const parentOf = (slug: string) => slug.split("/").slice(0, -1).join("/");

const byOrderTitle = (a: NavNode, b: NavNode) =>
  a.order - b.order || a.title.localeCompare(b.title);

/** Build the portfolio navigation tree from the content collection. */
export async function buildNav(): Promise<NavNode[]> {
  const entries = (await getCollection("portfolio")).filter(
    (entry) => entry.slug !== "home",
  );

  const nodesByPath = new Map<string, NavNode>();
  const top: NavNode[] = [];

  for (const entry of entries) {
    nodesByPath.set(entry.slug, {
      title: entry.data.title,
      href: `/${entry.slug}/`,
      order: entry.data.order,
      children: [],
    });
  }

  for (const entry of entries) {
    const node = nodesByPath.get(entry.slug)!;
    const parent = parentOf(entry.slug);
    if (!parent) {
      top.push(node);
    } else {
      nodesByPath.get(parent)?.children.push(node);
    }
  }

  const sort = (nodes: NavNode[]) => {
    nodes.sort(byOrderTitle);
    nodes.forEach((n) => sort(n.children));
    return nodes;
  };

  return [
    { title: "Home", href: "/", order: 0, children: [] },
    ...sort(top),
  ];
}