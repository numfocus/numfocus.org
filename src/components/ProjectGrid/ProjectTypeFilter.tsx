import { Checkbox } from "@lib/components/ui/checkbox"


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
    if (!activeFilterValues.length) {
      onChange(filterOptions.map((id) => id).filter((item) => item !== id))
    } else if (activeFilterValues.includes(id)) {
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
      {filterOptions.map((item) => (
        <div className="flex items-center space-x-2" key={item}>
          <Checkbox
            id={item}
            checked={!activeFilterValues.length || activeFilterValues.includes(item)}
            onCheckedChange={() => toggleItem(item)}
            className='w-5 h-5 data-[state=checked]:bg-blue-500 rounded-none border-none'
          />
          <label
            htmlFor={item}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
}
