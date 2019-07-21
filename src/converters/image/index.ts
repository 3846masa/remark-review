import * as unist from 'unist';
import * as mdast from 'mdast';
import * as qs from 'querystring';
import { cloneDeep, defaultsDeep } from 'lodash';

import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';

export default function image(this: ReVIEWCompiler, node: mdast.Image & ConvertOptionsNode, parent: unist.Parent) {
  const caption = this.all(this.parse(node.title || node.alt || '')).join('');
  let label = '';

  let options = cloneDeep(this.options.imageConfigs || {});

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'crossReferenceLabel') {
    const crNode = nextNode as mdast.CrossReferenceLabel;
    label += this.convert(nextNode);
    options = defaultsDeep(crNode.options || {}, options);
    Object.assign(crNode, { type: 'ignore' });
  }

  return defaultsDeep(
    {
      label,
      caption: caption.trim(),
      config: options,
      utils: {
        parse(str: string) {
          return qs.parse(str, ',', '=', {
            decodeURIComponent: (str: string) => str.replace(/\\,/g, ','),
          });
        },
        stringify(opt: any): string {
          return qs.stringify(opt, ',', '=', {
            encodeURIComponent: (str: string) => str.replace(/,/g, '\\,'),
          });
        },
      },
    },
    node,
  ) as unist.Node;
}
