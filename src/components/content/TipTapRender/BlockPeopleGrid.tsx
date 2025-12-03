import PeopleGrid from '@components/people/PeopleGrid';
import { getPeopleByCategory } from '@utils/getPeople';

import Container from '@components/ui/Container';

interface Props {
  id: number;
  role: string;
}

export default async function BlockPeopleGrid({ id, role }: Props) {
  const people = await getPeopleByCategory(id);
  return (
    <Container>
      <PeopleGrid people={people} />
    </Container>
  );
}
