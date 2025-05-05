import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@lib/components/ui/carousel';

import type { Project } from 'env';
import ProjectCard from './ProjectGrid/ProjectCard';

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  return (
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
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-light-teal-500 cursor-pointer rounded-sm text-white disabled:hidden" />
      <CarouselNext className="bg-light-teal-500 cursor-pointer rounded-sm text-white disabled:hidden" />
    </Carousel>
  );
}
