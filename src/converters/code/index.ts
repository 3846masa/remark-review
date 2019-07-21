import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';
import visit = require('unist-util-visit');

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function code(this: ReVIEWCompiler, node: MDAST.Code & ConvertOptionsNode, parent: UNIST.Parent) {
  let label = '';
  let caption = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'tableCaption') {
    const tblCapNode = nextNode as MDAST.TableCaption;
    visit(tblCapNode, 'crossReferenceLabel', (crNode: MDAST.CrossReferenceLabel) => {
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
  ) as UNIST.Node;
}
