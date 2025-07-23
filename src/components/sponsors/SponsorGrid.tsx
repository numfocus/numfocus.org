import Dialog from '@components/ui/Dialog';
import groupBy from '@utils/groupBy';
import type { Sponsor, SponsorType } from 'env';
import { useState } from 'react';
import { twMerge} from 'tailwind-merge';
import SponsorCard from './SponsorCard';
import SponsorDialogContent from './SponsorExpandedContent';

const TYPES = [
  { id: "principal", label: "Principal Corporate Sponsor" },
  { id: "sustaining", label: "Sustaining Corporate Sponsor" },
  { id: "contributing", label: "Contributing Corporate Sponsor" },
  { id: "community", label: "Community Sponsor" },
  { id: "startup", label: "Startup Partner" }
];

export default function SponsorGrid({
  sponsors,
}: {
  sponsors: Sponsor[];
}) {
  const [expandedSponsor, setExpandedSponsor] = useState<Sponsor | undefined>();

  const sponsorsByRole = groupBy(sponsors, 'type');

  return (
    <div>
      {TYPES.map(({ id, label }, i) => {
        const sponsorsSublist = sponsorsByRole[id];
        if (!sponsorsSublist?.length) return null;

        return (
          <div key={id} className={twMerge("my-8 py-10", i%2 === 0 ? "bg-teal-50" : "bg-white")}>
            <div className="mx-auto max-w-300 px-8">
              <h4>{label}</h4>
              <div className="mx-auto my-8 grid grid-cols-12 gap-8">
                {sponsorsSublist.map((sponsor: Sponsor) => (
                  <SponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                    onExpand={() => setExpandedSponsor({...sponsor, type: label as SponsorType })}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        open={!!expandedSponsor}
        onClose={() => setExpandedSponsor(undefined)}
        className=""
      >
        {!!expandedSponsor && <SponsorDialogContent sponsor={expandedSponsor} />}
      </Dialog>
    </div>
  );
}