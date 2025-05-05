import { navigate } from 'astro:transitions/client';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  type TabGroupProps,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaceFrownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, Book, BookOpenTextIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import type { CommandPaletteItem } from 'env';

interface Props {
  items: CommandPaletteItem[];
}
interface Groups {
  [index: string]: CommandPaletteItem[];
}

export default function CommandPalette({ items }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredItems =
    query === ''
      ? []
      : items.filter((item) => {
          return item.title.toLowerCase().includes(query.toLowerCase());
        });

  const groups: Groups = filteredItems.reduce((groups, item) => {
    return {
      // biome-ignore lint/performance/noAccumulatingSpread: TODO study workaround
      ...groups,
      [item.category]: [...(groups[item.category] || []), item],
    };
  }, {} as Groups);

  const showPalette = () => setOpen(true);

  // function handlekeydownEvent(event: KeyboardEvent) {
  //   const { key } = event;
  //   if (key === 'k' && (event.metaKey || event.ctrlKey)) {
  //     showPalette();
  //   }
  // }

  // biome-ignore lint/correctness/useExhaustiveDependencies: TODO study workaround
  useEffect(() => {
    // biome-ignore lint/suspicious/noGlobalAssign: worth it for the cmd+k feature
    onkeydown = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        showPalette();
      }
    };
  }, []);

  return (
    <>
      <div
        className="cursor-pointer text-teal-600"
        onClick={showPalette}
        onKeyDown={showPalette}
      >
        <Search className="mr-2 h-8 w-8" />
      </div>
      <Dialog
        transition
        className="relative z-10"
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery('');
        }}
      >
        <DialogBackdrop
          transition
          className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/25 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all"
          >
            <Combobox
              onChange={(item: CommandPaletteItem) => {
                if (item) {
                  (window as Window).location = item.path;
                }
              }}
            >
              <div className="grid grid-cols-1">
                <ComboboxInput
                  autoFocus
                  className="outline-hidden col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => setQuery('')}
                />
                <MagnifyingGlassIcon
                  className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                  aria-hidden="true"
                />
              </div>

              {query === '' && (
                <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                  <GlobeAmericasIcon
                    className="mx-auto size-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-semibold text-gray-900">
                    Search for projects, articles, and documents.
                  </p>
                  <p className="mt-2 text-gray-500">
                    Quickly search through our whole website for the info you
                    need.
                  </p>
                </div>
              )}

              {filteredItems.length > 0 && (
                <ComboboxOptions
                  static
                  as="ul"
                  className="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
                >
                  {Object.entries(groups).map(([category, items]) => (
                    <li key={category}>
                      <div className="mx-2 my-1.5 border-0 border-b-[1px] border-blue-400 py-1">
                        <h2 className="text-sm font-semibold capitalize text-gray-900">
                          {category}
                        </h2>
                      </div>
                      <ul className="mt-2 text-sm text-gray-800">
                        {items.map((item) => (
                          <ComboboxOption
                            key={item.id}
                            value={item}
                            className="data-focus:bg-blue-50 data-focus:outline-hidden cursor-default select-none px-4 py-2"
                          >
                            {({ focus }) => (
                              <div className="flex items-center justify-between gap-4">
                                {item.img ? (
                                  <img
                                    src={item.img}
                                    alt={item.title}
                                    height={50}
                                    width={50}
                                  />
                                ) : (
                                  <BookOpenTextIcon className="h-4 w-4 text-blue-400" />
                                )}
                                <div className="w-full">
                                  <p className="block font-bold">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <div className="line-clamp-2 text-xs">
                                      <Markdown>{item.description}</Markdown>
                                    </div>
                                  )}
                                </div>
                                <div className="h-4 w-4">
                                  {focus && (
                                    <ArrowRightIcon className="h-4 w-4 text-blue-400" />
                                  )}
                                </div>
                              </div>
                            )}
                          </ComboboxOption>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComboboxOptions>
              )}

              {query !== '' && filteredItems.length === 0 && (
                <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                  <FaceFrownIcon
                    className="mx-auto size-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-semibold text-gray-900">
                    No results found
                  </p>
                  <p className="mt-2 text-gray-500">
                    We couldn’t find anything with that term. Please try again.
                  </p>
                </div>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
