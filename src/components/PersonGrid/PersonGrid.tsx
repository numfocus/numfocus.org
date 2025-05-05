import groupBy from '@utils/groupBy';
import type { Person } from 'env';
import PersonCard from './PersonCard';


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
  if (!people) { return null; }

  const peopleByRole = groupBy(people, 'role');

  return ROLES.map(({ id, label }) => (
    <div key={id}>
      <h3>{label}</h3>
      <div className="mx-auto my-12 grid w-11/12 max-w-screen-xl grid-cols-12 gap-8 md:grid-cols-12">
        {people.map(person => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  ))
}