import { useMemo, useState } from 'react';
import type {
  LocalProject,
  ProjectFilterOptions,
  ProjectFilterKey,
  ProjectFilterValues,
  ProjectFilterOptionId,
} from 'env';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import ProjectTextSearch from './ProjectTextSearch';
import ProjectTypeFilter from './ProjectTypeFilters';


const PROJECT_TYPES = [
  { id: 'sponsored', name: 'Sponsored project' },
  { id: 'affiliated', name: 'Affiliated project' },
];

const matchesFilter = (
  activeFilters: ProjectFilterValues,
  project: LocalProject,
  key: ProjectFilterKey
) => {
  const activeFilterValues = activeFilters[key];
  const projectFilterValues = Array.isArray(project.data[key])
    ? project.data[key]
    : [project.data[key]];

  return (
    !activeFilterValues.length ||
    projectFilterValues.some((v) =>
      activeFilterValues.includes(v as ProjectFilterOptionId)
    )
  );
};

export default function ProjectGrid({
  filterOptions,
  projects,
}: {
  filterOptions: ProjectFilterOptions;
  projects: LocalProject[];
}) {
  const initialFilters = {
    type: [],
    features: [],
    industries: [],
    languages: [],
  };
  const [activeFilters, setActiveFilters] =
    useState<ProjectFilterValues>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project, i) => {
      return (
        matchesFilter(activeFilters, project, 'type') &&
        matchesFilter(activeFilters, project, 'features') &&
        matchesFilter(activeFilters, project, 'industries') &&
        matchesFilter(activeFilters, project, 'languages') &&
        project.data.name.toLowerCase().includes(searchQuery.toLowerCase())
      ); 
    });
  }, [activeFilters, projects, searchQuery]);

  const setActiveFilter = (key: string, items: any) => {
    setActiveFilters({ ...activeFilters, [key]: items });
  };

  const clearActiveFilters = () => {
    setActiveFilters({ ...initialFilters });
  };

  return (
    <div>
      <div className="my-4 hidden bg-teal-50 p-4 md:block">
        <h5>Search and filter projects</h5>
        <div className="mt-4 flex items-center justify-between gap-4">
          <ProjectTextSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ProjectTypeFilter
            filterOptions={PROJECT_TYPES}
            activeFilterValues={activeFilters.type}
            onChange={(items) => setActiveFilter('type', items)}
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <ProjectFilters
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onChange={setActiveFilter}
            onClear={clearActiveFilters}
          />
        </div>
      </div>
      <div className="project-grid mt-12 mb-64 grid grid-cols-4 gap-8 md:grid-cols-12">
        {filteredProjects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
}
