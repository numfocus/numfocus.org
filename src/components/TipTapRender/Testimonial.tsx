import Container from '@components/Atoms/Container';
const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}assets/`;
import { Quote } from 'lucide-react';

interface Props {
  id: string;
  content: string;
  image: string;
  author: string;
}

export default function Testimonial({ id, content, image, author }: Props) {
  return (
    <Container>
      <figure className="my-4 grid grid-cols-12 items-center gap-x-6 gap-y-8 border-l-12 border-blue-400 pl-8 lg:gap-x-10">
        <div className="relative col-span-8 flex h-full flex-col justify-between md:col-span-6">
          <Quote className="fill-blue-400 stroke-blue-400" />
          <blockquote
            className="text-gray-900"
            dangerouslySetInnerHTML={{ __html: content }}
          ></blockquote>
          <figcaption className="text-base text-gray-900 italic">
            {author}
          </figcaption>
        </div>
        <div className="col-span-4 w-full md:col-span-2">
          <img
            alt=""
            src={`${assetBaseUrl}/${image}`}
            className="rounded-sm bg-indigo-50 md:rounded-xl lg:rounded-3xl"
          />
        </div>
      </figure>
    </Container>
  );
}
