interface Props {
  image?: any;
}
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;

export default function BlockImage({
  image,
}: Props) {
  const { id, title } = image;
  return (
    <img
      src={`${assetBaseUrl}${id}`}
      alt={title}
      className="w-full overflow-hidden rounded-none md:rounded-l-2xl md:rounded-r-none"
    />
  );
}
