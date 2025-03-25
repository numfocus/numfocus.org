import { getCollection } from 'astro:content';
import directus from '../../lib/directus';
import { readItems } from '@directus/sdk';
import slugify from 'slugify';

import type { CommandPaletteItem } from 'env';

// we create our main object as qn empty array
let allData: CommandPaletteItem[] = [];

// we pull local Astro content for projects
const projects = await getCollection('projects');

// transform it into comand palette objects and push to allData
for (let project of projects) {
  const item: CommandPaletteItem = {
    id: project.id,
    title: project.data.name,
    path: slugify(project.data.name, { lower: true }),
    category: project.collection,
  };
  allData.push(item);
}

// we pull all pages
const pages = await directus.request(
  readItems('pages', {
    fields: ['id', 'title', 'slug'],
  })
);

// and push them to allData
for (let page of pages) {
  const item: CommandPaletteItem = {
    id: page.id,
    title: page.title,
    path: page.slug,
    category: 'Pages',
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

export default function getCommandPaletteData() {
  return allData;
}
