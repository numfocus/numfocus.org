import type { Image } from 'env';

interface Props {
  alignment?: 'full' | 'left' | 'right';
  image: Image;
  link?: string;
}
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

export default function BlockImage({ alignment, image, link }: Props) {
  const { description, title, src } = image;

  let alignStyle: string;

  if (alignment === 'full') {
    alignStyle = 'w-full';
  } else if (alignment === 'left') {
    alignStyle = 'float-left';
  } else {
    alignStyle = 'float-right';
  }

  return (
    <div className={alignStyle}>
      <img
        src={src}
        alt={title}
        className="overflow-hidden rounded-none md:rounded-l-2xl md:rounded-r-none"
      />
      {!!description && <p className="px-4 py-2 text-center">{description}</p>}
    </div>
  );
}
