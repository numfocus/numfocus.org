import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { CardMeta } from 'env';

const general = await directus.request(readSingleton('General'));

//  only show drafts when in dev
const isDev = import.meta.env.DEV;
const contentToShow = isDev ? ['published', 'draft'] : ['published'];

export async function getArticlesMeta() {
  const responses = await directus.request(
    readItems('articles', {
      filter: {
        status: {
          _in: contentToShow,
        },
      },
      fields: [
        'id',
        'title',
        'slug',
        'type',
        'hero.item.heading',
        'hero.item.content',
        'hero.item.image',
        'date_created',
        'hero_style',
        'headline',
        'rich_text',
        'image',
      ],
      sort: ['-date_created'],
    })
  );
  const articles: CardMeta[] = responses.map((res) => ({
    id: res.id,
    title: res.title,
    type: res.type,
    slug: `${res.slug}/`,
    heading: res.headline,
    content: res.rich_text,
    date: new Date(res.date_created),
    image: res.image ? `${res.image}` : `${general.seo.og_image}`,
  }));

  return articles;
}
