"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function join(node) {
    const value = this.all(node)
        .join('')
        .trim()
        .replace(/\t/g, '\x20\x20');
    return lodash_1.defaultsDeep({
        value,
    }, node);
}
exports.default = join;
