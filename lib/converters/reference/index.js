"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function reference(node, parent) {
    const identifier = node.identifier.toUpperCase();
    const def = this.definitions[identifier] || {};
    const bind = lodash_1.defaultsDeep({
        type: node.type.replace('Reference', ''),
        value: node.type === 'linkReference' ? this.all(node).join('') : '',
        url: def.url,
        alt: def.title,
    }, node);
    if (typeof this.converters[bind.type] === 'function') {
        return this.converters[bind.type].call(this, bind, parent);
    }
    return bind;
}
exports.default = reference;
