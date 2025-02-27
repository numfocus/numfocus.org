import type {
  Project,
  ProjectFilterKey,
  ProjectFilterOptions,
  ProjectFilterValues,
} from 'env';
import ProjectFilter from './ProjectFilter';

const labels = {
  features: 'Features',
  languages: 'Coding language',
  industries: 'Industry',
};

export default function ProjectFilters({
  filterOptions,
  activeFilters,
  onChange,
  onClear
}: {
  filterOptions: ProjectFilterOptions;
  activeFilters: ProjectFilterValues;
  onChange: (key: string, items: any) => void;
  onClear: () => void;
}) {
  console.log(Object.entries(filterOptions));

  return (
    <div className="mt-4 flex gap-2 justify-between">
      <p className="block min-w-32 whitespace-nowrap">Filter by:</p>
      {Object.entries(filterOptions).map(([filterKey, items]) => (
        <div className="w-max" key={filterKey}>
          <ProjectFilter
            label={labels[filterKey as ProjectFilterKey]}
            activeItems={activeFilters[filterKey as ProjectFilterKey]}
            items={items}
            onChange={(items: number[]) => onChange(filterKey, items)}
          />
        </div>
      ))}
      <button className="min-w-32 text-blue-500 hover:text-blue-700" onClick={onClear}>Clear all</button>
    </div>
  );
}
