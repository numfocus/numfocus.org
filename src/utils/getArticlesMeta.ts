import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { CardMeta } from 'env';
const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;

const directusAssetUrl = `${DIRECTUS_URL}assets/`;

const general = await directus.request(readSingleton('General'));

export async function getArticlesMeta() {
  const responses = await directus.request(
    readItems('articles', {
      fields: [
        'id',
        'title',
        'slug',
        'type',
        'hero.item.heading',
        'hero.item.content',
        'hero.item.image',
        'date_created',
      ],
    })
  );
  const articles: CardMeta[] = responses.map((res) => ({
    id: res.id,
    title: res.title,
    type: res.type,
    slug: `${res.slug}/`,
    heading: res.hero[0].item.heading,
    content: res.hero[0].item.content,
    date: new Date(res.date_created),
    image: res.hero[0].item.image
      ? `${directusAssetUrl}/${res.hero[0].item.image}`
      : `${directusAssetUrl}/${general.seo.og_image}`,
  }));

  return articles;
}
