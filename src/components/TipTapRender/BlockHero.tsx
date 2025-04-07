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
    <div className="bg-light-teal-50 grid grid-cols-12 py-8 pl-24">
      <div className="col-span-6 col-start-2 mr-24">
        <h3
          className="mb-4 [&_strong]:text-red-400"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <h5 className="mb-4">{subheader}</h5>
        <div className="mb-6" dangerouslySetInnerHTML={{ __html: rich_text }} />
        <div className="buttons mr-12 flex flex-row gap-2"></div>
      </div>
      <div className="col-span-5">
        <img
          src={`${assetBaseUrl}${image}`}
          alt={title}
          className="h-full w-full rounded-l-2xl rounded-r-none object-fill"
        />
      </div>
    </div>
  );
}
