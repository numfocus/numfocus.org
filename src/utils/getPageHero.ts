import { readItems } from '@directus/sdk';
import type { ButtonType, PageHero } from 'env';
import directus from '../../lib/directus';

export default async function getPageHero(slug: string) {
  const heroContent = await directus.request<PageHero[]>(
    readItems('pages', {
      fields: ['buttons.*.*.*.*.*', '*'],
    })
  );

  const pageHero = heroContent.filter((e) => e.slug === slug)[0];

  pageHero.buttons = pageHero.buttons?.map(
    ({ block_button_id }: { block_button_id: ButtonType }) => ({
      style: pageHero.hero_style,
      variant: block_button_id.variant,
      link: block_button_id.link,
    })
  );

  // console.log(pageHero.buttons)

  // button.style = pageHero.hero_style;
  // button.link = button.block_button_id.link;);
  // console.log(pageHero);
  return pageHero;
}
