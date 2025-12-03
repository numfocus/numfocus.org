import Dialog from '@components/ui/Dialog';
import groupBy from '@utils/groupBy';
import type { Person } from 'env';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PersonCard from './PersonCard';
import PersonDialogContent from './PersonExpandedContent';

const fetchPersonFromURL = (people: Person[]) => {
  const url = new URL((window as Window).location.href);
  const personId = url.searchParams.get('person');

  if (personId) {
    return people.find((p) => p.id === +personId);
  }
};

export default function PeopleGrid({ people }: { people: Person[] }) {
  const [expandedPerson, setExpandedPerson] = useState<Person | undefined>();

  const category = people[0].category.role;
  useEffect(() => {
    const initialExpandedPerson = fetchPersonFromURL(people);
    if (initialExpandedPerson) {
      setExpandedPerson(initialExpandedPerson);
    }
  }, [people]);

  return (
    <div className="my-12">
      <div className="max-w-300 mx-auto px-8">
        <h3>{category}</h3>
        <div className="mx-auto my-8 grid grid-cols-12 gap-8">
          {people.map((person: Person) => (
            <PersonCard
              key={person.id}
              person={person}
              onExpand={() => setExpandedPerson(person)}
            />
          ))}
        </div>
      </div>
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
