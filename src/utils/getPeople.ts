import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import type { Person } from 'env';
import { fetchRemoteImageById } from './fetchRemoteImage';


export default async function getPeople() {
  const people = await directus.request(readItems('people'));

  const imagePromises = people.map(({ image, ...rest }) => {
    return new Promise((resolve) => {
      fetchRemoteImageById(image).then((fetchedImage) =>
        resolve({
          image: fetchedImage?.src,
          ...rest,
        })
      );
    });
  });

  return await Promise.all(imagePromises);
}