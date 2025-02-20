import { createDirectus, rest, staticToken } from '@directus/sdk';

const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN;
const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;

const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

export default directus;
