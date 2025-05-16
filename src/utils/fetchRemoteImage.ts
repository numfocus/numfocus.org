import { getImage } from 'astro:assets';
import getAssetUrl from '@utils/getAssetUrl';
import type { Image } from 'env';

type ImageDimensions = {
  width?: number,
  height?: number
}

export async function fetchRemoteImageById(id: string, dimensions?: ImageDimensions) {
  return fetchRemoteImage({ id, description: '', title: '', src: '' }, dimensions)
}

export default async function fetchRemoteImage(img: Image, dimensions?: ImageDimensions ) {
  if (!img?.id) return img;

  const remoteUrl = getAssetUrl(img.id);
  return new Promise<Image>((resolve) => {
    getImage({
      src: remoteUrl,
      ...(dimensions || { inferSize: true })
    }).then((fetchedImage) =>
      resolve({
        ...img,
        src: fetchedImage?.src || remoteUrl
      })
    );
  });
}