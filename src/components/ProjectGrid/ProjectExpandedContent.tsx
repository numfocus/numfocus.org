import Markdown from 'react-markdown';

import Button from '@components/Atoms/Button';
import type { Project } from 'env';

const ListSection = ({ title, items }: { title: string; items?: string[] }) =>
  items && (
    <div className="">
      <p className="pb-2 font-bold">{title}</p>
      <p className="text-light-teal-700">{items.join(', ')}</p>
    </div>
  );

export default function ProjectDialogContent({
  project,
}: {
  project: Project;
}) {
  const {
    features,
    name,
    industries,
    languages,
    logo,
    short_description,
    support_year_start,
    website_link,
  } = project.data;
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-6 text-sm sm:p-6">
      <div className="col-span-7 border-r-1 border-orange-500">
        {!!logo?.src && (
          <img
            src={logo.src}
            alt={name}
            className="float-right h-42 w-42 p-4"
          />
        )}
        <div>
          <h5 className="pb-4">{name}</h5>
          {support_year_start && (
            <p className="pb-4 italic">{`NumFOCUS Sponsored Project since ${support_year_start}`}</p>
          )}
          <div className="pb-4 text-sm">
            <Markdown>{short_description}</Markdown>
          </div>
        </div>
      </div>
      <div className="col col-span-5 flex flex-col gap-5">
        <ListSection title="Languages" items={languages} />
        <ListSection title="Industries" items={industries} />
        <ListSection title="Features" items={features} />

        {!!website_link && (
          <Button
            button={{
              style: 'light',
              text: `Visit ${name} website`,
              link: website_link,
              variant: 'default',
            }}
            arrow="right"
          />
        )}
        <Button
          icon="heart"
          button={{
            style: 'light',
            text: `Donate to ${name}`,
            link: '#',
            variant: 'special',
          }}
        />
      </div>
    </div>
  );
}
