import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { Person } from 'env';
import { fetchRemoteImageById } from './fetchRemoteImage';

export default async function getPeople() {
  const people = await directus.request<Person[]>(
    readItems('people', {
      fields: [
        'id',
        'first_name',
        'last_name',
        'image',
        'category.*',
        'socials',
        'bio',
      ],
    })
  );

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

export async function getPeopleByCategory(categoryId: number) {
  const people = await directus.request<Person[]>(
    readItems('people', {
      filter: { category: { id: { _eq: categoryId } } },
      fields: [
        'id',
        'first_name',
        'last_name',
        'image',
        'category.*',
        'socials',
        'bio',
      ],
    })
  );
  people.map((person) => {
    return console.log(
      `${person.first_name} ${person.last_name}, category: ${person.category.role}`
    );
  });
  // console.log(people);

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
