import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('docs');
  return rss({
    title: 'legwiki',
    description: 'compass for myself.',
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: `${post.data.date}`,
      link: `/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
