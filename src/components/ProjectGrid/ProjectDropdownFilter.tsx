import type { ProjectFilterOptionId } from 'env';

import { Button } from '@lib/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@lib/components/ui/dropdown-menu';
import { ArrowDown } from 'lucide-react';

export default function ProjectFilter({
  label,
  activeItems,
  items,
  onChange,
}: {
  label: string;
  activeItems: ProjectFilterOptionId[];
  items: string[];
  onChange: (items: ProjectFilterOptionId[]) => void;
}) {
  const toggleItem = (id: string) => {
    console.log('toggling', activeItems, id);
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
          className="rounded-none border border-teal-500 justify-between"
        >
          <span>{label}</span>
          <ArrowDown className="text-blue-500"></ArrowDown>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full rounded-none">
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            checked={activeItems.includes(item)}
            onSelect={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onCheckedChange={() => toggleItem(item)}
            key={item}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
