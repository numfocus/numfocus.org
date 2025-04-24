import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@lib/components/ui/carousel";

import type { Project } from 'env';
import ProjectCard from "./ProjectGrid/ProjectCard";

export default function ProjectCarousel({ projects }: { projects: Project[]; }) {
  
  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent className="-ml-8">
        {projects.map((project, i) => (
          <CarouselItem className="pl-8 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 self-stretch">
            <ProjectCard 
              project={project}
              key={project.id}
              showMobileVersion={false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="disabled:hidden bg-light-teal-500 text-white cursor-pointer rounded-sm"/>
      <CarouselNext className="disabled:hidden bg-light-teal-500 text-white cursor-pointer rounded-sm"/>
    </Carousel>
  )
}
