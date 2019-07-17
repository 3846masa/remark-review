"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const visit = require("unist-util-visit");
function math(node, parent) {
    let label = '';
    const nextNodeIdx = node.index + 1;
    const nextNode = parent.children[nextNodeIdx];
    visit(nextNode, 'crossReferenceLabel', (crNode) => {
        label += this.convert(crNode);
        Object.assign(crNode, { type: 'ignore' });
        return true;
    });
    return lodash_1.defaultsDeep({
        label,
    }, node);
}
exports.default = math;
