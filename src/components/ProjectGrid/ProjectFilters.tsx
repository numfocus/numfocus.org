import type { Project } from 'env';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

export default function ProjectFilters({ filterValues, activeFilters, setActiveFilters }: { filterValues: any, activeFilters: any, setActiveFilters: any }) {
  console.log(Object.entries(filterValues))
  return (
    <div className="bg-teal-50">
        <h5>Search and filter projects</h5>
        <div className="flex">
            {Object.entries(filterValues).map(([ key, items ]) => (
                <div>  
                    <ProjectFilter key={key} items={items} />
                </div>
            ))}
        </div>
    </div>
  );
}
