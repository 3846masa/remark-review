import * as unist from 'unist';
import * as mdast from 'mdast';

import defaultsDeep from 'lodash.defaultsdeep';
import visit from 'unist-util-visit';

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function table(this: ReVIEWCompiler, node: mdast.Table & ConvertOptionsNode, parent: unist.Parent) {
  const align = (node.align || []).concat().map((a) => a || 'left');
  const alignStr =
    align.shift()![0].toLowerCase() +
    '|' +
    align
      .map((align) => align[0])
      .join('')
      .toLowerCase();

  let label = '';
  let caption = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'tableCaption') {
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
      align: alignStr,
      value: this.all(node).join('\n'),
    },
    node,
  ) as unist.Node;
}
