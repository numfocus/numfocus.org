import type { LocalProject } from 'env';
import { MoveDiagonal, Link2, Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

const footerDefaultStyle = `flex h-12 w-full place-items-center border justify-center gap-2`;

export default function ProjectCard({ project }: { project: LocalProject }) {
  const { name, logo, short_description, type } = project.data
  return (
    <div className="project-card border-numfocus-primary col-span-4 flex flex-col justify-between border">
      <div className="relative h-12 w-full">
        <div className="absolute top-0 right-0 flex cursor-pointer place-items-center gap-2 bg-teal-600 p-2 text-white hover:bg-teal-700">
          Expand
          <MoveDiagonal className="inline" />
        </div>
      </div>
      <div className="flex flex-wrap overflow-hidden px-4 py-5 sm:p-6">
        <h5 className="pt-8">{name}</h5>
        <img
          src={`${assetBaseUrl}${logo}`}
          alt={name}
          className="mx-auto my-0 h-42"
        />
        <p className="text-center text-sm">{short_description}</p>
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
