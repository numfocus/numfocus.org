import { createDirectus, rest } from '@directus/sdk';

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL;

// TODO: Authentication...
const directus = createDirectus(DIRECTUS_URL)
  .with(rest());

export default directus;