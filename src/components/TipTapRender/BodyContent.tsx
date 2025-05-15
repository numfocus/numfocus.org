import { injectDataIntoContent } from 'directus-extension-flexible-editor/content';
import type React from 'react';
import type { ReactElement } from 'react';

import PrettyJson from '@components/Atoms/PrettyJson';
import fetchRemoteImages from '@utils/fetchRemoteImages';
import type { BlockProject, CustomContentItem, Image } from 'env';
import BlockCustomContent from './BlockCustomContent';
import BlockHero from './BlockHero';
import BlockImage from './BlockImage';
import BlockImageGallery from './BlockImageGallery';
import BlockProjects from './BlockProjects';
import BlockRelatedPage from './BlockRelatedPage';
import BlockTOC from './BlockTOC';
import Testimonial from './Testimonial';
import type { NodeHandler, NodeHandlers, NodeProps } from './TipTapRender';

const BulletList: NodeHandler = ({ node, Container }) => {
  return (
    <Container>
      <ul>
        {node.content?.map(({ content }) =>
          content?.map(({ content }) =>
            content?.map(({ text, id }) => (
              <li key={id} className="ml-4 list-disc">
                {text}
              </li>
            ))
          )
        )}
      </ul>
    </Container>
  );
};

const Heading: NodeHandler = ({ children, Container }) => {
  return (
    <Container>
      <h4 className="mb-0 mt-8 text-xl">{children}</h4>
    </Container>
  );
};

const TextRender: NodeHandler = (props: NodeProps) => {
  if (!props.node.text) {
    console.log('missing text', props);
    return <></>;
  }

  const payload: string = props.node.text;

  // define variable for react style
  const style: React.CSSProperties = {};

  let styles = '';
  let RelationMark: ReactElement | null = null;
  let LinkMark: ReactElement | null = null;

  // dynamically process text marks
  // biome-ignore lint/complexity/noForEach: <explanation>
  props.node.marks?.forEach((mark) => {
    switch (mark.type) {
      case 'relation-mark': {
        const data = mark.attrs.data;
        RelationMark =
          mark.attrs.collection === 'block_testimonial' ? (
            <>
              <Testimonial
                id={data.id}
                author={data?.author}
                content={data.content}
                image={data.image}
              />
              {PrettyJson(data)}
            </>
          ) : (
            PrettyJson(mark)
          );
        break;
      }
      case 'bold':
        styles = 'font-semibold';
        break;
      case 'italic':
        styles = 'italic';
        break;
      case 'underline':
        styles = 'underline';
        break;
      case 'textStyle': {
        const markAttrs = mark.attrs;
        if (markAttrs?.color) {
          style.color = markAttrs.color;
        }
        break;
      }
      case 'strike':
        styles = 'line-through';
        break;
      case 'link':
        LinkMark = (
          <a
            href={mark.attrs.href}
            target={mark.attrs.target}
            rel={mark.attrs.rel}
            className="text-blue-400 no-underline hover:underline"
          >
            {payload}
          </a>
        );
        break;
      default:
        console.log('unhandled mark', mark);
    }
  });

  return (
    <>
      {RelationMark && RelationMark}
      {LinkMark ? (
        LinkMark
      ) : (
        <span style={style} className={styles}>
          {payload}
        </span>
      )}
    </>
  );
};

const Paragraph: NodeHandler = ({ children, node, Container }) => {
  // dynamically process text marks
  const style: React.CSSProperties = {};

  if (node.attrs) {
    const attrs = node.attrs;

    if (attrs.textAlign) {
      style.textAlign = attrs.textAlign;
    }
  }

  return (
    <Container>
      <p className="my-4" style={style}>
        {children}
      </p>
    </Container>
  );
};

const HardBreak: NodeHandler = (props) => {
  return <br />;
};

const Passthrough: NodeHandler = (props) => {
  return <>{props.children}</>;
};

const TipTapImage: NodeHandler = (props) => {
  const attrs = props.node.attrs;
  return <img alt={attrs?.alt} src={attrs?.src} title={attrs?.title} />;
};

// TODO #56 resolve async handling of image gallery and client:load directive
const RelationBlock: NodeHandler = async (props) => {
  const attrs = props.node.attrs;
  const data = attrs?.data;

  if (attrs && attrs.collection === 'block_testimonial') {
    return (
      <>
        <Testimonial
          id={data.id}
          author={data.author}
          content={data.content}
          image={data.image}
        />
        {PrettyJson(data)}
      </>
    );
  }
  if (attrs && attrs.collection === 'block_image') {
    return (
      <>
        <BlockImage
          image={data.image}
          alignment={data.alignment}
          link={data.link}
        />
        {/* {PrettyJson(data)} */}
      </>
    );
  }
  if (attrs && attrs.collection === 'block_hero') {
    return (
      <>
        <BlockHero
          headline={data.heading}
          rich_text={data.content}
          image={data.image}
          button={data.button}
        />
        {PrettyJson(data)}
      </>
    );
  }
  if (attrs && attrs.collection === 'block_toc') {
    injectDataIntoContent(data.editor_nodes, data.content);

    return (
      <>
        <BlockTOC content={data.content} />
        {PrettyJson(data)}
      </>
    );
  }
  // TODO: #52 a better solution to checking if data.items is not null
  if (data && attrs && attrs.collection === 'block_custom_content_group') {
    return (
      <>
        <BlockCustomContent content={data} />
        {PrettyJson(data.items)}
      </>
    );
  }
  if (attrs && attrs.collection === 'block_related_page') {
    return (
      <>
        <BlockRelatedPage page={data.page[0]} />
      </>
    );
  }
  if (attrs && attrs.collection === 'block_image_gallery') {
    return (
      <>
        <BlockImageGallery images={data.images} />
        {PrettyJson(data.images)}
      </>
    );
  }
  if (attrs && attrs.collection === 'block_projects_group') {
    const blockProjects: BlockProject[] = [];
    const projects = data.projects;
    projects.map((project: any) => {
      // console.log(project);
      const blockProject: BlockProject = {
        name: project.projects_id.name,
        logo: project.projects_id.logo,
        slug: project.projects_id.slug,
        description: project.projects_id.short_description,
      };
      blockProjects.push(blockProject);
    });

    return <BlockProjects heading={data.heading} projects={blockProjects} />;
  }
  // TODO: #53 a better closing statement for the tiptaprender node
  return (
    // <div className="w-full border border-red-300">
    //   {attrs && <h4>{attrs.collection}</h4>}
    //   <div>{PrettyJson(attrs?.data)}</div>
    // </div>
    <></>
  );
};

const BodyContent: NodeHandlers = {
  bulletList: BulletList,
  text: TextRender,
  paragraph: Paragraph,
  doc: Passthrough,
  hardBreak: HardBreak,
  image: TipTapImage,
  'relation-block': RelationBlock,
  'relation-inline-block': RelationBlock,
  heading: Heading,
};

export default BodyContent;
