import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import getPagePath from './getPagePath';

export default async function getMenusByType(type: string) {
  const menus = await directus.request(
    readItems('Menus', {
      filter: { type: { _eq: type } },
      fields: ['id', 'title', 'item.item.*.*'],
    })
  );

  return menus.map(({ id, title, item}) => ({
    id,
    title,
    items: item.map((item: any) => ({
      title: item.item.title,
      path: `/${getPagePath(item.item)}`,
    }))
  }))
}
