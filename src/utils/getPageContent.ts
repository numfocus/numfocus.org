import { readItems } from '@directus/sdk';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import directus from '../../lib/directus';

export default async function getPageContent() {
  const result = await directus.request(
    readItems('pages', {
      // filter: {
      //   "slug": {
      //     "_eq": slug
      //   }
      // },
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

  console.log(result)

  if (result) {
    return result.map(page => {
      if (page.body_content) {
        return ({
          ...page,
          body_content: injectDataIntoContent(page.editor_nodes, page.body_content)
        })
      } else {
        return page
      }
      })
  } else {
    return null
    // TODO: meaningfully handle missing page content error?
  }
}
