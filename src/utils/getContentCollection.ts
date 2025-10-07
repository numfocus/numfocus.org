import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';

//  only show drafts when in dev
const isDev = import.meta.env.DEV;
const contentToShow = isDev ? ['published', 'draft'] : ['published'];

export default async function getContentCollection(collection: string) {
  const pages = await directus.request(
    readItems(collection, {
      filter: {
        status: {
          _in: contentToShow,
        },
      },
      fields: [
        'id',
        'title',
        'slug',
        'body_content',
        'editor_nodes.id',
        'editor_nodes.collection',
        'hero.item.heading',
        'hero.item.content',
        'hero.item.image',
        'seo',
        'parent.*.*.*.*.*',
        { editor_nodes: ['*.*.*.*.*.*.*.*'] },
      ],
    })
  );
  return pages;
}
