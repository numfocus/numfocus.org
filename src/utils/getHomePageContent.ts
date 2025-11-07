import directus from '@directus/directus';
import { readItem, readSingleton } from '@directus/sdk';
import type {
  ButtonType,
  CustomContentBlock,
  CustomContentItem,
  FeaturedArticle,
  HomepageContent,
  HomepageStats,
  Image,
  LinkType,
} from 'env';
import fetchRemoteImage from './fetchRemoteImage';

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
        'featured_projects.*',
        'image_gallery.*.*.*',
      ],
    })
  );

  // console.log(content.image_gallery)

  const featuredArticlePromise = await directus.request(
    readItem('articles', content.featured_article.key, {
      fields: ['title', 'slug', 'type', 'headline', 'rich_text', 'image'],
    })
  );

  const featuredArticle: FeaturedArticle = {
    id: content.featured_article.key,
    collection: content.featured_article.collection,
    title: featuredArticlePromise.title,
    slug: featuredArticlePromise.slug,
    type: featuredArticlePromise.type,
    heading: featuredArticlePromise.headline,
    content: featuredArticlePromise.rich_text,
    image: featuredArticlePromise.image,
    background_image: content.featured_article_background,
  };

  // console.log(featuredArticle);

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
    }) => {
      return new Promise((resolve) => {
        const { image, ...rest } = block_custom_content_item_id;
        fetchRemoteImage(image).then((fetchedImage) => {
          resolve({ ...rest, image: fetchedImage });
        });
      });
    }
  );

  const customContentBlock: CustomContentBlock = {
    title: content.custom_content.title,
    items: await Promise.all(customContentBlockItems),
  };

  const featuredProjects: string[] = content.featured_projects.map(
    ({ item }: { item: string }) => item
  );

  const buttons: ButtonType[] = content.hero_content[0].item.buttons.map(
    (button: any) => ({
      link: button.block_button_id.link,
      style: content.hero_content[0].item.hero_style,
      variant: button.block_button_id.variant,
    })
  );

  // safely retrieve image gallery items
  const imageGalleryItems = content.image_gallery[0]?.images.map(
    ({ directus_files_id }: { directus_files_id: Image }) => {
      return fetchRemoteImage(directus_files_id);
    }
  );

  // if no gallery items, return empty array
  const imageGallery = imageGalleryItems
    ? await Promise.all(imageGalleryItems)
    : [];

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
    homepageProjects: featuredProjects,
    imageGallery,
  };

  return homepageContent;
}
