import type { Project, ProjectFilterKey, ProjectFilterOptions, ProjectFilterValues } from 'env';
import ProjectFilter from './ProjectFilter';

const labels = {
  features: "Features",
  languages: "Languages",
  industries: "Industries",
}

export default function ProjectFilters({ filterOptions, activeFilters, onChange }: { filterOptions: ProjectFilterOptions, activeFilters: ProjectFilterValues, onChange: (key: string, items: any) => void }) {
  console.log(Object.entries(filterOptions))

  return (
    <div className="bg-teal-50">
      <h5>Search and filter projects</h5>
      <div className="flex justify-between">
        <p className="whitespace-nowrap">Search by:</p>
      </div>
      <div className="flex justify-between gap-2">
        <p className="whitespace-nowrap">Filter by:</p>
        {Object.entries(filterOptions).map(([ filterKey, items ]) => (
          <div className='w-full' key={filterKey}>  
            <ProjectFilter
              label={labels[filterKey as ProjectFilterKey]}
              activeItems={activeFilters[filterKey as ProjectFilterKey]}
              items={items}
              onChange={((items: number[]) => onChange(filterKey, items))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
