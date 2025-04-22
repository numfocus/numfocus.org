import { twMerge } from 'tailwind-merge';
import type { FeaturedLink } from 'env';
import { ArrowRightIcon } from 'lucide-react';

const colorVariants = [
  'border-brand-emphasis',
  'border-brand-dark-accent',
  'border-brand-primary',
  'border-brand-secondary',
  'border-brand-tertiary',
];

interface Props {
  link: FeaturedLink;
  variant: number;
}

export default function FeaturedLink({ link, variant }: Props) {
  return (
    <div className="my-4 inline-flex w-full flex-row items-center border-r-[1px] border-white/50 px-4 py-2">
      <a href={link.url} className="group align-middle text-base text-white">
        <span>{link.text}</span>
        <ArrowRightIcon className="ml-1 inline-block transition group-hover:translate-x-1" />
      </a>
    </div>
  );
}
