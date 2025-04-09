import PrettyJson from '@components/Atoms/PrettyJson';
import Button from '@components/Atoms/Button';

interface Props {
  page: any
}

export default function BlockRelatedPage({
  page
}: Props) {
  const { button_text: buttonText, style } = page.block_related_page_id;
  const { slug, title } = page.item;

  const heading = page.collection === 'case_studies' ? 'Case Study' : null
  const linkTarget = `${page.collection === 'case_studies' ? '/case-studies' : ''}/${slug}`;

  return (
    <div className="float-right">
      {heading && (
        <p>{heading}</p>
      )}
      <h5>{title}</h5>
      <Button
        button={{
          text: buttonText,
          link: linkTarget,
          variant: "primary"
        }}
        arrow="right"
      />
      {PrettyJson(page)}
    </div>
  );
}
