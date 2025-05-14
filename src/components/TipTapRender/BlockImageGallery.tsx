import type { Image } from 'env';

interface Props {
  images: Image[];
}
import Dialog from '@components/Atoms/Dialog';
import { useState } from 'react';

export default function BlockImageGallery({ images }: Props) {
  const [expandedImage, setExpandedImage] = useState<Image | undefined>();

  return (
    <div className="my-24">
      <h1 className="text-center text-3xl font-semibold">Image Gallery</h1>
      <div className="my-12 columns-3xs gap-4 px-4">
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
        className="h-fit w-fit border border-gray-400 bg-white/60 p-2"
      >
        {!!expandedImage && (
          <>
            <img
              src={expandedImage.id}
              alt={expandedImage.title}
              className="rounded-md object-contain"
            />
            {expandedImage.description && (
              <p className="mt-2 font-sans text-xs">
                {expandedImage.description}
              </p>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
}
