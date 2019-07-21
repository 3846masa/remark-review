import * as unist from 'unist';
import * as mdast from 'mdast';

import defaultsDeep from 'lodash.defaultsdeep';
import visit from 'unist-util-visit';

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function code(this: ReVIEWCompiler, node: mdast.Code & ConvertOptionsNode, parent: unist.Parent) {
  let label = '';
  let caption = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'captionBlock') {
    const tblCapNode = nextNode as mdast.CaptionBlock;
    visit(tblCapNode, 'crossReferenceLabel', (crNode: mdast.CrossReferenceLabel) => {
      label += this.convert(crNode);
      Object.assign(crNode, { type: 'ignore' });
      return true;
    });
    caption = this.all(tblCapNode)
      .join('')
      .replace(/\n/g, '')
      .trim();
  }

  return defaultsDeep(
    {
      label,
      caption,
    },
    node,
  ) as unist.Node;
}
