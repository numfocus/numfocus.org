import Button from '@components/Atoms/Button';
import type { Image, ButtonType as TButton } from 'env';
import { twMerge } from 'tailwind-merge';
import BlockImage from './BlockImage';

interface Props {
  headline: string;
  subheader?: string;
  rich_text: string;
  image?: Image;
  button?: TButton[];
}

export default function BlockHero({
  headline,
  subheader,
  rich_text,
  image,
  button,
}: Props) {
  const hasImage = !!image;

  return (
    <div className="bg-light-teal-50 grid grid-cols-12 px-8 py-8 md:px-0 md:pl-24">
      <div
        className={twMerge(
          'col-span-12 md:mr-24 lg:col-start-2',
          hasImage && 'mr-0 md:col-span-6'
        )}
      >
        <h3
          className="mb-4 text-2xl md:text-3xl [&_strong]:text-red-400"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <h5 className="mb-4">{subheader}</h5>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: rich_text }} />
        <div className="buttons max-w-100 mr-12 flex flex-row gap-2">
          {button?.map((b, index) => (
            <Button key={`${b.text}-${index}`} button={b} arrow="right" />
          ))}
        </div>
      </div>
      {hasImage && (
        <div className="order-first col-span-full mb-4 object-fill md:order-none md:col-span-5 md:col-start-8 md:mb-0">
          <BlockImage alignment="full" image={image} />
        </div>
      )}
    </div>
  );
}
