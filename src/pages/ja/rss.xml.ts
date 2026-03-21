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
    getCollection('log-ja', (p) => !p.data.draft),
  ]);

  const eventItems: Item[] = events.map((e) => ({
    title: 'イベントのお知らせ',
    description: [e.data.location, e.data.venue, e.data.title]
      .filter(Boolean)
      .join(' / ') || undefined,
    link: `/ja/events#${e.slug}`,
    pubDate: e.data.date,
    categories: ['Event'],
  }));

  const gardenItems: Item[] = garden.map((g) => {
    const displayName = g.data.name ?? g.data.name_en;

    return {
      title: '新たな芽が追加されました',
      description: `名前: ${displayName}`,
      link: `/ja/garden-307#${g.slug}`,
      pubDate: g.data.date,
      categories: ['Garden'],
    };
  });

  const logItems: Item[] = logsJa.map((p) => ({
    title: p.data.title,
    description: p.data.summary,
    link: `/ja/log/${p.slug}`,                   // ★詳細ページ
    pubDate: p.data.date,
    categories: ['Log', 'ja'],
  }));

  const items = [...eventItems, ...gardenItems, ...logItems]
    .sort(sortItems)
    .slice(0, 50);

  return rss({
    title: 'PochomLab RSS (JA)',
    description: 'Events / 307の庭 / Log の更新情報（日本語）',
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
