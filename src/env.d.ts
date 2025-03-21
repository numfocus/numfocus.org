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
  variant: 'primary' | 'secondary' | 'muted' | 'newsletter' | 'donate';
};

type ProjectFilterKey = 'type' | 'features' | 'industries' | 'languages';

// exported types

export type CaseStudy = MetaProps & {
  title: string;
  content: string;
};

export type Project = MetaProps & {
  name: string;
  long_description?: string;
  short_description?: string;
  type: string;
  website_link?: string;
  logo?: string;
  support_year_start?: number;
  features?: number[];
  industries?: number[];
  languages?: number[];
};

export type PageHero = MetaProps & {
  title: string;
  headline: string;
  subheader: string;
  rich_text: string;
  image: string;
  button: Button[];
};

export type ProjectFilterOptionId = number | string;

export type ProjectFilterable = {
  id: ProjectFilterId;
  name: string;
};

export type Feature = ProjectFilterable;
export type Industry = ProjectFilterable;
export type Language = ProjectFilterable;

export type ProjectFilterOptions = {
  [key in ProjectFilterKey]?: ProjectFilterable[];
};

export type ProjectFilterValues = {
  [key in ProjectFilterKey]: ProjectFilterOptionId[];
};

export type MenuItem = {
  title: string;
  path: string;
};
