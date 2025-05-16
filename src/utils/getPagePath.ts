import type { Page } from 'env';

const getPagePath: (page: Page) => string = (page: Page) => {
  if (page.parent) {
    return `${getPagePath(page.parent)}/${page.slug}`;
  }
  return page.slug || '';
}

export default getPagePath;