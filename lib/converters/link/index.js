"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const join_1 = require("../join");
function link(node) {
    // For auto-link
    if (node.children.every((node) => node.type === 'text')) {
        const value = node.children.map((node) => node.value).join('');
        if (node.url === value) {
            return lodash_1.defaultsDeep({ value }, node);
        }
    }
    return join_1.default.call(this, node);
}
exports.default = link;
