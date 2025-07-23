import Dialog from '@components/ui/Dialog';
import groupBy from '@utils/groupBy';
import type { Sponsor, SponsorType } from 'env';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SponsorCard from './SponsorCard';
import SponsorDialogContent from './SponsorExpandedContent';

const TYPES = [
  { id: 'principal', label: 'Principal Corporate Sponsor' },
  { id: 'sustaining', label: 'Sustaining Corporate Sponsor' },
  { id: 'contributing', label: 'Contributing Corporate Sponsor' },
  { id: 'community', label: 'Community Sponsor' },
  { id: 'startup', label: 'Startup Partner' },
];

export default function SponsorLogoWall({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="gap-18 mx-auto my-24 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {sponsors.map((sponsor: Sponsor) => (
        <div className="col-span-1" key={sponsor.id}>
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-12 w-full object-contain grayscale"
          />
        </div>
      ))}
    </div>
  );
}
