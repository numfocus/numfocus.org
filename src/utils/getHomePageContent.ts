import { readSingleton } from '@directus/sdk';
import type {
  ButtonLink,
  ButtonType,
  CustomContentBlock,
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
        'hero_content.item.buttons.block_button_id.*.*.*',
        'featured_case_study.*',
        'featured_links.*.*.*.*.*',
        'featured_projects.projects_id.*',
        'stats_and_callouts.item.*',
        'custom_content.*.*.*.*.*.*',
      ],
    })
  );

  const featuredLinks: FeaturedLink[] = [];
  content.featured_links.map((link: any) => {
    const url =
      link.block_link_id.type_of_link === 'internal'
        ? link.block_link_id.internal_link[0].item.slug
        : link.block_link_id.external_link;
    const l: FeaturedLink = {
      text: link.block_link_id.text,
      type: link.block_link_id.type_of_link,
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

  const customContentBlockItems = content.custom_content.items?.map(
    ({
      block_custom_content_item_id,
    }: {
      block_custom_content_item_id: CustomContentItem;
    }) => block_custom_content_item_id
  );

  const customContentBlock: CustomContentBlock = {
    title: content.custom_content.title,
    items: customContentBlockItems,
  };

  // const buttons: ButtonLink[] = content.hero_content[0].item.buttons.map(
  //   (button) => ({
  //     text: button.link.text,
  //     link: button.link,
  //     style: content.hero_content[0].item.hero_style,
  //     variant: button.block_button_id.variant,
  //   })
  // );

  const buttons: ButtonLink[] = content.hero_content[0].item.buttons.map(
    (button: any) => ({
      id: button.block_button_id.id,
      link: {
        text: button.block_button_id.link.text,
        type_of_link: button.block_button_id.link.type_of_link,
        external_link: button.block_button_id.link?.external_link,
        internal_link_slug:
          button.block_button_id.link?.internal_link?.item?.slug,
        internal_link_parent:
          button.block_button_id.link?.internal_link?.item?.parent,
      },
      style: content.hero_content[0].item.hero_style,
      variant: button.block_button_id.variant,
    })
  );

  // console.log(buttons);

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
