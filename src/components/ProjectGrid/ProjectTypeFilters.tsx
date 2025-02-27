import { Checkbox } from "@lib/components/ui/checkbox"


export default function ProjectFilters({
  filterOptions,
  activeFilterValues,
  onChange,
}: {
  filterOptions: any;
  activeFilterValues: any;
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
    <div className='flex gap-4 align-middle'>
        {filterOptions.map(({ id, name }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={id}
              checked={activeFilterValues.includes(id)}
              onCheckedChange={() => toggleItem(id)}
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {name}
            </label>
          </div>
        ))}
    </div>
  );
}
