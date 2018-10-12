import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

export default function escape(node: UNIST.Text) {
  return defaultsDeep(
    {
      value: escapeReVIEW(node.value),
    },
    node,
  ) as UNIST.Node;
}

function escapeReVIEW(text: string) {
  return text.replace(/\}/g, '\\}').replace(/\t/g, '\x20\x20\x20\x20');
}
