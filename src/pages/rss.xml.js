import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('docs');
  return rss({
    title: 'legwiki',
    description: 'compass for myself.',
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: `${post.data.date}`,
      link: `/blog/${post.slug}/`,
    })),
  });
}
