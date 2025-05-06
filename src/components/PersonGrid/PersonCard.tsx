import getAssetUrl from '@utils/getAssetUrl';
import type { Person } from 'env';

export function PersonCardContent({ person }: { person: Person; }) {
  const {
    first_name: firstName,
    last_name: lastName,
    bio,
    image,
    title
  } = person;

  return (
    <div>
      <img
        src={image.src}
        alt={`${firstName} ${lastName}`}
        className="mx-auto my-5 h-50"
      />
      <h5 className="text-center">{firstName} {lastName}</h5>
      <p className="text-center font-normal my-1 text-gray-500">{title}</p>
    </div>
  )
};

export default function PersonCard({
  person,
  onExpand
}: {
  person: Person;
  onExpand?: () => void;
}) {
  return (
    <div
      className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 cursor-pointer hover:opacity-75 transition-opacity"
      onClick={onExpand}
      onKeyDown={onExpand}
    >
      <PersonCardContent person={person} />
    </div>
  );
}