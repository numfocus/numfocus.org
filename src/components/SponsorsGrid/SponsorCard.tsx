import type { Sponsor } from 'env';

export function SponsorCardContent({ sponsor }: { sponsor: Sponsor; }) {
  const {
    name,
    type,
    logo,
    description
  } = sponsor;

  return (
    <div className="grid grid-rows-4 gap-2 h-full items-center">
      <div className="row-span-3">
        <img
          src={logo}
          alt={name}
          className="mx-auto my-5 px-8 rounded-lg"
        />
      </div>
      <h5 className="text-center row-span-1">{name}</h5>
      {/* <p className="text-center font-normal my-1 text-gray-500">{name}</p> */}
    </div>
  )
};

export default function SponsorCard({
  sponsor,
  onExpand
}: {
  sponsor: Sponsor;
  onExpand?: () => void;
}) {
  return (
    <div
      className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 cursor-pointer hover:opacity-75 transition-opacity"
      onClick={onExpand}
      onKeyDown={onExpand}
    >
      <SponsorCardContent sponsor={sponsor} />
    </div>
  );
}