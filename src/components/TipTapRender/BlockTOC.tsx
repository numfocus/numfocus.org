import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

import { TipTapRender, type NodeHandler, type TipTapNode } from '@components/TipTapRender/TipTapRender';
import BodyContent from './BodyContent';


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

  const tocItemCommonStyle = "pl-20 py-2"

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <div className="bg-blue-50 py-4 sticky top-0">
          <p className={twMerge(tocItemCommonStyle, 'font-bold border-b-1 border-black')}>Table of Contents</p>
          <ul>
            {sectionHeaders.map((header: TipTapNode) => {
              if (!header.content) return null;

              const headerLevel = header.attrs?.level;
              const indentStyle = `pl-${(headerLevel - 1) * 4}`

              return header.content.map(({ text }, i) => (
                <li key={i} className={twMerge(tocItemCommonStyle)}>
                  <a href={`#${slugify(text)}`} className={twMerge(indentStyle, "text-gray-600 hover:text-blue-400")}>
                    {text}
                  </a>
                </li>
              ))
            })}
          </ul>
        </div>
        
      </div>
      <div className="col-span-9">
        <TipTapRender handlers={{ ...BodyContent, heading: TOCSectionHeading }} node={content as TipTapNode} />
      </div>
    </div>
  );
}

const TOCSectionHeading: NodeHandler = (props) => {
  const id = props.node.content?.map(({ text }) => text)[0]
  return (
    <div className="ml-10 mr-20">
      <h4 id={slugify(id)} className="mt-8 mb-0 pb-2 text-xl border-b-2 border-blue-400">{props.children}</h4>
    </div>
  );
};