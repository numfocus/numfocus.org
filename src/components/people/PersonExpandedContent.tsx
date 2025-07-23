import type { Person } from 'env';
import { PersonCardContent } from './PersonCard';


export default function PersonExpandedContent({
  person,
}: {
  person: Person;
}) {
  return (
    <div className="px-5 py-6 text-sm sm:p-6">
      <PersonCardContent person={person} />
      <div className="pt-4" dangerouslySetInnerHTML={{ __html: person.bio }} />
    </div>
  );
}