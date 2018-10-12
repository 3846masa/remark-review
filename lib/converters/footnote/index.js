"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function footnote(node) {
    const footnotes = this.footnotes;
    const identifiers = footnotes.map((f) => f.identifier);
    let identifier = 1;
    while (identifiers.indexOf(`${identifier}`) !== -1) {
        identifier++;
    }
    const definitionNode = {
        type: 'footnoteDefinition',
        identifier: `${identifier}`,
        children: node.children,
        position: node.position,
    };
    footnotes.push(definitionNode);
    const referenceNode = {
        type: 'footnoteReference',
        identifier: `${identifier}`,
        position: node.position,
    };
    return referenceNode;
}
exports.default = footnote;
