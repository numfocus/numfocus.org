import {
  createDirectus,
  readItems,
  readSingleton,
  rest,
  staticToken,
} from '@directus/sdk';

const DIRECTUS_URL = process.env.DIRECTUS_URL ? process.env.DIRECTUS_URL : '';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN
  ? process.env.DIRECTUS_TOKEN
  : '';

const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());
const directusAssetUrl = `${DIRECTUS_URL}assets/`;

const projects = await directus.request(readItems('projects_sync'));

console.log(projects);
