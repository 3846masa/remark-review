import * as unist from 'unist';
import * as mdast from 'mdast';
import { defaultsDeep } from 'lodash';

import ReVIEWCompiler from '../../ReVIEWCompiler';

export default function reference(
  this: ReVIEWCompiler,
  node: (mdast.LinkReference | mdast.ImageReference) & mdast.Association,
  parent: unist.Parent,
) {
  const identifier = node.identifier.toUpperCase();
  const def = this.definitions[identifier] || {};

  const bind = defaultsDeep(
    {
      type: node.type.replace('Reference', ''),
      value: node.type === 'linkReference' ? this.all(node).join('') : '',
      url: def.url,
      alt: def.title,
    },
    node,
  ) as unist.Node;

  if (typeof this.converters[bind.type] === 'function') {
    return this.converters[bind.type].call(this, bind, parent);
  }
  return bind;
}
