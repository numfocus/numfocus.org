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

type PersonRole = 'board' | 'steering_committee' | 'staff' | 'coc_working_group' | 'advisory_council';

export type Person = {
  id: number,
  first_name: string;
  last_name: string;
  image: string;
  role: PersonRole;
  title: string;
  bio: string;
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
  link: string;
};

export type HomepageContent = {
  heroHeadline: string;
  heroContent: string;
  heroImage: string;
  heroStyle: 'light' | 'dark';
  buttons: ButtonType[];
  featuredLinks?: FeaturedLink[];
  featuredProjects?: Project[];
  featuredCaseStudy?: CaseStudy;
  stats?: HomepageStats[];
  customContentBlock: CustomContentItem[];
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
  slug: string;
  image: string;
  content: string;
};
