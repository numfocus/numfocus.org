import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { Person } from 'env';
import { fetchRemoteImageById } from './fetchRemoteImage';


export default async function getPeople() {
  const people = await directus.request(readItems('people'));

  const imagePromises = (people as Person[]).map((person: Person) => {
    return new Promise<Person>((resolve) => {
      fetchRemoteImageById(person.image).then((fetchedImage) =>
        resolve({
          ...person,
          image: fetchedImage?.src,
        })
      );
    });
  });

  return await Promise.all(imagePromises);
}