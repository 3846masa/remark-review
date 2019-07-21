import * as mdast from 'mdast';
import * as unist from 'unist';
import { defaultsDeep } from 'lodash';

import ReVIEWCompiler from '../../ReVIEWCompiler';
import join from '../join';

export default function link(this: ReVIEWCompiler, node: mdast.Link) {
  // For auto-link
  if (node.children.every((node) => node.type === 'text')) {
    const value = node.children.map((node) => node.value).join('');
    if (node.url === value) {
      return defaultsDeep({ value }, node) as unist.Node;
    }
  }

  return join.call(this, node) as unist.Node;
}
