import ReviewCompiler from '../../ReviewCompiler';
import visit = require('unist-util-visit');

export default function blockMathjax(
  this: ReviewCompiler,
  node: any,
  parent: any,
) {
  node.label = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  visit(nextNode, 'crossReferenceLabel', (crNode: any) => {
    node.label += this.convert(crNode);
  });

  return node;
}
