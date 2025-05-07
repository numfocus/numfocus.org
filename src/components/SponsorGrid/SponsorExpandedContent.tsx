import Button from '@components/Atoms/Button';
import { SponsorCardContent } from '@components/SponsorGrid/SponsorCard';
import type { ButtonType, Sponsor } from 'env';


export default function SponsorExpandedContent({
  sponsor,
}: {
  sponsor: Sponsor;
}) {
  const { description, logo, name, type, url } = sponsor;

  const button: ButtonType = {
    text: 'Visit website',
    link: url,
    style: 'light',
    variant: 'default'
  }

  return (
    <div className="px-12 py-8 text-sm grid grid-cols-12 gap-4 items-center">
      <div className="col-span-4">
        <img
          src={logo}
          alt={name}
          className="mx-auto px-10 rounded-lg max-w-65"
        />
      </div>
      <div className="col-span-8 border-l-2 pl-8 py-4">
        <p className="my-1 text-gray-500">{type}</p>
        <h5 className="">{name}</h5>
        <div className="py-6" dangerouslySetInnerHTML={{ __html: description }} />
        <Button button={button} arrow="right" />
      </div>
    </div>
  );
}