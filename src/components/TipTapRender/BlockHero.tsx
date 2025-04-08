import BlockImage from './BlockImage';

interface Props {
  headline: string;
  subheader?: string;
  rich_text: string;
  image?: any;
}

export default function BlockHero({
  headline,
  subheader,
  rich_text,
  image,
}: Props) {
  return (
    <div className="bg-light-teal-50 grid grid-cols-12 pt-0 pl-0 md:py-8 md:pl-24">
      <div className="col-span-10 mr-0 md:col-span-6 md:col-start-2 md:mr-24">
        <h3
          className="mb-4 text-2xl md:text-3xl [&_strong]:text-red-400"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <h5 className="mb-4">{subheader}</h5>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: rich_text }} />
        <div className="buttons mr-12 flex flex-row gap-2"></div>
      </div>
      {!!image && (
        <div className="order-first col-span-full mb-4 object-fill md:order-none md:col-span-5 md:col-start-8 md:mb-0">
          <BlockImage alignment="full" image={image} />
        </div>
      )}
    </div>
  );
}
