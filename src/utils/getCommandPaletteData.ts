import { getCollection } from 'astro:content';
import directus from '../../lib/directus';
import { readItems } from '@directus/sdk';
import { getArticlesMeta } from './getArticlesMeta';

import type { CommandPaletteItem } from 'env';

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;

const directusAssetUrl = `${DIRECTUS_URL}assets/`;

// we create our main object as qn empty array
let allData: CommandPaletteItem[] = [];

// we pull local Astro content for projects
const projects = await getCollection('projects');

// transform it into comand palette objects and push to allData
for (let project of projects) {
  const item: CommandPaletteItem = {
    id: project.id,
    title: project.data.name,
    path: `/projects/?project=${project.id}`,
    category: project.collection,
    description: project.data.short_description,
    img: project.data.logo.src,
  };
  allData.push(item);
}

// we pull all pages
const pages = await directus.request(
  readItems('pages', {
    fields: ['id', 'title', 'slug', 'headline', 'image'],
  })
);

// and push them to allData
for (let page of pages) {
  const item: CommandPaletteItem = {
    id: page.id,
    title: page.title,
    path: page.slug,
    description: page.headline,
    category: 'Pages',
    img: `${directusAssetUrl}/${page.image}?width=100`,
  };
  allData.push(item);
}

const caseStudies = await directus.request(
  readItems('case_studies', {
    fields: ['id', 'title', 'slug'],
  })
);

for (let caseStudy of caseStudies) {
  const item: CommandPaletteItem = {
    id: caseStudy.id,
    title: caseStudy.title,
    path: caseStudy.slug,
    category: 'Case Studies',
  };
  allData.push(item);
}

const articles = await getArticlesMeta();
for (let article of articles) {
  const item: CommandPaletteItem = {
    id: article.id,
    title: article.heading,
    path: article.slug,
    category: 'Articles',
    img: `${article.image}?width=100`,
  };
  allData.push(item);
}

export default function getCommandPaletteData() {
  return allData;
}
