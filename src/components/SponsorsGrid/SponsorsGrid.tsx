import Dialog from '@components/Atoms/Dialog';
import groupBy from '@utils/groupBy';
import type { Sponsor } from 'env';
import { useState } from 'react';
import { twMerge} from 'tailwind-merge';
import SponsorCard from './SponsorCard';


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
  // const [expandedPerson, setExpandedPerson] = useState<Person | undefined>();

  const sponsorsByRole = groupBy(sponsors, 'type');

  return (
    <div>
      {TYPES.map(({ id, label }, i) => {
        const sponsorsSublist = sponsorsByRole[id];
        if (!sponsorsSublist?.length) return null;

        return (
          <div key={id} className={twMerge("my-8 py-10", i%2 === 0 ? "bg-teal-50" : "bg-white")}>
            <div className="mx-auto max-w-300 px-8">
              <h3>{label}</h3>
              <div className="mx-auto my-8 grid grid-cols-12 gap-8">
                {sponsorsSublist.map((sponsor: Sponsor) => (
                  <SponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                    // onExpand={() => setExpandedPerson(person)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
      {/* <Dialog
        open={!!expandedPerson}
        onClose={() => setExpandedPerson(undefined)}
        className="max-w-100"
      >
        {!!expandedPerson && <PersonDialogContent person={expandedPerson} />}
      </Dialog> */}
    </div>
  );
}