import type { CustomContentItem } from 'env';
import getAssetUrl from '@utils/getAssetUrl';

export default function LinkCard({ image, link, text }: CustomContentItem) {
  return (
    <a href={`${link}`} target="_blank" className="hover:opacity-70 transition-opacity">
      <div className="h-40 w-full rounded-lg relative">
        {!!image && (
          <img src={getAssetUrl(image)} alt={text} className="w-full h-full object-cover rounded-lg"/>
        )}
      </div>
      <div className="max-w-xl">
        <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-gray-600 text-center">
          {text}
        </h3>
      </div>
    </a>
  );
}
