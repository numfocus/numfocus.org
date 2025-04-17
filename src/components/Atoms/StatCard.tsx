import { twMerge } from 'tailwind-merge';
import type { HomepageStats } from 'env';
import { ArrowRightIcon } from 'lucide-react';

const colorVariants = [
  'border-brand-emphasis',
  'border-brand-dark-accent',
  'border-brand-primary',
  'border-brand-secondary',
  'border-brand-tertiary',
];

interface Props {
  stats: HomepageStats;
  index: number;
}

export default function StatCard({ stats, index }: Props) {
  const category = stats.category.replace(/-/g, ' ');
  return (
    <div key={index} className="flex flex-col gap-4 bg-gray-400/5 p-8">
      <dt className="text-link capitalize">{category}</dt>
      <dt className="text-3xl font-bold tracking-tight text-gray-900">
        {stats.mainContent}
      </dt>
      <dd className="text-sm/6 text-gray-600">
        {stats.url ? (
          <a href={stats.url} className="group align-middle">
            <span>{stats.description}</span>
            <ArrowRightIcon className="ml-1 inline-block transition group-hover:translate-x-1" />
          </a>
        ) : (
          <>{stats.description}</>
        )}
      </dd>
    </div>
  );
}
