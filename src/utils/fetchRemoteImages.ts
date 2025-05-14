import { getImage } from 'astro:assets';
import getAssetUrl from '@utils/getAssetUrl';
import type { Image } from 'env';

export default async function fetchRemoteImages(images: Image[]) {
  const imagePromises = images.map(({ id, ...rest }) => {
    return new Promise<Image>((resolve) => {
      getImage({ src: getAssetUrl(id), inferSize: true }).then((fetchedImage) =>
        resolve({
          id: fetchedImage?.src,
          ...rest,
        })
      );
    });
  });

  const result = await Promise.all(imagePromises);
  return result;
}
