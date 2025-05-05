import { readSingleton } from '@directus/sdk';
import type {
  Button,
  CustomContentItem,
  FeaturedLink,
  HomepageContent,
  HomepageStats,
  PageHero,
} from 'env';
import directus from '../../lib/directus';

export default async function getHomePageContent() {
  const content = await directus.request(
    readSingleton('Homepage', {
      fields: [
        'hero_content.item.*',
        'featured_case_study.*',
        'featured_links.item.*.*.*.*.*',
        'featured_projects.projects_id.*',
        'stats_and_callouts.item.*',
        'custom_content.*.*',
      ],
    })
  );

  const featuredLinks: FeaturedLink[] = [];
  content.featured_links.map((link: any) => {
    console.log(link.item.internal_link[0]?.item.slug);
    const url =
      link.item.type_of_link === 'internal'
        ? link.item.internal_link[0].item.slug
        : link.item.external_link;
    const l: FeaturedLink = {
      text: link.item.text,
      type: link.item.type_of_link,
      url: url,
    };
    featuredLinks.push(l);
  });

  const stats: HomepageStats[] = content.stats_and_callouts.map((stat: any) => {
    const singleStat: HomepageStats = {
      category: stat.item.category,
      mainContent: stat.item.main_content,
      description: stat.item.description,
      url: stat.item.url,
    };
    return singleStat;
  });

  const customContentBlock = content.custom_content.map(
    ({ item }: { item: CustomContentItem }) => item
  );

  console.log(customContentBlock);

  const buttons: Button[] = content.hero_content[0].item.button.map(
    (button: Button) => ({
      text: button.text,
      link: button.link,
      style: content.hero_content[0].item.hero_style,
      variant: button.variant,
    })
  );
  console.log(buttons);

  const homepageContent: HomepageContent = {
    heroStyle: content.hero_content[0].item.hero_style,
    heroHeadline: content.hero_content[0].item.heading,
    heroContent: content.hero_content[0].item.content,
    heroImage: content.hero_content[0].item.image,
    buttons: buttons,
    featuredLinks: featuredLinks,
    stats: stats,
    customContentBlock,
  };

  return homepageContent;
}
