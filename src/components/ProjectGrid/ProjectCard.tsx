import type { Project } from 'env';
import { MoveDiagonal, Link2, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';

interface StyledComponentProps { className?: string }

const footerDefaultStyle = `flex relative bottom-0 h-12 w-full place-items-center border justify-center gap-2`;

export default function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const { name, logo, short_description, type } = project.data;

  const CardImage = ({ className }: StyledComponentProps) => (
    <img src={logo.src} alt={name} className={twMerge("my-0", className)} />
  )
  const CardTitle = ({ className }: StyledComponentProps) => (
    <h5 className={twMerge(className)}>{name}</h5>
  )
  const CardDescription = ({ className }: StyledComponentProps) => (
    <div className={twMerge(className)}>
      <Markdown>{short_description}</Markdown>
    </div>
  )

  return (
    <div className="project-card border-numfocus-primary col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 border relative">
      <div
        className="absolute top-0 right-0 flex cursor-pointer place-items-center gap-2 bg-teal-600 p-2 text-white hover:bg-teal-700"
        onClick={onExpand}
      >
        Expand
        <MoveDiagonal className="inline" />
      </div>
      
      <div className="overflow-hidden flex flex-col h-full">
        {/* Mobile */}
        <div className="md:hidden overflow-hidden px-6 py-5 flex flex-row gap-6">
          <CardImage className="h-20"/>
          <div>
            <CardTitle className="pb-3 text-md" />
            <CardDescription />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-hidden grow-1 px-4 pt-10 pb-6">
          <CardTitle />
          <CardImage className="mx-auto h-25" />
          <CardDescription className="text-center" />
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
    </div>
  );
}
