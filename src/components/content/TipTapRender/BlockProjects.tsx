import Button from '@components/ui/LinkButton';

import type { BlockProject } from 'env';

interface Props {
  heading: string;
  projects: BlockProject[];
}
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}/assets/`;

export default function BlockProjects({ heading, projects }: Props) {
  return (
    <div className="float-right w-1/2 md:w-1/3">
      <div className="h-auto border-[1px] border-r-0 border-teal-400 py-4">
        <div className="-ml-4 border-[1px] border-r-0 border-red-400 p-8">
          <h4 className="text-center">{heading}</h4>
          {projects.map((project, index) => {
            return (
              <div
                key={`${project.name}-${index}`}
                className="grid grid-cols-6 items-center gap-4 p-4 pr-0 md:pr-16"
              >
                <div className="col-span-full flex md:col-span-2">
                  <img
                    alt={project.name}
                    src={`${assetBaseUrl}/${project.logo}`}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="col-span-4 hidden md:block">
                  <p className="text-xs">{project.description}</p>
                </div>
                <div className="col-span-full md:col-span-6 md:col-start-2">
                  <Button
                    button={{
                      link: {
                        text: `View ${project.name}`,
                        slug: `/projects?project=${project.slug}`,
                      },
                      variant: 'default',
                      style: 'light',
                    }}
                    arrow="right"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
