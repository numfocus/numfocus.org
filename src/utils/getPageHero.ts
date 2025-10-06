import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import type { ButtonType, PageHero } from 'env';

export default async function getPageHero(slug: string) {
  const heroContent = await directus.request<PageHero[]>(
    readItems('pages', {
      fields: ['buttons.*.*.*.*.*.*', '*'],
    })
  );

  // Find the first matching hero by slug
  // const pageHero = heroContent.find((e) => e.slug === slug);
  const pageHero = heroContent.filter((e) => e.slug === slug)[0];

  // If nothing found, return null instead of throwing
  // if (!pageHero) {
  //   return null;
  // }

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
