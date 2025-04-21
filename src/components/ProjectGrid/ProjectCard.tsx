import type { Project } from 'env';
import { MoveDiagonal, Link2, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';

interface StyledComponentProps {
  className?: string;
}

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
    <img src={logo.src} alt={name} className={twMerge('my-0', className)} />
  );
  const CardTitle = ({ className }: StyledComponentProps) => (
    <h5 className={twMerge(className)}>{name}</h5>
  );
  const CardDescription = ({ className }: StyledComponentProps) => (
    <div className={twMerge(className, 'line-clamp-5')}>
      <Markdown>{short_description}</Markdown>
    </div>
  );

  return (
    <div className="project-card border-numfocus-primary relative col-span-12 border sm:col-span-6 lg:col-span-4 xl:col-span-3">
      <div
        className="absolute top-0 right-0 flex cursor-pointer place-items-center gap-2 bg-teal-600 p-2 text-white hover:bg-teal-700"
        onClick={onExpand}
      >
        Expand
        <MoveDiagonal className="inline" />
      </div>

      <div className="flex h-full flex-col overflow-hidden">
        {/* Mobile */}
        <div className="flex flex-row gap-6 overflow-hidden px-6 py-5 md:hidden">
          <CardImage className="h-20" />
          <div>
            <CardTitle className="text-md pb-3" />
            <CardDescription />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden grow-1 overflow-hidden px-4 pt-10 pb-6 md:block">
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
