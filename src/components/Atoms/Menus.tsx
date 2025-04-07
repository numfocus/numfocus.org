import type { MenuItem as mi } from 'env';
import { twMerge } from 'tailwind-merge';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';

interface Props {
  menuItems: mi[];
  currentPage: string;
}
export const NavMenu = ({ menuItems, currentPage }: Props) => {
  return (
    <nav className="hidden w-1/2 items-center justify-around gap-2 md:flex">
      {menuItems.map(({ path, title }) => (
        <a
          href={path}
          className={twMerge(
            'font-semi-bold inline-block text-teal-600 transition hover:text-teal-800',
            `${path}` === currentPage && `text-teal-900`
          )}
        >
          <span>{title}</span>
        </a>
      ))}
    </nav>
  );
};

export const HamburgerMenu = ({ menuItems, currentPage }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left md:hidden">
      <div>
        <MenuButton className="hover:bg-light-teal-50 inline-flex w-full cursor-pointer justify-center gap-x-1.5 rounded-sm border-[1px] border-teal-600 bg-white p-2 text-teal-600 ring-1 shadow-xs ring-gray-300 ring-inset">
          <MenuIcon className="" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        anchor="bottom"
      >
        <div className="py-1">
          {menuItems.map(({ path, title }) => (
            <MenuItem>
              <a
                href={path}
                className={twMerge(
                  'data-focus:bg-light-teal-100 block px-4 py-2 text-sm text-teal-600 data-focus:text-teal-900 data-focus:outline-hidden',
                  `${path}` === currentPage && `bg-light-teal-50`
                )}
              >
                <span>{title}</span>
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export const FooterMenu = ({
  menuItems,
  menuTitle,
}: {
  menuItems: mi[];
  menuTitle: string;
}) => {
  return (
    <div>
      <h5 className="pb-6 font-bold text-white">{menuTitle}</h5>
      <ul>
        {menuItems.map(({ path, title }) => (
          <li className="pb-4">
            <a
              href={path}
              className={twMerge(
                'font-semi-bold text-sm break-all text-white transition hover:text-teal-300 md:text-base'
              )}
            >
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// font-semi-bold inline-block text-teal-600 transition hover:text-teal-800
