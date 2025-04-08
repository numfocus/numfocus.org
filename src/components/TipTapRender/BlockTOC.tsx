import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import slugify from 'slugify';

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
    <div className="bg-light-teal-50 grid grid-cols-12">
      <div className="col-span-2">
        <h5>Table of Contents</h5>
        <ul>
          {sectionHeaders.map((header: TipTapNode) => {
            if (!header.content) return null;

            const headerLevel = header.attrs?.level;
            const indentStyle = `pl-${(headerLevel - 1) * 4}`

            return header.content.map(({ text }, i) => (
              <li key={i} className={indentStyle}>
                <a href={`#${slugify(text)}`}>
                  {text}
                </a>
              </li>
            ))
          })}
        </ul>
      </div>
      <div className="col-span-10">
        <TipTapRender handlers={BodyContent} node={content as TipTapNode} />
      </div>
    </div>
  );
}
