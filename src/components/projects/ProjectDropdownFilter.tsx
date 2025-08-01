import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu';
// import Button from '@components/ui/Button';
import { Button } from '@components/ui/UiButton';
import { ArrowDown } from 'lucide-react';

export default function ProjectDropdownFilter({
  label,
  activeItems,
  items,
  onChange,
}: {
  label: string;
  activeItems: string[];
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const toggleItem = (id: string) => {
    if (activeItems.includes(id)) {
      onChange(activeItems.filter((item) => item !== id));
    } else {
      onChange([...activeItems, id]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full" asChild>
        <Button
          variant="outline"
          className="border-brand-link justify-between rounded-none border"
        >
          <span>
            <span>{label}</span>
            {!!activeItems.length && (
              <span className="font-bolder rounded-4xl bg-brand-link m-2 px-2 py-0.5 text-white">
                {activeItems.length}
                <span className="px-1 md:hidden lg:inline">selected</span>
              </span>
            )}
          </span>
          <ArrowDown className="text-blue-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className="max-h-[25vh] w-full max-w-[325px] overflow-scroll rounded-none md:max-h-[50vh]"
      >
        {items.map((item) => {
          const checked = activeItems?.includes(item);
          return (
            <DropdownMenuCheckboxItem
              checked={checked}
              onSelect={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onCheckedChange={() => toggleItem(item)}
              key={item}
              className={`overflow-hidden text-ellipsis capitalize ${checked ? 'font-bold' : ''}`}
            >
              {item}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
