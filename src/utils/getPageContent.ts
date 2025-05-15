import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import injectFlexibleEditorContent from './injectFlexibleEditorContent';

export default async function getPageContent(slug: string) {
  const result = await directus.request(
    readItems('pages', {
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: [
        'id',
        'title',
        'slug',
        'body_content',
        'editor_nodes.id',
        'editor_nodes.collection',
        { editor_nodes: ['*.*.*.*.*.*'] },
      ],
    })
  );
  const page = result?.[0];

  if (page) {
    return await injectFlexibleEditorContent(page)
  }
}
