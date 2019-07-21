import * as unist from 'unist';
import * as mdast from 'mdast';
import { defaultsDeep } from 'lodash';

export default function escape(node: mdast.Literal) {
  return defaultsDeep(
    {
      value: escapeReVIEW(node.value),
    },
    node,
  ) as unist.Node;
}

function escapeReVIEW(text: string) {
  return text.replace(/\}/g, '\\}').replace(/\t/g, '\x20\x20\x20\x20');
}
