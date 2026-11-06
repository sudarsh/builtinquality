import rss from '@astrojs/rss';
import { articlesNewestFirst } from '../data/articles';

export function GET(context) {
  return rss({
    title: 'Qualiteye: Sudarsh M. Sathianathan',
    description: 'Articles on quality engineering, test automation and AI testing by Sudarsh M. Sathianathan.',
    site: context.site,
    items: articlesNewestFirst.map(a => ({
      title: a.title,
      description: a.excerpt,
      pubDate: new Date(a.datePublished),
      link: `/blog/${a.slug}`,
    })),
  });
}
