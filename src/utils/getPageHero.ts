import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import type { ButtonType, PageHero } from 'env';

export default async function getPageHero(slug: string) {
  const heroContent = await directus.request<PageHero[]>(
    readItems('pages', {
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: ['buttons.*.*.*.*.*.*', '*'],
    })
  );

  // remove array of 1
  const pageHero = heroContent[0];

  // Safely map buttons if they exist
  pageHero.buttons =
    pageHero.buttons?.map(
      ({ block_button_id }: { block_button_id: ButtonType }) => ({
        style: pageHero.hero_style,
        variant: block_button_id?.variant || 'default',
        link: block_button_id?.link || '#',
      })
    ) || [];

  return pageHero;
}
