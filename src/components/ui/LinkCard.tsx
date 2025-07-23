import type { CustomContentItem } from 'env';
import Link from './Link';

export default function LinkCard(item: CustomContentItem) {
  const { image, short_description, link } = item;
  
  return (
    <Link link={link}>
      <div className="transition-opacity hover:opacity-70">
        <div className="relative h-40 w-full rounded-lg mb-6">
          {!!image && (
            <img
              src={image.src}
              alt={link.text}
              className="h-full w-full rounded-lg object-cover"
            />
          )}
        </div>
        <div className="max-w-xl">
          <h3 className="my-3 text-center text-xl font-semibold text-gray-900 group-hover:text-gray-600">
            {link.text}
          </h3>
          <div 
            className="my-3 text-center"
            dangerouslySetInnerHTML={{ __html: short_description }}
          />
        </div>
      </div>
    </Link>
  );
}
