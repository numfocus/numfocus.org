import { readItems } from '@directus/sdk';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import directus from '../../lib/directus';

export default async function getPageContent(slug: string) {
  const result = await directus.request(
    readItems('pages', {
      filter: {
        "slug": {
          "_eq": slug
        }
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
    return injectDataIntoContent(page.editor_nodes, page.body_content)
  } else {
    // TODO: meaningfully handle missing page content error?
  }
}
