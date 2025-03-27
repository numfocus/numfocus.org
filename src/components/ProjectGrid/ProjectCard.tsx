import type { Project } from 'env';
import { MoveDiagonal, Link2, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
const footerDefaultStyle = `flex absolute bottom-0 h-12 w-full place-items-center border justify-center gap-2`;

export default function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const { name, logo, short_description, type } = project.data;
  return (
    <div className="project-card border-numfocus-primary col-span-6 lg:col-span-4 border relative">
      <div
        className="absolute top-0 right-0 flex cursor-pointer place-items-center gap-2 bg-teal-600 p-2 text-white hover:bg-teal-700"
        onClick={onExpand}
      >
        Expand
        <MoveDiagonal className="inline" />
      </div>
        
      <div className="overflow-hidden px-4 pt-12 pb-20 sm:px-6">
        <h5 className="">{name}</h5>
        <img src={logo.src} alt={name} className="mx-auto my-0 h-30" />
        <div className="text-center text-sm">
          <Markdown>{short_description}</Markdown>
        </div>
        {/* <a href={website_link}>{website_link}</a> */}
      </div>
        {type === 'affiliated' && (
          <div
            className={twMerge(
              footerDefaultStyle,
              `bg-light-teal-50 border-t-numfocus-primary text-numfocus-primary`
            )}
          >
            <Link2 />
            Affiliated Project
          </div>
        )}
        {type === 'sponsored' && (
          <div
            className={twMerge(
              footerDefaultStyle,
              `border-t-yellow-700 bg-yellow-50 text-yellow-700`
            )}
          >
            <Star />
            Sponsored Project
          </div>
        )}
    </div>
  );
}
