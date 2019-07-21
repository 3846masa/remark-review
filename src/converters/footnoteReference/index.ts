import * as mdast from 'mdast';
import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function footnoteReference(this: ReVIEWCompiler, node: mdast.FootnoteReference) {
  const footnotes = this.footnotes;
  const identifiers = footnotes.map((f) => f.identifier);

  node.identifier = `${identifiers.indexOf(`${node.identifier}`) + 1}`;
  return node;
}
