import type { Image } from 'env';

interface Props {
  images: Image[];
}
import getAssetUrl from '@utils/getAssetUrl';

export default function BlockImageGallery({ images }: Props) {
  console.log(images);
  return (
    <div className="mx-auto my-8 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
      {images.map(({ id, description, title }) => (
        <div key={id} className="group relative transition">
          <img
            src={getAssetUrl(id)}
            alt={title}
            className="mb-4 rounded-sm border border-transparent transition hover:border-gray-300 hover:shadow-lg"
          />
          {!!description && (
            <div className="inset absolute bottom-0 z-10 flex items-center justify-center">
              <p className="bg-black/30 px-4 py-2 text-center font-sans text-xs text-white opacity-0 transition group-hover:opacity-100">
                {description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
