import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';

import { TipTapRender, type TipTapNode } from '@components/TipTapRender/TipTapRender';
import BodyContent from './BodyContent';
import PrettyJson from '@components/Atoms/PrettyJson';

interface Props {
  content: any;
  editorNodes: any;
}

export default function BlockTOC({
  content,
  editorNodes
}: Props) {
  injectDataIntoContent(editorNodes, content)

  const sectionHeaders = content.content.filter(({ type }) => type === 'heading')

  return (
    <div className="bg-light-teal-50 grid grid-cols-12 pt-0 pl-0 md:py-8 md:pl-24">
      <div className="col-span-10 mr-0 md:col-span-6 md:col-start-2 md:mr-24">
        <h5>Table of Contents</h5>
        <ul>
          {sectionHeaders.map((header: TipTapNode) => {
            if (!header.content) return null;

            const headerLevel = header.attrs?.level;
            let indentStyle = '';
            if (headerLevel === 2) {
              indentStyle = 'pl-4'
            } else if (headerLevel === 3) {
              indentStyle = 'pl-8'
            } else if (headerLevel === 4) {
              indentStyle = 'pl-12'
            }

            return header.content.map(({ text }) => (
              <li className={indentStyle}>{text}</li>
            ))
          })}
        </ul>
      </div>
      <div>
        <TipTapRender handlers={BodyContent} node={content as TipTapNode} />
      </div>
    </div>
  );
}
