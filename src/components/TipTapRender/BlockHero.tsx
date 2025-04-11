import { twMerge } from 'tailwind-merge';
import type { Button as TButton, Image } from 'env';
import BlockImage from './BlockImage';
import Button from '@components/Atoms/Button';

interface Props {
  headline: string;
  subheader?: string;
  rich_text: string;
  image?: Image;
  button?: TButton[]
}

export default function BlockHero({
  headline,
  subheader,
  rich_text,
  image,
  button
}: Props) {
  const hasImage = !!image;

  return (
    <div className="bg-light-teal-50 grid grid-cols-12 py-8 px-8 md:pl-24 md:px-0">
      <div className={twMerge("col-span-12 lg:col-start-2 md:mr-24", hasImage && "mr-0 md:col-span-6")}>
        <h3
          className="mb-4 text-2xl md:text-3xl [&_strong]:text-red-400"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <h5 className="mb-4">{subheader}</h5>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: rich_text }} />
        <div className="buttons flex flex-row gap-2 mr-12">
          {
            button &&
              button.map((b) => (
                <Button button={b} arrow="right" />
              ))
          }
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
