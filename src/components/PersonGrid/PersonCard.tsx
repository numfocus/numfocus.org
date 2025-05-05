import getAssetUrl from '@utils/getAssetUrl';
import type { Person } from 'env';


export default function PersonGrid({
  person,
}: {
  person: Person;
}) {
  const {
    first_name: firstName,
    last_name: lastName,
    bio,
    image
  } = person;

  return (
    <div className="relative col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <img
        src={getAssetUrl(image)}
        alt={`${firstName} ${lastName}`}
        className="mx-auto my-5 h-50"
      />
      <h5 className="text-center">{firstName} {lastName}</h5>
      
    </div>
  );
}