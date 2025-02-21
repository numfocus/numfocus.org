import { useMemo, useState } from 'react';
import type { Project } from 'env';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';

export default function ProjectGrid({ filterValues, projects }: { filterValues: any, projects: Project[] }) {
  const [activeFilters, setActiveFilters] = useState({});

  // This will run each time `filters` or `projects` change.
  const filteredProjects = useMemo(
    () => {
      return projects.filter((project, i) => {
        return true;
        // return i === 1
      });
    },
    [activeFilters, projects]
  );

  return (
    <div>
      <ProjectFilters filterValues={filterValues} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      <div className="project-grid mb-64 grid grid-cols-4 gap-8">
        {filteredProjects.map((project) => {
          return <ProjectCard project={project} />;
        })}
      </div>
    </div>
  );
}
