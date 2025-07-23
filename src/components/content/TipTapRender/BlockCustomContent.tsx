import Container from '@components/ui/Container';
import LinkCard from '@components/ui/LinkCard';
import type { CustomContentBlock, CustomContentItem } from 'env';

interface Props {
  content: CustomContentBlock;
}

export default function BlockCustomContent({ content }: Props) {
  return (
    <div className="custom-content-block my-12">
      <h4 className="text-center">{content.title}</h4>
      <div className="mx-auto my-12 grid max-w-screen-xl grid-cols-12 gap-8 md:grid-cols-12">
        {content.items.map((item) => (
          <div key={item.id} className="col-span-12 md:col-span-4">
            <LinkCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
