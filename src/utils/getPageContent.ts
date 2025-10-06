import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import fetchFlexibleEditorImages from '@utils/fetchFlexibleEditorImages';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';

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
        'parent.*.*.*.*.*',
        { editor_nodes: ['*.*.*.*.*.*.*.*'] },
      ],
    })
  );
  const page = result?.[0];

  if (page) {
    const editorNodes = await fetchFlexibleEditorImages(page);
    return injectDataIntoContent(editorNodes, page.body_content);
  }
}
