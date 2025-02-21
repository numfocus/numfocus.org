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

export type ProjectFilterKey = "features" | "industries" | "languages"

export type ProjectFilterable = {
  id: number;
  name: string;
}

export type Feature = ProjectFilterable
export type Industry = ProjectFilterable
export type Language = ProjectFilterable

export type ProjectFilterOptions = {
  features: Feature[];
  industries: Industry[];
  languages: Language[];
}

export type ProjectFilterValues = {
  features: number[];
  industries: number[];
  languages: number[];
}