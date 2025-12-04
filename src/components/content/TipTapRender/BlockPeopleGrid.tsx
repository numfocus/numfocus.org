import { PeopleGridStatic } from '@components/people/PeopleGrid';
import { getPeopleByCategory } from '@utils/getPeople';

interface Props {
  id: number;
  role: string;
}

export default async function BlockPeopleGrid({ id, role }: Props) {
  const people = await getPeopleByCategory(id);
  return (
    <div className="max-w-300 mx-auto px-8">
      <PeopleGridStatic people={people} />
    </div>
  );
}
