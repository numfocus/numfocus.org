import getAssetUrl from '@utils/getAssetUrl';
import type { CustomContentItem } from 'env';

export default function LinkCard(item: CustomContentItem) {
  const { image, type_of_link, external_link, internal_link, short_description, text } = item;
  let link = '';
  if (type_of_link === 'external') {
    link = external_link;
  } else {
    const rawLink = internal_link[0]?.item?.slug;
    if (rawLink) {
      link = `/${rawLink}`
    }
  }

  return (
    <a
      href={`${link}`}
      target="_blank"
      rel="noreferrer"
      className="transition-opacity hover:opacity-70"
    >
      <div className="relative h-40 w-full rounded-lg mb-6">
        {!!image && (
          <img
            src={getAssetUrl(image.id)}
            alt={text}
            className="h-full w-full rounded-lg object-cover"
          />
        )}
      </div>
      <div className="max-w-xl">
        <h3 className="my-3 text-center text-xl font-semibold text-gray-900 group-hover:text-gray-600">
          {text}
        </h3>
        <div 
          className="my-3 text-center"
          dangerouslySetInnerHTML={{ __html: short_description }}
        />
      </div>
    </a>
  );
}
