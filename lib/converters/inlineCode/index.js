"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function inlineCode(node) {
    const escapedValue = node.value.replace(/\\|[\{\}#\$%&_]|[|]|[<>^~]/g, (str) => {
        if (str === '\\') {
            return '\\textbackslash{}';
        }
        else if (str.match(/[\{\}#\$%&_]/)) {
            return `\\${str}`;
        }
        else {
            return `\\symbol{\`\\${str}}`;
        }
    });
    return lodash_1.defaultsDeep({
        value: escapedValue,
    }, node);
}
exports.default = inlineCode;
