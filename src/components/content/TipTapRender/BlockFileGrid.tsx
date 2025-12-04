import Container from '@components/layout/Container.astro';
import Hero from '@components/layout/Hero.astro';
import directus from '@directus/directus';
import { readItems, readSingleton } from '@directus/sdk';
import getPageHero from '@utils/getPageHero';
import { FileDown } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

const files = await directus.request(readItems('files'));

// console.log(files[0].description.blocks[0].data.text)

const assetBaseUrl = `${import.meta.env.DIRECTUS_URL}/assets/`;

interface Props {
  id: number;
  file_category: string;
  category_description: string;
}

export default function BlockFileGrid({
  id,
  file_category,
  category_description,
}: Props) {
  return (
    <div className="my-24">
      <div className="category-container mb-12">
        <h2 className="py-2 text-2xl font-semibold">{file_category}</h2>
        <div
          className="mb-4 text-sm font-normal"
          dangerouslySetInnerHTML={{ __html: category_description }}
        />
        <Table className="overflow-hidden border outline-1 outline-gray-400">
          <TableCaption />
          <TableHeader>
            <TableRow>
              <TableHead className="">Document</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files
              .filter((e) => e.file_category === id)
              .sort((a, b) => b.year - a.year)
              .map((file) => (
                <TableRow key={file.id} className="h-16">
                  <TableCell className="font-semibold">
                    {file.file_name}
                  </TableCell>
                  <TableCell
                    className="text-xs md:text-sm"
                    dangerouslySetInnerHTML={{
                      __html: file.description?.blocks[0].data.text,
                    }}
                  />
                  <TableCell>{file.year}</TableCell>
                  <TableCell className="text-right">
                    <a
                      className="text-brand-teal flex w-full place-content-center transition hover:text-teal-800"
                      href={`${assetBaseUrl}${file.file}?download`}
                      target="_blank"
                      download={file.name}
                      rel="noreferrer"
                    >
                      <FileDown height={28} width={28} className="text-right" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter />
        </Table>
      </div>
    </div>
  );
}
