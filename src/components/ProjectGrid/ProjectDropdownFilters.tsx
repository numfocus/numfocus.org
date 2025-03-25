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

export default function ProjectDropdownFilters({
  filterOptions,
  activeFilters,
  onChange,
}: {
  filterOptions: ProjectFilterOptions;
  activeFilters: ProjectFilterValues;
  onChange: (key: string, items: any) => void;
}) {
  return (
    <>
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
    </>
  );
}
