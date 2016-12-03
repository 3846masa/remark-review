"use strict";
function escape(node) {
    node.value = escapeReview(node.value);
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = escape;
function escapeReview(text) {
    const escapedText = text.replace(/\}/g, '\\}');
    return escapedText;
}
