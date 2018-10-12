import { MDAST } from 'mdast';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function footnote(this: ReVIEWCompiler, node: MDAST.Footnote) {
  const footnotes = this.footnotes;
  const identifiers = footnotes.map((f) => f.identifier);

  let identifier = 1;
  while (identifiers.indexOf(`${identifier}`) !== -1) {
    identifier++;
  }

  const definitionNode: MDAST.FootnoteDefinition = {
    type: 'footnoteDefinition',
    identifier: `${identifier}`,
    children: node.children,
    position: node.position,
  };
  footnotes.push(definitionNode);

  const referenceNode: MDAST.FootnoteReference = {
    type: 'footnoteReference',
    identifier: `${identifier}`,
    position: node.position,
  };
  return referenceNode;
}
