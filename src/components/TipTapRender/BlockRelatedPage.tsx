import Button from '@components/Atoms/Button';
import { twMerge } from 'tailwind-merge';

interface Props {
  page: any
}

export default function BlockRelatedPage({
  page
}: Props) {
  const { button_text: buttonText, variant } = page.block_related_page_id;
  const { slug, title } = page.item;

  const heading = page.collection === 'case_studies' ? 'Case Study' : 'Lorem Ipsum'
  const linkTarget = `${page.collection === 'case_studies' ? '/case-studies' : ''}/${slug}`;

  const blockStyle = variant === 'primary' ? 'bg-blue-400 text-white' : 'border-t-6 border-b-6 border-blue-400';

  return (
    <div className={twMerge("float-right sm:w-full md:w-1/2 lg:w-1/3 px-5 py-5 m-4", blockStyle)}>
      {heading && (
        <p className='italic'>{heading}</p>
      )}
      <h5 className="py-4 font-normal">{title}</h5>
      <Button
        button={{
          text: buttonText,
          link: linkTarget,
          variant: variant === 'primary' ? "primary" : "primaryBlue"
        }}
        arrow="right"
      />
    </div>
  );
}
