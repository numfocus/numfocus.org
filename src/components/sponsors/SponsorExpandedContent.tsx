import { SponsorCardContent } from '@components/sponsors/SponsorCard';
import Button from '@components/ui/LinkButton';
import type { ButtonType, Sponsor } from 'env';

export default function SponsorExpandedContent({
  sponsor,
}: {
  sponsor: Sponsor;
}) {
  const { description, logo, name, type, url } = sponsor;

  const button: ButtonType = {
    link: {
      text: 'Visit website',
      type_of_link: 'external',
      external_link: url,
    },
    style: 'light',
    variant: 'default',
  };

  return (
    <div className="grid grid-cols-12 items-center gap-4 px-12 py-8 text-sm">
      <div className="col-span-6 sm:col-span-5 lg:col-span-4">
        <img src={logo} alt={name} className="my-6 sm:mx-auto sm:px-10" />
      </div>
      <div className="col-span-12 sm:col-span-7 sm:border-l-2 sm:pl-8 lg:col-span-8">
        <p className="my-1 text-gray-500">{type}</p>
        <h5 className="">{name}</h5>
        <div
          className="py-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button button={button} arrow="right" />
      </div>
    </div>
  );
}
