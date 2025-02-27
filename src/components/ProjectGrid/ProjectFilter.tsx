import type { ProjectFilterable } from 'env';

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
  activeItems: number[];
  items: ProjectFilterable[];
  onChange: (items: number[]) => void;
}) {
  const toggleItem = (id: number) => {
    console.log('toggling', activeItems, id);
    if (activeItems.includes(id)) {
      onChange(activeItems.filter((item) => item !== id));
    } else {
      onChange([...activeItems, id]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-none border border-teal-500"
        >
          {label} <ArrowDown></ArrowDown>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        {items.map(({ id, name }) => (
          <DropdownMenuCheckboxItem
            checked={activeItems.includes(id)}
            onCheckedChange={() => toggleItem(id)}
            key={id}
          >
            {name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
