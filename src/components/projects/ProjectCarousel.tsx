import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/Carousel';
import { useState } from 'react';

import ProjectDialogContent from '@components/projects/ProjectExpandedContent';
import Dialog from '@components/ui/Dialog';
import type { Project } from 'env';
import ProjectCard from './ProjectCard';

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [expandedProject, setExpandedProject] = useState<Project | undefined>();

  return (
    <>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="-ml-8">
          {projects.map((project, i) => (
            <CarouselItem
              key={project.id}
              className="basis-full self-stretch pl-8 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProjectCard
                project={project}
                key={project.id}
                showMobileVersion={false}
                onExpand={() => setExpandedProject(project)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-brand-primary hover:bg-brand-primary cursor-pointer rounded-sm text-white transition hover:-translate-x-0.5 hover:text-white disabled:hidden" />
        <CarouselNext className="bg-brand-primary hover:bg-brand-primary cursor-pointer rounded-sm text-white transition hover:translate-x-0.5 hover:text-white disabled:hidden" />
      </Carousel>
      <Dialog
        open={!!expandedProject}
        onClose={() => setExpandedProject(undefined)}
      >
        {expandedProject && <ProjectDialogContent project={expandedProject} />}
      </Dialog>
    </>
  );
}
