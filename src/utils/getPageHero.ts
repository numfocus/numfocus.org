import { readItems } from '@directus/sdk';
import type { Button, PageHero } from 'env';
import directus from '../../lib/directus';

export default async function getPageHero(slug: string) {
  const heroContent = await directus.request<PageHero[]>(readItems('pages'));

  const pageHero = heroContent.filter((e) => e.slug === slug)[0];

  pageHero.button?.map((button) => (button.style = pageHero.hero_style));
  console.log(pageHero);
  return pageHero;
}
