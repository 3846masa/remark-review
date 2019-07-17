"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function footnoteReference(node) {
    const footnotes = this.footnotes;
    const identifiers = footnotes.map((f) => f.identifier);
    node.identifier = `${identifiers.indexOf(`${node.identifier}`) + 1}`;
    return node;
}
exports.default = footnoteReference;
