import { readItem, readSingleton } from '@directus/sdk';
import type { Link } from 'astro-seo';
import type {
  ButtonType,
  CustomContentBlock,
  CustomContentItem,
  FeaturedArticle,
  HomepageContent,
  HomepageStats,
  LinkType,
  PageHero,
} from 'env';
import directus from '../../lib/directus';

export default async function getHomePageContent() {
  const content = await directus.request(
    readSingleton('Homepage', {
      fields: [
        'hero_content.item.*',
        'hero_content.item.buttons.*.*.*.*.*',
        'featured_case_study.*',
        'featured_links.*.*.*.*.*',
        'featured_projects.projects_id.*',
        'stats_and_callouts.item.*',
        'custom_content.*.*.*.*.*.*.*',
        'projects_background',
        'featured_article_background',
        'featured_article',
      ],
    })
  );

  const featuredArticlePromise = await directus.request(
    readItem('articles', content.featured_article.key, {
      fields: ['title', 'slug', 'type', 'hero.item.*.*'],
    })
  );

  const featuredArticle: FeaturedArticle = {
    id: content.featured_article.key,
    collection: content.featured_article.collection,
    title: featuredArticlePromise.title,
    slug: featuredArticlePromise.slug,
    type: featuredArticlePromise.type,
    heading: featuredArticlePromise.hero[0].item.heading,
    content: featuredArticlePromise.hero[0].item.content,
    image: featuredArticlePromise.hero[0].item.image.id,
    background_image: content.featured_article_background,
  };

  console.log(featuredArticle);

  const featuredLinks = content.featured_links.map(
    ({ block_link_id }: { block_link_id: LinkType }) => block_link_id
  );

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

  const buttons: ButtonType[] = content.hero_content[0].item.buttons.map(
    (button: any) => ({
      link: button.block_button_id.link,
      style: content.hero_content[0].item.hero_style,
      variant: button.block_button_id.variant,
    })
  );

  const homepageContent: HomepageContent = {
    heroStyle: content.hero_content[0].item.hero_style,
    heroHeadline: content.hero_content[0].item.heading,
    heroContent: content.hero_content[0].item.content,
    heroImage: content.hero_content[0].item.image,
    buttons: buttons,
    featuredLinks: featuredLinks,
    stats: stats,
    customContentBlock,
    projects_background_image: content.projects_background,
    featuredArticle,
  };

  return homepageContent;
}
