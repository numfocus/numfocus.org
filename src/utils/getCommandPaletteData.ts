import { getCollection } from 'astro:content';
import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import { getArticlesMeta } from './getArticlesMeta';
import getPagePath from './getPagePath';

import type { CommandPaletteItem, Page, Person } from 'env';
import { fetchRemoteImageById } from './fetchRemoteImage';
import getPeople from './getPeople';

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;


// we create our main object as qn empty array
let allData: CommandPaletteItem[] = [];

// we pull local Astro content for projects
const projects = await getCollection('projects');

// transform it into comand palette objects and push to allData
for (const project of projects) {
  const item: CommandPaletteItem = {
    id: project.id,
    title: project.data.name,
    path: `projects/?project=${project.id}`,
    category: project.collection,
    description: project.data.short_description,
    img: project.data.logo.src,
  };
  allData.push(item);
}

// we pull all pages
const pages = await directus.request(
  readItems('pages', {
    fields: ['id', 'title', 'slug', 'headline', 'image', 'parent.*'],
  })
);

const pagesWithImages = await Promise.all(
  pages.map((page) => (
    new Promise<CommandPaletteItem>(resolve => {
      fetchRemoteImageById(page.image, { width: 100, height: 100 }).then(fetchedImage => {
        const item: CommandPaletteItem = {
          id: page.id,
          title: page.title,
          path: getPagePath(page as Page),
          description: page.headline,
          category: 'Pages',
          img: fetchedImage.src
        }

        resolve(item);
      })
    })
  ))
)

const articles = await getArticlesMeta();

const articlesWithImages = await Promise.all(
  articles.map(({ id, heading, slug, image}) => (
    new Promise<CommandPaletteItem>(resolve => {
      fetchRemoteImageById(image, { width: 100, height: 100 }).then(fetchedImage => {
        const item: CommandPaletteItem = {
          id,
          title: heading,
          path: slug,
          category: 'Articles',
          img: fetchedImage.src
        }

        resolve(item);
      })
    })
  ))
)

const people = await getPeople();

const peoplePaletteItems: CommandPaletteItem[] = people.map(({ id, first_name, last_name, title, image }) => ({
  id: `${id}`,
  title: `${first_name} ${last_name}`,
  path: `about/people?person=${id}`,
  category: 'People',
  description: title,
  img: image
}));

allData = [...allData, ...pagesWithImages, ...articlesWithImages, ...peoplePaletteItems]


export default function getCommandPaletteData() {
  return allData;
}
