type MetaProps = {
  id: number;
  sort: string;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  slug: string;
}

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

export type ProjectFilterable = {
  id: number;
  name: string;
}

export type Type = ProjectFilterable
export type Feature = ProjectFilterable
export type Industry = ProjectFilterable
export type Language = ProjectFilterable

export type ProjectFilterKey = "features" | "industries" | "languages"

export type ProjectFilterOptions = {
  [key in ProjectFilterKey]: ProjectFilterable[];
}

export type ProjectFilterValues = {
  [key in ProjectFilterKey]: number[];
}