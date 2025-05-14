import type { Image } from 'env';

interface Props {
  images: Image[];
}
import getAssetUrl from '@utils/getAssetUrl';

export default function BlockImageGallery({ images }: Props) {

  console.log(images)
  return (
    <div>
      {images.map(({ id, description, title }) => (
        <div key={id}>
           <img
             src={getAssetUrl(id)}
             alt={title}
             className="overflow-hidden rounded-none md:rounded-l-2xl md:rounded-r-none"
           />
           {!!description && <p className="px-4 py-2 text-center">{description}</p>}
         </div>
      ))}
    </div>
  );
}
