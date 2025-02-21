import { useMemo, useState } from 'react';
import type { Project, ProjectFilterOptions, ProjectFilterValues } from 'env';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';

export default function ProjectGrid({ filterOptions, projects }: { filterOptions: ProjectFilterOptions, projects: Project[] }) {
  const [activeFilters, setActiveFilters] = useState<ProjectFilterValues>({ features: [], industries: [], languages: []});

  const filteredProjects = useMemo(
    () => {
      console.log('in memo', activeFilters, projects)
      return projects.filter((project, i) => {
        return true;
        // const commonItems = activeFilters.industries.filter(item => project.industries.includes(item));
        // return commonItems.length > 0
      });
    },
    [activeFilters, projects]
  );

  const setActiveFilter = (key: string, items: any) => {
    setActiveFilters({...activeFilters, [key]: items })
  }

  return (
    <div>
      <ProjectFilters
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        onChange={setActiveFilter}
      />
      <div className="project-grid mb-64 grid grid-cols-4 gap-8">
        {filteredProjects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
}
