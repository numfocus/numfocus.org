import React, { type JSX, type ReactElement } from 'react';
import type { NodeHandlers, NodeProps, NodeHandler } from './TipTapRender';
import Testimonial from './Testimonial';
import BlockHero from './BlockHero';
import BlockImage from './BlockImage';
import BlockProjects from './BlockProjects';
import type { BlockProject } from 'env';
import BlockTOC from './BlockTOC';
import Container from '@components/Atoms/Container';
import PrettyJson from '@components/Atoms/PrettyJson';

const Heading: NodeHandler = (props) => {
  return (
    <Container>
      <h4 className="mt-8 mb-0 text-xl">{props.children}</h4>
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
  let style: React.CSSProperties = {};

  let styles: string = '';
  let RelationMark: ReactElement | null = null;
  let LinkMark: ReactElement | null = null;

  // dynamically process text marks
  props.node.marks &&
    props.node.marks.forEach((mark) => {
      switch (mark.type) {
        case 'relation-mark':
          let data = mark.attrs.data;
          RelationMark =
            mark.attrs.collection === 'block_testimonial' ? (
              <>
                <Testimonial
                  id={data.id}
                  author={data.author}
                  content={data.content}
                  image={data.image.id}
                />
                {PrettyJson(data)}
              </>
            ) : (
              PrettyJson(mark)
            );
          break;
        case 'bold':
          styles = `font-semibold`;
          break;
        case 'italic':
          styles = 'italic';
          break;
        case 'underline':
          styles = 'underline';
          break;
        case 'textStyle':
          const markAttrs = mark.attrs;
          if (!!markAttrs?.color) {
            style.color = markAttrs.color;
          }
          break;
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

const Paragraph: NodeHandler = (props) => {
  // dynamically process text marks
  let style: React.CSSProperties = {};

  if (!!props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.textAlign) {
      style.textAlign = attrs.textAlign;
    }
  }

  return (
    <Container>
      <p className="my-4" style={style}>
        {props.children}
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

const Image: NodeHandler = (props) => {
  const attrs = props.node.attrs;
  return <img alt={attrs?.alt} src={attrs?.src} title={attrs?.title} />;
};

const RelationBlock: NodeHandler = (props) => {
  const attrs = props.node.attrs;
  const data = attrs?.data;

  if (attrs && attrs.collection === 'block_testimonial') {
    return (
      <>
        <Testimonial
          id={data.id}
          author={data.author}
          content={data.content}
          image={data.image.id}
        />
        {PrettyJson(data)}
      </>
    );
  } else if (attrs && attrs.collection === 'block_image') {
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
  } else if (attrs && attrs.collection === 'block_hero') {
    return (
      <>
        <BlockHero
          headline={data.heading}
          rich_text={data.content}
          image={data.image}
        />
        {PrettyJson(data)}
      </>
    );
  } else if (attrs && attrs.collection === 'block_toc') {
    return (
      <>
        <BlockTOC node={data} />
        {PrettyJson(data)}
      </>
    );
  } else if (attrs && attrs.collection === 'block_projects_group') {
    let blockProjects: BlockProject[] = [];
    const projects = data.projects;
    projects.map((project: any) => {
      // console.log(project);
      let blockProject: BlockProject = {
        name: project.projects_id.name,
        logo: project.projects_id.logo,
        slug: project.projects_id.slug,
        description: project.projects_id.short_description,
      };
      blockProjects.push(blockProject);
    });

    // data.projects[0].forEach((project: any) => {

    // });
    return <BlockProjects heading={data.heading} projects={blockProjects} />;
  } else {
    return (
      <div className="w-full border border-red-300">
        {attrs && <h4>{attrs.collection}</h4>}
        <div>{PrettyJson(attrs?.data)}</div>
      </div>
    );
  }
};

const BodyContent: NodeHandlers = {
  text: TextRender,
  paragraph: Paragraph,
  doc: Passthrough,
  hardBreak: HardBreak,
  image: Image,
  'relation-block': RelationBlock,
  'relation-inline-block': RelationBlock,
  heading: Heading,
};

export default BodyContent;
