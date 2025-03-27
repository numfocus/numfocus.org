import { useMemo, useState } from 'react';
import type {
  Project,
  ProjectFilterOptions,
  ProjectFilterKey,
  ProjectFilterValues,
} from 'env';

import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import ProjectDropdownFilters from './ProjectDropdownFilters';
import ProjectTextSearch from './ProjectTextSearch';
import ProjectTypeFilter from './ProjectTypeFilter';

const filterContainerStyle = "mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
const filterLabelStyle = "block md:basis-30 grow-0 shrink-0 font-medium text-gray-900"

const fetchProjectFromURL = (projects: Project[]) => {
  if (!window) return;

  const projectId = new URLSearchParams(window.location.search).get('project');

  if (projectId) {
    return projects.find(p => p.id === projectId)
  }
}

const matchesFilter = (
  activeFilters: ProjectFilterValues,
  project: Project,
  key: ProjectFilterKey
) => {
  const activeFilterValues = activeFilters[key];
  const projectFilterValues = Array.isArray(project.data[key])
    ? project.data[key]
    : [project.data[key]];

  return (
    !activeFilterValues.length ||
    projectFilterValues.some((v) =>
      activeFilterValues.includes(v)
    )
  );
};


export default function ProjectGrid({
  filterOptions,
  projects,
}: {
  filterOptions: ProjectFilterOptions;
  projects: Project[];
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
  const [expandedProject, setExpandedProject] = useState<Project | undefined>(fetchProjectFromURL(projects));

  const { type: typeFilterOptions, ...dropdownFilterOptions } = filterOptions;

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
    setSearchQuery('');
  };

  const toggleProjectDialog = (project?: Project) => {
    if (window) {
      const url = new URL(window.location.href);
      if (!!project) {
        url.searchParams.set('project', project.id);
      } else {
        url.searchParams.delete('project')
      }
      window.history.replaceState(null, '', url.toString());
    }
    setExpandedProject(project)
  }

  const TypeFilter = () => (
    <ProjectTypeFilter
      filterOptions={typeFilterOptions || []}
      activeFilterValues={activeFilters.type}
      onChange={(items) => setActiveFilter('type', items)}
    />
  );

  return (
    <div>
      <div className="my-4 px-4 py-6 bg-teal-50 text-sm">
        <div className="max-w-screen-xl w-11/12 mx-auto">
          <h5>Search and filter projects</h5>
          <div className={filterContainerStyle}>
            <p className={filterLabelStyle}>
              Search by name:
            </p>
            <ProjectTextSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* Desktop */}
            <div className="hidden md:block">
              <TypeFilter />
            </div>
          </div>
          <div className={filterContainerStyle}>
            <p className={filterLabelStyle}>
              Filter by:
            </p>
            <ProjectDropdownFilters
              filterOptions={dropdownFilterOptions}
              activeFilters={activeFilters}
              onChange={setActiveFilter}
            />
            {/* Mobile */}
            <div className="md:hidden py-2">
              <TypeFilter />
            </div>
            <button
              className="min-w-32 md:basis-30 text-left md:text-center text-blue-500 hover:text-blue-700 disabled:text-gray-500"
              onClick={clearActiveFilters}
              disabled={!searchQuery && Object.values(activeFilters).every((f) => !f.length)}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-64 grid grid-cols-4 gap-8 md:grid-cols-12 max-w-screen-xl w-11/12 mx-auto">
        {filteredProjects.map((project) => {
          return (
            <ProjectCard 
              project={project}
              key={project.id}
              onExpand={() => toggleProjectDialog(project)}
            />
          );
        })}
      </div>
      <ProjectDialog
        project={expandedProject}
        onClose={() => toggleProjectDialog()}
      />
    </div>
  );
}
