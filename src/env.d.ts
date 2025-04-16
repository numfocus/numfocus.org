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
export type Button = {
  text: string;
  link: string;
  variant:
    | 'primary'
    | 'primaryBlue'
    | 'secondary'
    | 'minimal'
    | 'muted'
    | 'newsletter'
    | 'donate';
};

// exported types

export type CaseStudy = MetaProps & {
  title: string;
  content: string;
};

type ProjectFilterKey = 'type' | 'features' | 'industries' | 'languages';

export type Project = CollectionEntry<'projects'>;

export type PageHero = MetaProps & {
  title: string;
  headline: string;
  subheader: string;
  rich_text: string;
  image: string;
  button: Button[];
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
  url: string | null;
};

export type HomepageContent = {
  heroHeadline: string;
  heroContent: string;
  heroImage: string;
  buttons: Button[];
  featuredLinks?: FeaturedLink[];
  featuredProjects?: Project[];
  featuredCaseStudy?: CaseStudy;
};
