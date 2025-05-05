import { Bookmark } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import Dialog from '@components/Atoms/Dialog';
import type {
  Project,
  ProjectFilterKey,
  ProjectFilterOptions,
  ProjectFilterValues,
} from 'env';
import ProjectCard from './ProjectCard';
import ProjectDialogContent from './ProjectExpandedContent';
import ProjectFilters, { initialFilters } from './ProjectFilters';

const fetchProjectFromURL = (projects: Project[]) => {
  const url = new URL((window as Window).location.href);
  const projectId = url.searchParams.get('project');

  if (projectId) {
    return projects.find((p) => p.id === projectId);
  }
};

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
    (key !== 'type' && !activeFilterValues.length) ||
    projectFilterValues.some((v) => activeFilterValues.includes(v))
  );
};

const projectSort = (a: Project, b: Project) => {
  // TODO: replace with project.featured flag
  if (a.id === 'geopandas') return -1;

  return a.data.name.toLowerCase() > b.data.name.toLowerCase() ? 1 : -1;
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
    const initialExpandedProject = fetchProjectFromURL(projects);
    if (initialExpandedProject) {
      setExpandedProject(initialExpandedProject);
    }
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project, i) => {
        return (
          matchesFilter(activeFilters, project, 'type') &&
          matchesFilter(activeFilters, project, 'features') &&
          matchesFilter(activeFilters, project, 'industries') &&
          matchesFilter(activeFilters, project, 'languages') &&
          project.data.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .sort(projectSort);
  }, [activeFilters, projects, searchQuery]);

  const toggleProjectDialog = (project?: Project) => {
    const url = new URL((window as Window).location.href);

    console.log(project)
    if (project) {
      url.searchParams.set('project', project.id);
    } else {
      url.searchParams.delete('project');
    }
    (window as Window).history.replaceState(null, '', url.toString());

    setExpandedProject(project);
  };

  return (
    <div>
      <ProjectFilters
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="mx-auto my-12 grid w-11/12 max-w-screen-xl grid-cols-12 gap-8 md:grid-cols-12">
        {filteredProjects.map((project) => {
          // TODO: replace with project.featured flag
          if (project.id === 'geopandas') {
            return (
              <div className="border-numfocus-primary border-1 relative order-first col-span-12 xl:col-span-9">
                <div className="border-b-1 border-l-1 absolute right-0 top-0 flex justify-around gap-2 border-purple-700 bg-purple-50 p-2 text-sm text-purple-700">
                  <Bookmark className="h-5" />
                  Featured Project
                </div>
                <ProjectDialogContent project={project} />
              </div>
            );
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
      <Dialog
        open={!!expandedProject}
        onClose={() => toggleProjectDialog()}
      >
        <ProjectDialogContent project={expandedProject} />
      </Dialog>
    </div>
  );
}
