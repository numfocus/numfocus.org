import { useMemo, useState } from 'react';
import type {
  Project,
  ProjectFilterOptions,
  ProjectFilterKey,
  ProjectFilterValues,
} from 'env';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import ProjectTextSearch from './ProjectTextSearch';

const matchesFilter = (
  activeFilters: ProjectFilterValues,
  project: Project,
  key: ProjectFilterKey
) => {
  const activeFilterValues = activeFilters[key];
  const projectFilterValues =
    project[key]?.map((d) => Object.values(d)).flat() || [];

  return (
    !activeFilterValues.length ||
    projectFilterValues.some((v) => activeFilterValues.includes(v))
  );
};

export default function ProjectGrid({
  filterOptions,
  projects,
}: {
  filterOptions: ProjectFilterOptions;
  projects: Project[];
}) {
  const [activeFilters, setActiveFilters] = useState<ProjectFilterValues>({
    features: [],
    industries: [],
    languages: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);

  const filteredProjects = useMemo(() => {
    return projects.filter((project, i) => {
      return (
        matchesFilter(activeFilters, project, 'features') &&
        matchesFilter(activeFilters, project, 'industries') &&
        matchesFilter(activeFilters, project, 'languages') &&
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeFilters, projects, searchQuery]);

  const setActiveFilter = (key: string, items: any) => {
    setActiveFilters({ ...activeFilters, [key]: items });
  };

  return (
    <div>
      <div className="my-4 bg-teal-50 p-4">
        <h5>Search and filter projects</h5>
        <ProjectTextSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ProjectFilters
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onChange={setActiveFilter}
        />
      </div>
      <div className="project-grid mb-64 grid grid-cols-4 gap-8">
        {filteredProjects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
}
