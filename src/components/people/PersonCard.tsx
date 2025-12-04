import Social from '@components/ui/Social';
import type { Person } from 'env';

export function PersonCardContent({ person }: { person: Person }) {
  const {
    first_name: firstName,
    last_name: lastName,
    bio,
    image,
    title,
    socials,
  } = person;

  return (
    <div>
      <img
        src={image}
        alt={`${firstName} ${lastName}`}
        className="h-50 mx-auto my-5 rounded-lg"
      />
      <h5 className="text-center">
        {firstName} {lastName}
      </h5>
      <p className="my-1 text-center font-normal text-gray-500">{title}</p>
    </div>
  );
}

export default function PersonCard({
  person,
  onExpand,
}: {
  person: Person;
  onExpand?: () => void;
}) {
  return (
    <div className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
      <div
        className="cursor-pointer transition-opacity hover:opacity-75"
        onClick={onExpand}
        onKeyDown={onExpand}
      >
        <PersonCardContent person={person} />
      </div>
      <div className="mt-4 flex flex-row justify-center gap-4">
        {person.socials?.map((social) => (
          <Social key={social.platform} social={social} />
        ))}
      </div>
    </div>
  );
}

export function PersonCardStatic({ person }: { person: Person }) {
  return (
    <div className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
      <PersonCardContent person={person} />
      {person.socials && (
        <div className="my-4 flex flex-row justify-center gap-4">
          {person.socials?.map((social) => (
            <Social key={social.platform} social={social} />
          ))}
        </div>
      )}
      <div
        className="prose prose-sm"
        dangerouslySetInnerHTML={{ __html: person.bio }}
      />
    </div>
  );
}
