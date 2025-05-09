import Markdown from 'react-markdown';

import Button from '@components/Atoms/Button';
import type { Project } from 'env';

import { Building, Code, Cog } from 'lucide-react';

const listIcons = {
  Industries: <Building />,
  Languages: <Code />,
  Features: <Cog />,
};

const ListSection = ({ title, items }: { title: string; items?: string[] }) =>
  items && (
    <div className="mb-4">
      <div className="flex flex-row items-center gap-4 pb-2 font-bold">
        {listIcons[title as keyof typeof listIcons]}
        <span> {title}</span>
      </div>
      <p className="capitalize">{items.join(', ')}</p>
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
    technical_details,
    applications,
    support_year_start,
    website_link,
    contribute_link,
  } = project.data;
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-6 text-sm sm:p-6">
      <div className="border-b-1 md:border-r-1 border-brand-gray col-span-full grid grid-cols-1 gap-4 border-r-0 pr-6 md:col-span-7 md:grid-cols-4 md:border-b-0">
        {logo?.src && (
          <img
            src={logo.src}
            alt={name}
            className="col-span-1 col-start-1 float-right w-full max-w-64"
          />
        )}
        <div className="col-span-1 col-start-1 md:col-span-3 md:col-start-2">
          <h5 className="pb-4">{name}</h5>
          {support_year_start && (
            <p className="pb-4 italic">{`NumFOCUS Sponsored Project since ${support_year_start}`}</p>
          )}
          <div className="pb-4 text-sm">
            <Markdown>{short_description}</Markdown>
          </div>
          {technical_details && (
            <>
              <h5 className="mt-2 text-sm">Technical Details</h5>
              <div className="pb-4 text-sm">
                <Markdown>{technical_details}</Markdown>
              </div>
            </>
          )}
          {applications && (
            <>
              <h5 className="mt-2 text-sm">Applications</h5>
              <div className="pb-4 text-sm">
                <Markdown>{applications}</Markdown>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="col col-span-full flex flex-col gap-5 md:col-span-5">
        <ListSection title="Languages" items={languages} />
        <ListSection title="Industries" items={industries} />
        <ListSection title="Features" items={features} />

        {website_link && (
          <Button
            button={{
              style: 'light',
              link: { 
                text: `Visit ${name} website`, 
                type_of_link: 'external',
                external_link: website_link
              },
              variant: 'default',
            }}
            arrow="right"
          />
        )}
        {contribute_link && (
          <Button
            button={{
              style: 'light',
              link: { 
                text: `Contribute to ${name}`, 
                type_of_link: 'external',
                external_link: contribute_link
              },
              variant: 'default',
            }}
            arrow="right"
          />
        )}
        <Button
          button={{
            style: 'light',
            link: { 
              text: `Donate to ${name}`, 
              type_of_link: 'external',
              external_link: '/'
            },
            variant: 'special',
          }}
        />
      </div>
    </div>
  );
}
