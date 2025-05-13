import type { CollectionEntry } from 'astro:content';

// core definitions
interface MetaProps {
  id: number;
  sort?: string;
  status?: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  slug?: string;
}

export type Page = MetaProps & {
  title: string;
  parent?: Page;
};

// primitives

// BUTTON LINK TYPES
///////////////////////////////////////////
// This is the Button collection that includes a link component that can be mapped
// to internal or external links. Internal links give us both slug and parent.
// important for properly mapping urls.
// KEEP IN MIND that any of the link specific values could be null,
// so best way to pull from directus is with wildcards, for example
// [XYZ].buttons.block_button_id.link.*
// and
// [XYZ].buttons.block_button_id.link.internal_link.item.*
///////////////////////////////////////////

export type ButtonType = {
  link: LinkType;
  style: 'light' | 'dark';
  variant: 'default' | 'outlined' | 'special';
};

type InternalLinkPage = {
  collection?: string;
  item: Page;
};

export type LinkType = {
  text?: string;
  type_of_link: 'internal' | 'external';
  external_link?: string;
  internal_link?: InternalLinkPage[];
  slug?: string;
};

// exported types

export type Article = MetaProps & {
  title: string;
  content: string;
};

type PersonRole =
  | 'board'
  | 'steering_committee'
  | 'staff'
  | 'coc_working_group'
  | 'advisory_council';

type SocialsType = {
  platform:
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'x'
    | 'bluesky'
    | 'youtube'
    | 'mastodon'
    | 'github'
    | 'email'
    | 'custom_website';
  url: string;
};

export type Person = {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  role: PersonRole;
  title: string;
  bio: string;
  socials?: SocialsType[];
};

type SponsorType =
  | 'principal'
  | 'sustaining'
  | 'contributing'
  | 'community'
  | 'startup';

export type Sponsor = {
  id: number;
  name: string;
  logo: string;
  type: SponsorType;
  description: string;
  url: string;
};

type ProjectFilterKey = 'type' | 'features' | 'industries' | 'languages';

export type Project = CollectionEntry<'projects'>;

export type PageHero = MetaProps & {
  title: string;
  headline: string;
  subheader?: string;
  rich_text: string;
  image: string;
  hero_style: 'light' | 'dark';
  buttons?: ButtonType[];
};

export type ProjectFilterOptions = {
  [key in ProjectFilterKey]?: string[];
};

export type ProjectFilterValues = {
  [key in ProjectFilterKey]: string[];
};

export type MenuItem = {
  title: string;
  path: string;
};

export type CommandPaletteItem = {
  id: string;
  title: string;
  path: string;
  category: string;
  description?: string;
  img?: string;
};

export type BlockProject = {
  name: string;
  logo: string;
  slug: string;
  description: string;
};

export type Image = {
  description: string;
  id: string;
  title: string;
};

type HomepageStats = {
  category: string;
  mainContent: string;
  description: string;
  url: string | null;
};

export type CustomContentItem = {
  id: number;
  image: Image;
  short_description: string;
  link: LinkType;
};

export type CustomContentBlock = {
  title: string;
  items: CustomContentItem[];
};

export type FeaturedArticle = {
  id: number;
  collection: string;
  title: string;
  slug: string;
  type: string;
  heading: string;
  content: string;
  image: string;
  background_image: string;
};

export type HomepageContent = {
  heroHeadline: string;
  heroContent: string;
  heroImage: string;
  heroStyle: 'light' | 'dark';
  buttons: ButtonType[];
  featuredLinks?: LinkType[];
  featuredProjects?: Project[];
  featuredCaseStudy?: CaseStudy;
  stats?: HomepageStats[];
  customContentBlock: CustomContentBlock;
  projects_background_image: string;
  featuredArticle: FeaturedArticle;
  homepageProjects: string[];
};

export type Seo = {
  title: string;
  meta_description: string;
  og_image?: string;
};

export type CardMeta = {
  id: string;
  title: string;
  heading: string;
  type?: string;
  slug: string;
  image: string;
  content: string;
  date: Date;
};
