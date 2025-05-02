import type { CustomContentItem } from 'env';
import getAssetUrl from '@utils/getAssetUrl';

export default function LinkCard({ image, link, text }: CustomContentItem) {
  return (
    <a
      href={`${link}`}
      target="_blank"
      className="transition-opacity hover:opacity-70"
    >
      <div className="relative h-40 w-full rounded-lg">
        {!!image && (
          <img
            src={getAssetUrl(image)}
            alt={text}
            className="h-full w-full rounded-lg object-cover"
          />
        )}
      </div>
      <div className="max-w-xl">
        <h3 className="mt-3 text-center text-xl font-semibold text-gray-900 group-hover:text-gray-600">
          {text}
        </h3>
      </div>
    </a>
  );
}
