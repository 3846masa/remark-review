import * as unist from 'unist';
import ReVIEWCompiler from '../ReVIEWCompiler';

import join from './join';
import joinWithLineBreak from './joinWithLineBreak';

import ignore from './ignore';
import escape from './escape';
import heading from './heading';
import reference from './reference';
import image from './image';
import footnote from './footnote';
import table from './table';
import crossReference from './crossReference';
import footnoteReference from './footnoteReference';
import math from './math';
import link from './link';
import code from './code';

const raw = (node: unist.Node) => node;

export interface Converters {
  [key: string]: <Node extends unist.Node>(this: ReVIEWCompiler, node: Node, parent?: unist.Parent) => unist.Node;
}

export { ReVIEWCompiler };
export default {
  ignore,
  image,
  table,
  heading,
  footnote,
  crossReference,
  footnoteReference,
  math,
  link,
  code,
  yaml: ignore,
  html: ignore,
  definition: ignore,
  captionBlock: ignore,
  footnoteDefinition: ignore,
  delete: join,
  strong: join,
  emphasis: join,
  tableCell: join,
  paragraph: join,
  root: joinWithLineBreak,
  blockquote: joinWithLineBreak,
  list: joinWithLineBreak,
  listItem: join,
  tableRow: joinWithLineBreak,
  crossReferenceLabel: raw,
  inlineCode: escape,
  text: escape,
  linkReference: reference,
  imageReference: reference,
} as Converters;
