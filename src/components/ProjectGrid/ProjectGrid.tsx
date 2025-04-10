import { useEffect, useMemo, useState } from 'react';
import { Bookmark } from 'lucide-react';

import type {
  Project,
  ProjectFilterOptions,
  ProjectFilterKey,
  ProjectFilterValues,
} from 'env';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import ProjectFilters, { initialFilters } from './ProjectFilters';
import ProjectDialogContent from './ProjectExpandedContent';

const fetchProjectFromURL = (projects: Project[]) => {
  const url = new URL((window as Window).location.href);
  const projectId = url.searchParams.get('project');

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
  const [activeFilters, setActiveFilters] =
    useState<ProjectFilterValues>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProject, setExpandedProject] = useState<Project | undefined>();
  
  useEffect(() => {
    const initialExpandedProject = fetchProjectFromURL(projects)
    if (initialExpandedProject) {
      setExpandedProject(initialExpandedProject);
    }
  }, []);

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

  const toggleProjectDialog = (project?: Project) => {
    const url = new URL((window as Window).location.href);
    if (project) {
      url.searchParams.set('project', project.id);
    } else {
      url.searchParams.delete('project')
    }
    (window as Window).history.replaceState(null, '', url.toString());

    setExpandedProject(project)
  }

  return (
    <div>
      <ProjectFilters
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="my-12 grid grid-cols-4 gap-8 md:grid-cols-12 max-w-screen-xl w-11/12 mx-auto">
        {filteredProjects.map((project) => {
          // TODO: replace with project.featured flag
          if (project.id === 'geopandas') {
            return (
              <div className="col-span-12 xl:col-span-9 border-numfocus-primary border-1 relative">
                <div
                  className="absolute top-0 right-0 flex justify-around gap-2 p-2 border-l-1 border-b-1 border-purple-700 bg-purple-50 text-purple-700 text-sm"
                >
                  <Bookmark className="h-5" />
                  Featured Project
                </div>
                <ProjectDialogContent
                  project={project}
                />
              </div>
            )
          }
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
