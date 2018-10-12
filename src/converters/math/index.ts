import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';
import visit = require('unist-util-visit');

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function math(this: ReVIEWCompiler, node: MDAST.Math & ConvertOptionsNode, parent: UNIST.Parent) {
  let label = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  visit(nextNode, 'crossReferenceLabel', (crNode: MDAST.CrossReferenceLabel) => {
    label += this.convert(crNode);
    Object.assign(crNode, { type: 'ignore' });
    return true;
  });

  return defaultsDeep(
    {
      label,
    },
    node,
  ) as UNIST.Node;
}
