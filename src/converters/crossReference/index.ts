import * as unist from 'unist';
import * as mdast from 'mdast';
import { defaultsDeep } from 'lodash';

export default function crossReference(node: mdast.CrossReference) {
  const refs: string[] = [];
  const cites: string[] = [];

  for (const id of node.identifiers) {
    if (/^(?:fig|tbl|sec|eq|lst):/.test(id)) {
      refs.push(id);
    } else {
      cites.push(id);
    }
  }

  return defaultsDeep({ refs, cites }, node) as unist.Node;
}
