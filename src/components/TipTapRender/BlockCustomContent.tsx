import Container from '@components/Atoms/Container';
import LinkCard from '@components/Atoms/LinkCard';
import type { CustomContentBlock, CustomContentItem } from 'env';

interface Props {
  items: CustomContentBlock;
}

export default function BlockCustomContent({ items }: Props) {
  return (
    <>
      <h4>{items.title}</h4>
      <div className="mx-auto my-12 grid max-w-screen-xl grid-cols-12 gap-8 md:grid-cols-12">
        {items.items.map((item) => (
          <div key={item.id} className="col-span-12 md:col-span-4">
            <LinkCard {...item} />
          </div>
        ))}
      </div>
    </>
  );
}
