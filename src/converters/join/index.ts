import ReviewCompiler from '../../ReviewCompiler';

export default function blockquote(
  this: ReviewCompiler,
  node: any,
) {
  node.value = this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
  return node;
}
