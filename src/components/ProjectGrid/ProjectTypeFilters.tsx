import type {
  ProjectFilterable,
  ProjectFilterOptionId,
} from 'env';
import { Checkbox } from "@lib/components/ui/checkbox"


export default function ProjectFilters({
  filterOptions,
  activeFilterValues,
  onChange,
}: {
  filterOptions: ProjectFilterable[];
  activeFilterValues: ProjectFilterOptionId[];
  onChange: (items: any) => void;
}) {
  console.log(activeFilterValues, filterOptions);

  const toggleItem = (id: number) => {
    if (activeFilterValues.includes(id)) {
      onChange(activeFilterValues.filter((item) => item !== id));
    } else {
      onChange([...activeFilterValues, id]);
    }
  };

  return (
    <div className='flex gap-4 items-center'>
      <label
        className="block font-medium text-gray-900"
      >
        Show:
      </label>
      {filterOptions.map(({ id, name }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={id}
            checked={activeFilterValues.includes(id)}
            onCheckedChange={() => toggleItem(id)}
            className='w-5 h-5 data-[state=checked]:bg-blue-500 rounded-none border-none'
          />
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
