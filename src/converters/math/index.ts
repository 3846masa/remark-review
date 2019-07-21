import * as unist from 'unist';
import * as mdast from 'mdast';
import defaultsDeep from 'lodash.defaultsdeep';
import visit from 'unist-util-visit';

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function math(this: ReVIEWCompiler, node: mdast.Math & ConvertOptionsNode, parent: unist.Parent) {
  let label = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  visit(nextNode, 'crossReferenceLabel', (crNode: mdast.CrossReferenceLabel) => {
    label += this.convert(crNode);
    Object.assign(crNode, { type: 'ignore' });
    return true;
  });

  return defaultsDeep(
    {
      label,
    },
    node,
  ) as unist.Node;
}
