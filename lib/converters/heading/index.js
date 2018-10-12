"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visit = require("unist-util-visit");
const lodash_1 = require("lodash");
function heading(node) {
    let label = '';
    visit(node, 'crossReferenceLabel', (crNode) => {
        label += this.convert(crNode);
        Object.assign(crNode, { type: 'ignore' });
        return true;
    });
    return lodash_1.defaultsDeep({
        label,
        value: this.all(node).join(''),
    }, node);
}
exports.default = heading;
