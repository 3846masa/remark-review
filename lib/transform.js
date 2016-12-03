"use strict";
const visit = require('unist-util-visit');
function plugin() {
    return transform;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plugin;
function transform(ast) {
    visit(ast, 'list', function setDepth(...args) {
        let node;
        let depth;
        if (typeof args[0] !== 'number') {
            node = args[0];
            depth = 1;
        }
        else {
            depth = args[0] + 1;
            node = args[1];
        }
        if (node.depth)
            return;
        node.depth = depth;
        visit(node, 'list', setDepth.bind(null, depth));
        return true;
    });
    visit(ast, 'listItem', (node, _index, parent) => {
        node.ordered = parent.ordered;
        node.depth = parent.depth;
        return true;
    });
    return ast;
}
exports.transform = transform;
