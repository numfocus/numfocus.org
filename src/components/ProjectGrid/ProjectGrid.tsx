import type { Project } from 'env';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid mb-64 grid grid-cols-4 gap-8">
      {projects.map((project) => {
        return <ProjectCard project={project} />;
      })}
    </div>
  );
}
