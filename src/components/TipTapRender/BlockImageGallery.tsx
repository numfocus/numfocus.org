import type { Image } from 'env';

interface Props {
  images: Image[];
}
import { getImage } from 'astro:assets';
import Dialog from '@components/Atoms/Dialog';
import getAssetUrl from '@utils/getAssetUrl';
import { useState } from 'react';

export default function BlockImageGallery({ images }: Props) {
  const [expandedImage, setExpandedImage] = useState<Image | undefined>();
  // console.log(images);

  return (
    <>
      <div className="mx-auto my-8 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative transition"
            onClick={() => setExpandedImage(image)}
            onKeyDown={() => setExpandedImage(image)}
          >
            <img
              src={image.id}
              alt={image.title}
              className="mb-4 rounded-sm border border-transparent transition hover:border-gray-300 hover:shadow-lg"
            />
            {!!image.description && (
              <div className="inset absolute bottom-0 z-10 flex items-center justify-center">
                <p className="bg-black/30 px-4 py-2 text-center font-sans text-xs text-white opacity-0 transition group-hover:opacity-100">
                  {image.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <Dialog
        open={!!expandedImage}
        onClose={() => setExpandedImage(undefined)}
      >
        {!!expandedImage && (
          <img
            src={expandedImage.id}
            alt={expandedImage.title}
            height={300}
            width={300}
            className="mb-4 rounded-sm border border-transparent transition hover:border-gray-300 hover:shadow-lg"
          />
        )}
      </Dialog>
    </>
  );
}
