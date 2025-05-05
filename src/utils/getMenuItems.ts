import { readItems } from '@directus/sdk';
import directus from '../../lib/directus';

import type { MenuItem } from 'env';

export default async function getMenuItems(menuName: string) {
  const menu = await directus.request(
    readItems('Menus', {
      filter: { menu_name: { _eq: menuName } },
      fields: ['id', 'menu_name', 'item.item.*'],
    })
  );
  const itemsFromMenu = menu[0].item;

  const menuItems: MenuItem[] = [];

  for (const item of itemsFromMenu) {
    const singleItem: MenuItem = {
      title: item.item.title,
      path: `/${item.item.slug}/`,
    };
    menuItems.push(singleItem);
  }

  return menuItems;
}
