import { useEffect, useMemo, useState } from 'react';

import Dialog from '@components/Atoms/Dialog';
import groupBy from '@utils/groupBy';
import type { Person } from 'env';
import PersonCard from './PersonCard';
import PersonDialogContent from './PersonExpandedContent';


const ROLES = [
  { id: "board", label: "Board of Directors" },
  { id: "steering_committee", label: "Technical Steering Committee" },
  { id: "coc_working_group", label: "Code of Conduct Working Group" },
  { id: "staff", label: "NumFOCUS Staff" },
  { id: "advisory_council", label: "Advisory Council" },
];

export default function PersonGrid({
  people,
}: {
  people: Person[];
}) {
  const [expandedPerson, setExpandedPerson] = useState<Person | undefined>();

  const peopleByRole = groupBy(people, 'role');

  return (
    <div>
      {ROLES.map(({ id, label }) => {
        const peopleSublist = peopleByRole[id];
        if (!peopleSublist?.length) return null;

        return (
          <div key={id} className="my-16">
            <h3>{label}</h3>
            <div className="mx-auto my-8 grid grid-cols-12 gap-8">
              {peopleSublist.map((person: Person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onExpand={() => setExpandedPerson(person)}
                />
              ))}
            </div>
            
          </div>
        );
      })}
      <Dialog
        open={!!expandedPerson}
        onClose={() => setExpandedPerson(undefined)}
        className="max-w-100"
      >
        {!!expandedPerson && <PersonDialogContent person={expandedPerson} />}
      </Dialog>
    </div>
  );
}