import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

import {
  type NodeHandler,
  type TipTapNode,
  type TipTapNodeContainer,
  TipTapRender,
} from '@components/TipTapRender/TipTapRender';
import BodyContent from './BodyContent';

interface Props {
  content: TipTapNode;
}

export default function BlockTOC({ content }: Props) {
  const sectionHeaders = content?.content?.filter(
    ({ type }) => type === 'heading'
  );

  const commonStyle = 'mx-10 sm:mx-auto sm:max-w-3/4 lg:max-w-2/3';

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12">
      {!!sectionHeaders && (
        <div className="col-span-12 sm:col-span-4 lg:col-span-3">
          <div className="sticky top-0 bg-blue-50 py-4">
            <div className="border-b-1 border-black">
              <p className={twMerge(commonStyle, 'py-2')}>Table of Contents</p>
            </div>
            <ul className={commonStyle}>
              {sectionHeaders.map((header: TipTapNode) => {
                if (!header.content) return null;

                const headerLevel = header.attrs?.level;
                const indentStyle = `pl-${(headerLevel - 1) * 4}`;

                return header.content.map(({ text }, i) => (
                  <li key={slugify(text)} className="py-2">
                    <a
                      href={`#${slugify(text)}`}
                      className={twMerge(
                        indentStyle,
                        'block text-gray-600 hover:text-blue-400'
                      )}
                    >
                      {text}
                    </a>
                  </li>
                ));
              })}
            </ul>
          </div>
        </div>
      )}

      <div className="col-span-12 sm:col-span-8 lg:col-span-9">
        <TipTapRender
          handlers={{ ...BodyContent, heading: TOCSectionHeading }}
          node={content}
          Container={TOCSectionContent}
        />
      </div>
    </div>
  );
}

const commonStyle = 'max-w-4xl pl-8 pr-10 md:pl-20 lg:pr-24 xl:pr-0';

const TOCSectionContent: TipTapNodeContainer = (props) => {
  return (
    <div className={commonStyle}>
      <div className="">{props.children}</div>
    </div>
  );
};

const TOCSectionHeading: NodeHandler = ({ children, node }) => {
  const id = node.content?.map(({ text }) => text)[0];
  const level = node.attrs?.level;

  const levelIndentStyle = level === 1 ? 'md:pl-10' : '';

  return (
    <div className={twMerge(commonStyle, levelIndentStyle)}>
      <h4
        id={slugify(id)}
        className="mb-0 mt-8 border-b-2 border-blue-400 pb-2 text-xl"
      >
        {children}
      </h4>
    </div>
  );
};
