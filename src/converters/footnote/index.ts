import * as mdast from 'mdast';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function footnote(this: ReVIEWCompiler, node: mdast.Footnote) {
  const footnotes = this.footnotes;
  const identifiers = footnotes.map((f) => f.identifier);

  let identifier = 1;
  while (identifiers.indexOf(`${identifier}`) !== -1) {
    identifier++;
  }

  const definitionNode: mdast.FootnoteDefinition = {
    type: 'footnoteDefinition',
    identifier: `${identifier}`,
    children: node.children as mdast.BlockContent[],
    position: node.position,
  };
  footnotes.push(definitionNode);

  const referenceNode: mdast.FootnoteReference = {
    type: 'footnoteReference',
    identifier: `${identifier}`,
    position: node.position,
  };
  return referenceNode;
}
