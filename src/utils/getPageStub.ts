import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';

export default async function getPageStub(slug: string) {
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
        'slug'
      ],
    })
  );
  return result?.[0];
}
