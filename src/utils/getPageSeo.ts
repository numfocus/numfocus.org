import { readItems, readSingleton } from '@directus/sdk';
import type { Seo } from 'env';
import directus from '../../lib/directus';

export default async function getPageSeo(slug: string) {
  const general = await directus.request(readSingleton('General'));
  const payload = await directus.request(readItems('pages'));
  const content = payload.filter((e) => e.slug === slug)[0];
  const pageSeo: Seo = {
    title: content?.seo?.title ? content.seo.title : '',
    meta_description: content?.seo?.meta_description
      ? content.seo.meta_description
      : '',
    og_image: content?.seo?.og_image
      ? content.seo.og_image
      : general.seo.og_image,
  };
  return pageSeo;
}
