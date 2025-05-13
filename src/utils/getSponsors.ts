import { getImage } from 'astro:assets';
import directus from '@directus/directus';
import { readItems } from '@directus/sdk';
import getAssetUrl from '@utils/getAssetUrl';

export default async function getSponsors() {
  const sponsors = await directus.request(readItems('sponsors'));

  const imagePromises = sponsors.map(({ logo, ...rest }) => {
    return new Promise((resolve) => {
      getImage({ src: getAssetUrl(logo), inferSize: true }).then(
        (fetchedImage) =>
          resolve({
            logo: fetchedImage?.src,
            ...rest,
          })
      );
    });
  });

  const sponsorsWithImages = await Promise.all(imagePromises);

  return sponsorsWithImages;
}
