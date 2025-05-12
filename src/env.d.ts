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
export type ButtonType = {
  text: string;
  link: string;
  style: 'light' | 'dark';
  variant: 'default' | 'outlined' | 'special';
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
  button?: ButtonType[];
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

export type FeaturedLink = {
  text: string;
  type: 'internal' | 'external';
  url: string;
};

type HomepageStats = {
  category: string;
  mainContent: string;
  description: string;
  url: string | null;
};

export type CustomContentItem = {
  id: number;
  text: string;
  image: string;
  external_link: string;
  internal_link: any;
  type_of_link: 'internal' | 'external';
  short_description: string;
};

export type CustomContentBlock = {
  title: string;
  items: CustomContentItem[];
};

export type HomepageContent = {
  heroHeadline: string;
  heroContent: string;
  heroImage: string;
  heroStyle: 'light' | 'dark';
  buttons: ButtonLink[];
  featuredLinks?: FeaturedLink[];
  featuredProjects?: Project[];
  featuredCaseStudy?: CaseStudy;
  stats?: HomepageStats[];
  customContentBlock: CustomContentBlock;
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

export type ButtonLink = {
  id: string; // [hero_content.item].buttons.block_button_id.id
  style: 'light' | 'dark'; // passed from parent component
  variant: 'default' | 'outlined' | 'special'; // [hero_content.item].buttons.block_button_id.variant
  link: LinkType;
};

export type LinkType = {
  text: string; // [hero_content.item].buttons.block_button_id.link.text
  type_of_link: 'internal' | 'external'; // [hero_content.item].buttons.block_button_id.link.type_of_link
  external_link?: string; // [hero_content.item].buttons.block_button_id.link.external_link
  internal_link_slug?: string; // [hero_content.item].buttons.block_button_id.link.internal_link.item.slug
  internal_link_parent?: string; // [hero_content.item].buttons.block_button_id.link.internal_link.item.parent
};
