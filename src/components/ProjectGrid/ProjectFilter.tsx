import type { ProjectFilterable } from 'env';

import { Button } from "@lib/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@lib/components/ui/dropdown-menu"


export default function ProjectFilter({ label, activeItems, items, onChange }: { label: string, activeItems: number[], items: ProjectFilterable[] , onChange: (items: number[]) => void }) {
  const toggleItem = (id: number) => {
    console.log('toggling', activeItems, id)
    if (activeItems.includes(id)) {
      onChange(activeItems.filter(item => item !== id))
    } else {
      onChange([...activeItems, id])
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
