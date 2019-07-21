import * as unist from 'unist';
import defaultsDeep from 'lodash.defaultsdeep';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function join(this: ReVIEWCompiler, node: unist.Parent) {
  const value = this.all(node)
    .join('')
    .trim();
  return defaultsDeep(
    {
      value,
    },
    node,
  ) as unist.Node;
}
