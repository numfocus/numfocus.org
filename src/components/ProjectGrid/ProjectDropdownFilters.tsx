import type {
  ProjectFilterKey,
  ProjectFilterOptions,
  ProjectFilterValues,
} from 'env';
import ProjectFilter from './ProjectDropdownFilter';

const labels = {
  type: 'Type',
  features: 'Features',
  languages: 'Coding language',
  industries: 'Industry',
};

export default function ProjectFilters({
  filterOptions,
  activeFilters,
  onChange,
  onClear,
}: {
  filterOptions: ProjectFilterOptions;
  activeFilters: ProjectFilterValues;
  onChange: (key: string, items: any) => void;
  onClear: () => void;
}) {
  return (
    <>
      <p className="block min-w-30 whitespace-nowrap">Filter by:</p>
      {Object.entries(filterOptions).map(([filterKey, items]) => (
        <div className="w-full" key={filterKey}>
          <ProjectFilter
            label={labels[filterKey as ProjectFilterKey]}
            activeItems={activeFilters[filterKey as ProjectFilterKey]}
            items={items}
            onChange={(items: string[]) =>
              onChange(filterKey, items)
            }
          />
        </div>
      ))}
      <button
        className="min-w-32 text-blue-500 hover:text-blue-700 disabled:text-gray-500"
        onClick={onClear}
        disabled={Object.values(activeFilters).every((f) => !f.length)}
      >
        Clear all
      </button>
    </>
  );
}
