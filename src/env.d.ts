import type { CollectionEntry } from "astro:content";

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
  variant: 'primary' | 'secondary' | 'minimal' | 'muted' | 'newsletter' | 'donate';
};

// exported types

export type CaseStudy = MetaProps & {
  title: string;
  content: string;
};

type ProjectFilterKey = 'type' | 'features' | 'industries' | 'languages';

export type Project = CollectionEntry<"projects">

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
