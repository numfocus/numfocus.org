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
    <>
      <div className="hero-container bg-light-teal-50 mx-auto mb-6">
        <div className="grid grid-cols-12">
          <div className="col-span-10 col-start-2 py-8 md:col-span-8 md:col-start-3">
            <h3
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
            <h5 className="mb-4">{subheader}</h5>
            <div
              className="prose mb-6"
              dangerouslySetInnerHTML={{ __html: rich_text }}
            />
            <div className="buttons mr-12 flex flex-row gap-2"></div>
          </div>
          <div className="col-span-2 hidden overflow-hidden rounded-l-4xl rounded-r-none md:block">
            <img
              src={`${assetBaseUrl}${image}`}
              alt={title}
              className="h-full object-cover opacity-50"
            />
          </div>
        </div>
      </div>
    </>
  );
}
