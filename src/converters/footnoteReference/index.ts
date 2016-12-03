import ReviewCompiler from '../../ReviewCompiler';

export default function footnote(
  this: ReviewCompiler,
  node: any,
) {
  const footnotes = this.footnotes;
  const identifiers: any[] = footnotes.map((f) => f.identifier);

  node.identifier = identifiers.indexOf(`${node.identifier}`) + 1;
  return node;
}
