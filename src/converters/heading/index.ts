import * as unist from 'unist';
import * as mdast from 'mdast';
import visit from 'unist-util-visit';
import { defaultsDeep } from 'lodash';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function heading(this: ReVIEWCompiler, node: mdast.Heading) {
  let label = '';
  visit(node, 'crossReferenceLabel', (crNode: mdast.CrossReferenceLabel) => {
    label += this.convert(crNode);
    Object.assign(crNode, { type: 'ignore' });
    return true;
  });

  return defaultsDeep(
    {
      label,
      value: this.all(node).join(''),
    },
    node,
  ) as unist.Node;
}
