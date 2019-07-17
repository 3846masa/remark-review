"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function escape(node) {
    return lodash_1.defaultsDeep({
        value: escapeReVIEW(node.value),
    }, node);
}
exports.default = escape;
function escapeReVIEW(text) {
    return text.replace(/\}/g, '\\}').replace(/\t/g, '\x20\x20\x20\x20');
}
