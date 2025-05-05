import type { Project } from 'env';
import { Link2, MoveDiagonal, Star } from 'lucide-react';
import Markdown from 'react-markdown';
import { twMerge } from 'tailwind-merge';

interface StyledComponentProps {
  className?: string;
}

const footerDefaultStyle =
  'flex relative bottom-0 h-12 w-full place-items-center border justify-center gap-2';

export default function ProjectCard({
  project,
  onExpand,
  showMobileVersion = true,
}: {
  project: Project;
  onExpand?: () => void;
  showMobileVersion?: boolean;
}) {
  const { name, logo, short_description, type } = project.data;

  const CardImage = ({ className }: StyledComponentProps) => {
    if (!logo.src) {
      return <div className="h-12" />;
    }
    return (
      <img src={logo.src} alt={name} className={twMerge('my-0', className)} />
    );
  };

  const CardTitle = ({ className }: StyledComponentProps) => (
    <h5 className={twMerge(className)}>{name}</h5>
  );
  const CardDescription = ({ className }: StyledComponentProps) => (
    <div className={twMerge(className, 'line-clamp-5')}>
      <Markdown>{short_description}</Markdown>
    </div>
  );

  return (
    <div className="project-card border-numfocus-primary relative col-span-12 h-full border sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      {!!onExpand && (
        <div
          className="absolute right-0 top-0 flex cursor-pointer place-items-center gap-2 bg-teal-600 p-2 text-white hover:bg-teal-700"
          onClick={onExpand}
          onKeyDown={onExpand}
        >
          Expand
          <MoveDiagonal className="inline" />
        </div>
      )}

      <div className="flex h-full flex-col overflow-hidden">
        {/* Mobile */}
        {!!showMobileVersion && (
          <div className="flex flex-row gap-6 overflow-hidden px-6 py-5 md:hidden">
            <CardImage className="h-20" />
            <div>
              <CardTitle className="text-md pb-3" />
              <CardDescription />
            </div>
          </div>
        )}

        {/* Desktop */}
        <div
          className={`${showMobileVersion ? 'hidden' : ''} grow-1 overflow-hidden px-4 pb-6 pt-10 md:block`}
        >
          <CardTitle />
          <CardImage className="h-25 mx-auto" />
          <CardDescription className="text-center" />
        </div>
        {type === 'affiliated' && (
          <div
            className={twMerge(
              footerDefaultStyle,
              'bg-light-teal-50 border-t-numfocus-primary text-numfocus-primary'
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
              'border-t-yellow-700 bg-yellow-50 text-yellow-700'
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
