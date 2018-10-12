"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function escape(node) {
    return lodash_1.defaultsDeep({
        value: escapeReVIEW(convertQuote(node.value)),
    }, node);
}
exports.default = escape;
function escapeReVIEW(text) {
    const escapedText = text.replace(/\\\\|[\{\}#\$%&_]|[|]|[<>^~]/g, (str) => {
        if (str === '\\\\') {
            return '\\textbackslash{}';
        }
        else if (str.match(/[\{\}#\$%&_]/)) {
            return `\\${str}`;
        }
        else {
            return `\\symbol{\`\\${str}}`;
        }
    });
    return escapedText;
}
function convertQuote(text) {
    const convertedText = text.replace(/'(.+?)'/g, "`$1'").replace(/"(.+?)"/g, "``$1''");
    return convertedText;
}
