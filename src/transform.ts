import visit = require('unist-util-visit');

export default function plugin() {
  return transform;
}

export function transform(ast: any) {

  visit(ast, 'list', function setDepth (...args: any[]) {
    let node: any;
    let depth: number;

    if (typeof args[0] !== 'number') {
      node = args[0];
      depth = 1;
    } else {
      depth = args[0] + 1;
      node = args[1];
    }
    if (node.depth) return;

    node.depth = depth;
    visit(node, 'list', setDepth.bind(null, depth));
    return true;
  });

  visit(ast, 'listItem', (node: any, _index: number, parent: any) => {
    node.ordered = parent.ordered;
    node.depth = parent.depth;
    return true;
  });

  return ast;
}
