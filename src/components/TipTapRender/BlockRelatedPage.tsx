import Button from '@components/Atoms/Button';
import { twMerge } from 'tailwind-merge';

interface Props {
  page: any;
}

export default function BlockRelatedPage({ page }: Props) {
  const { button_text: buttonText, variant } = page.block_related_page_id;
  const { slug, title } = page.item;

  const heading =
    page.collection === 'case_studies' ? 'Case Study' : 'Lorem Ipsum';
  const linkTarget = `${page.collection === 'case_studies' ? '/case-studies' : ''}/${slug}`;

  const blockStyle =
    variant === 'default'
      ? 'bg-blue-400 text-white'
      : 'border-t-6 border-b-6 border-blue-400';

  return (
    <div
      className={twMerge(
        'float-right m-4 px-5 py-5 sm:w-full md:w-1/2 lg:w-1/3',
        blockStyle
      )}
    >
      {heading && <p className="italic">{heading}</p>}
      <h5 className="py-4 font-normal">{title}</h5>
      <Button
        button={{
          style: 'light',
          text: buttonText,
          link: linkTarget,
          variant: variant,
        }}
        arrow="right"
      />
    </div>
  );
}
