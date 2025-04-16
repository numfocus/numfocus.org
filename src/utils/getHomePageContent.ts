import type { FeaturedLink, HomepageContent, PageHero } from 'env';
import directus from '../../lib/directus';
import { readSingleton } from '@directus/sdk';

export default async function getHomePageContent() {
  const content = await directus.request(
    readSingleton('Homepage', {
      fields: [
        'hero_content.item.*',
        'featured_case_study.*',
        'featured_links.item.*.*.*.*.*',
        'featured_projects.projects_id.*',
      ],
    })
  );

  let featuredLinks: FeaturedLink[] = [];
  content.featured_links.map((link: any) => {
    console.log(link.item.internal_link[0]?.item.slug);
    let url =
      link.item.type_of_link === 'internal'
        ? link.item.internal_link[0].item.slug
        : link.item.external_link;
    let l: FeaturedLink = {
      text: link.item.text,
      type: link.item.type_of_link,
      url: url,
    };
    featuredLinks.push(l);
  });

  const homepageContent: HomepageContent = {
    heroHeadline: content.hero_content[0].item.heading,
    heroContent: content.hero_content[0].item.content,
    heroImage: content.hero_content[0].item.image,
    buttons: content.hero_content[0].item.button,
    featuredLinks: featuredLinks,
  };

  return homepageContent;
}
