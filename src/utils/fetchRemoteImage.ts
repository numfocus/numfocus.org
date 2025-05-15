import { getImage } from 'astro:assets';
import getAssetUrl from '@utils/getAssetUrl';
import type { Image } from 'env';

export default async function fetchRemoteImage(img: Image) {
  const remoteUrl = getAssetUrl(img.id);
  return new Promise<Image>((resolve) => {
    getImage({
      src: remoteUrl,
      inferSize: true
    }).then((fetchedImage) =>
      resolve({
        ...img,
        src: fetchedImage?.src || remoteUrl
      })
    );
  });
}