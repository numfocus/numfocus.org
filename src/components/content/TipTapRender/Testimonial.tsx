import Container from '@components/ui/Container';
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;
import type { Image } from 'env';
import { Quote } from 'lucide-react';

interface Props {
  id: string;
  content: string;
  image?: Image;
  author?: string;
}

export default function Testimonial({ id, content, image, author }: Props) {
  return (
    <Container>
      <figure className="border-l-12 my-4 grid grid-cols-12 items-center gap-x-6 gap-y-8 border-blue-400 pl-8 lg:gap-x-10">
        <div className="relative col-span-8 flex h-full flex-col justify-between md:col-span-6">
          <Quote className="fill-blue-400 stroke-blue-400" />
          <blockquote
            className="text-gray-900"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {author && (
            <figcaption className="text-base italic text-gray-900">
              {author}
            </figcaption>
          )}
        </div>
        {image && (
          <div className="col-span-4 w-full md:col-span-2">
            <img
              alt={image.title}
              src={image.src}
              className="rounded-sm bg-indigo-50 md:rounded-xl lg:rounded-3xl"
            />
          </div>
        )}
      </figure>
    </Container>
  );
}
