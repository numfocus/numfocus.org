import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';

import { TipTapRender, type TipTapNode } from '@components/TipTapRender/TipTapRender';
import BodyContent from './BodyContent';

interface Props {
  node: TipTapNode;
}

export default function BlockTOC({
  node
}: Props) {
  injectDataIntoContent(node.editor_nodes, node.content)

  const tipTapContent = node?.content?.[0]
  if (!tipTapContent) return null;

  return (
    <div className="bg-light-teal-50 grid grid-cols-12 pt-0 pl-0 md:py-8 md:pl-24">
      <div className="col-span-10 mr-0 md:col-span-6 md:col-start-2 md:mr-24">
        <h5>Table of Contents</h5>
      </div>
      <div>
        <TipTapRender handlers={BodyContent} node={tipTapContent} />
      </div>
    </div>
  );
}
