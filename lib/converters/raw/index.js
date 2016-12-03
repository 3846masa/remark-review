"use strict";
function raw(node) {
    node.value = node.value.replace(/\t/g, '\x20\x20\x20\x20');
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = raw;
