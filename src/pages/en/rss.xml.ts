import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

type Item = {
  title: string;
  description?: string;
  link: string;
  pubDate: Date;
  categories: string[];
};

function rank(it: Item) {
  if (it.categories.includes('Event')) return 0;
  if (it.categories.includes('Garden')) return 1;
  return 2; // Log
}

function sortItems(a: Item, b: Item) {
  const d = b.pubDate.getTime() - a.pubDate.getTime();
  if (d !== 0) return d;
  return rank(a) - rank(b);
}

export async function GET(context: { site: URL }) {
  const site = context.site;

  const [events, garden, logsJa] = await Promise.all([
    getCollection('events', (e) => !e.data.draft),
    getCollection('garden307', (g) => !g.data.draft),
    getCollection('log-en', (p) => !p.data.draft),
  ]);

  const eventItems: Item[] = events.map((e) => ({
    title: 'Event announcement',
    description: [e.data.location, e.data.venue, e.data.title]
      .filter(Boolean)
      .join(' / ') || undefined,
    link: `/en/events#${e.slug}`,
    pubDate: e.data.date,
    categories: ['Event'],
  }));

  const gardenItems: Item[] = garden.map((g) => {
    const displayName = g.data.name_en ?? g.data.name;

    return {
      title: 'New sprout added',
      description: `Name: ${displayName}`,
      link: `/en/garden-307#${g.slug}`,
      pubDate: g.data.date,
      categories: ['Garden'],
    };
  });

  const logItems: Item[] = logsJa.map((p) => ({
    title: p.data.title,
    description: p.data.summary,
    link: `/en/log/${p.slug}`,
    pubDate: p.data.date,
    categories: ['Log', 'en'],
  }));

  const items = [...eventItems, ...gardenItems, ...logItems]
    .sort(sortItems)
    .slice(0, 50);

  return rss({
    title: 'PochomLab RSS (EN)',
    description: 'Events / Garden-307 / Log updates (English)',
    site,
    items: items.map((i) => ({
      title: i.title,
      description: i.description,
      link: i.link,
      pubDate: i.pubDate,
      categories: i.categories,
    })),
  });
}
