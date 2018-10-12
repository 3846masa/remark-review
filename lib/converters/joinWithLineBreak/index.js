"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function joinWithLineBreak(node) {
    const value = this.all(node).join('\n');
    return lodash_1.defaultsDeep({
        value,
    }, node);
}
exports.default = joinWithLineBreak;
