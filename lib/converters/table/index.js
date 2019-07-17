"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const visit = require("unist-util-visit");
function table(node, parent) {
    const align = node.align.concat().map((a) => a || 'left');
    const alignStr = align.shift()[0].toLowerCase() +
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
        const tblCapNode = nextNode;
        visit(tblCapNode, 'crossReferenceLabel', (crNode) => {
            label += this.convert(crNode);
            Object.assign(crNode, { type: 'ignore' });
            return true;
        });
        caption = this.all(tblCapNode)
            .join('')
            .replace(/\n/g, '')
            .trim();
    }
    return lodash_1.defaultsDeep({
        label,
        caption,
        align: alignStr,
        value: this.all(node).join('\n'),
    }, node);
}
exports.default = table;
