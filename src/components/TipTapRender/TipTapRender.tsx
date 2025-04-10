import React, { type JSX } from 'react';
import DefaultContainer from '@components/Atoms/Container';

/**
 * Render a tip tap JSON node and all its children
 * @param {TipTapNode} node JSON node to render
 * @param {NodeHandlers} handlers a handler for each node type
 * @param {Container} Container an optional custom render container for TipTapNodes
 * @returns tree of components as react elements
 */
export function TipTapRender(props: {
  node: TipTapNode;
  handlers: NodeHandlers;
  Container?: TipTapNodeContainer;
}): JSX.Element {
  const { node, handlers: mapping, Container = DefaultContainer } = props;
  // recursively render child content
  const children: JSX.Element[] = [];
  node.content &&
    node.content.forEach((child, ix) => {
      children.push(
        <TipTapRender
          node={child}
          handlers={mapping}
          key={`${child.type}-${ix}`}
          Container={Container}
        />
      );
    });
  // return empty if we are missing a handler for this type
  if (!(node.type in props.handlers)) {
    console.warn(`missing type`, node);
    return <></>;
  }
  // render the handler for this type
  const Handler = mapping[node.type];
  return <Handler node={node} Container={Container}>{children}</Handler>;
}

interface Attrs {
  readonly [attr: string]: any;
}

export type TipTapNodeContainer = (props: any) => JSX.Element;

export interface TipTapNode {
  type: string;
  attrs?: Attrs;
  marks?: Attrs[];
  content?: TipTapNode[];
  readonly [attr: string]: any;
}

export interface NodeProps {
  children?: React.ReactNode;
  node: TipTapNode;
  Container: TipTapNodeContainer
}

export type NodeHandler = (props: NodeProps) => JSX.Element;

export interface NodeHandlers {
  readonly [attr: string]: NodeHandler;
}
