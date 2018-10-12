import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function joinWithLineBreak(this: ReVIEWCompiler, node: UNIST.Parent) {
  const value = this.all(node).join('\n');
  return defaultsDeep(
    {
      value,
    },
    node,
  ) as UNIST.Node;
}
