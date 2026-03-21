import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

// ここを追加（loader無し）
const logCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(), 
    author: z.string(),          
    draft: z.boolean().default(false),
  }),
});

const garden307 = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),                 // 表示名（エショナー名）
    name_en: z.string().optional(),   // 表示名（エショナー名）    
    description: z.string().optional(),// 一言紹介
    comment: z.string().optional(),   // ← 追加
    avatar: z.string().optional(),     // /images/... など
    role: z.string().optional(),       // 絵書作者 / 参加者など（任意）
    links: z.object({
      site: z.string().url().optional(),
      x: z.string().url().optional(),
    }).optional(),
    order: z.number().optional(),      // 並び順（任意）
    date: z.date(),                   // ★追加（RSS用） 
    draft: z.boolean().default(false),     // 下書き（任意）
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),                   // 登録日
    startDate: z.date(),              // 開催日（開始日）
    endDate: z.date().optional(),     // 複数日なら
    timezone: z.string().optional(),  // "Asia/Tokyo" など
    location: z.string().optional(),  // 会場名＋都市
    venue: z.string().optional(),     // ブース/ホール等
    type: z.enum(['zine', 'online', 'release', 'talk', 'other']).default('other'),
    cover: z.string().optional(),     // /images/... へのパス
    tags: z.array(z.string()).default([]),

    // 外部リンク（任意）
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ).default([]),

    // 何を頒布/告知するか（任意）
    lineup: z.array(z.string()).default([]),
    author: z.string(),    
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  post: postCollection,
  'log-ja': logCollection,
  'log-en': logCollection,
  'garden307': garden307,
  'events': events,
};
