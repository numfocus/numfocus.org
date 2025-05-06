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

  const commonStyle = ' sm:max-w-3/4 lg:max-w-2/3';

  return (
    <section className="toc-content">
      <div className="grid grid-cols-12">
        {!!sectionHeaders && (
          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <div className="sticky top-0 bg-gray-50 py-4">
              <div className="border-b-1 mb-2 border-black pl-2">
                <h4 className={twMerge(commonStyle, 'py-2 text-xl')}>
                  Table of Contents
                </h4>
              </div>
              <ul className={commonStyle}>
                {sectionHeaders.map((header: TipTapNode) => {
                  if (!header.content) return null;

                  const headerLevel = header.attrs?.level;
                  const indentStyle = `pl-${(headerLevel - 1) * 4}`;

                  return header.content.map(({ text }, i) => (
                    <li
                      key={slugify(text)}
                      className="border-l-4 border-gray-50 py-3 pl-8 text-gray-600"
                    >
                      <a
                        href={`#${slugify(text)}`}
                        className={twMerge(
                          indentStyle,
                          'block hover:text-black'
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
    </section>
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
        className="mb-0 mt-8 border-b-2 border-black pb-2 text-xl"
      >
        {children}
      </h4>
    </div>
  );
};
