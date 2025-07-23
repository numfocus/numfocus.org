import { Checkbox } from '@components/ui/checkbox';

export default function ProjectTypeFilter({
  filterOptions,
  activeFilterValues,
  onChange,
}: {
  filterOptions: string[];
  activeFilterValues: string[];
  onChange: (items: any) => void;
}) {
  const toggleItem = (id: string) => {
    if (activeFilterValues.includes(id)) {
      onChange(activeFilterValues.filter((item) => item !== id));
    } else {
      onChange([...activeFilterValues, id]);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="Show:" className="block font-medium text-gray-900">
        Show:
      </label>
      {filterOptions.map((item) => (
        <div className="flex items-center space-x-2" key={item}>
          <Checkbox
            id={item}
            checked={activeFilterValues.includes(item)}
            onCheckedChange={() => toggleItem(item)}
            className="border-1 h-5 w-5 rounded-none border-teal-500 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
          />
          <label
            htmlFor={item}
            className="whitespace-nowrap text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
}
