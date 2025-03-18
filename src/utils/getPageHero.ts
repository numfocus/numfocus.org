import type { PageHero } from 'env';
import directus from '../../lib/directus';
import { readItems } from '@directus/sdk';

export default async function getPageHero(slug: string) {
  const heroContent = await directus.request<PageHero[]>(readItems('pages'));

  const pageHero: PageHero = heroContent.filter((e) => e.slug === slug)[0];
  return pageHero;
}
