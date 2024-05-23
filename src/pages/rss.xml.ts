import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context: AstroConfig) {
  const blogList = await getCollection('blog');

  return rss({
    title: 'The Sandwich blog',
    description: 'All sandwich news. All the time.',
    site: context.site!,
    items: blogList.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
