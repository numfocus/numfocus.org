interface Props {
  headline: string;
  subheader?: string;
  rich_text: string;
  image?: string;
  title?: string;
}
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

export default function BlockHero({
  headline,
  subheader,
  rich_text,
  image,
  title,
}: Props) {
  return (
    <div className="bg-light-teal-50 grid grid-cols-12 pt-0 pl-0 md:py-8 md:pl-24">
      <div className="col-span-10 col-start-2 mr-0 md:col-span-6 md:mr-24">
        <h3
          className="mb-4 text-2xl md:text-3xl [&_strong]:text-red-400"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <h5 className="mb-4">{subheader}</h5>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: rich_text }} />
        <div className="buttons mr-12 flex flex-row gap-2"></div>
      </div>
      <div className="order-first col-span-full col-start-1 mb-4 md:order-none md:col-span-5 md:mb-0">
        <img
          src={`${assetBaseUrl}${image}`}
          alt={title}
          className="h-full w-full rounded-none object-fill md:rounded-l-2xl md:rounded-r-none"
        />
      </div>
    </div>
  );
}
