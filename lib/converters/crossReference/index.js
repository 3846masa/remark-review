"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function crossReference(node) {
    const refs = [];
    const cites = [];
    for (const id of node.identifiers) {
        if (/^(?:fig|tbl|sec|eq|lst):/.test(id)) {
            refs.push(id);
        }
        else {
            cites.push(id);
        }
    }
    return lodash_1.defaultsDeep({ refs, cites }, node);
}
exports.default = crossReference;
