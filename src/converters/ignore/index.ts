import * as unist from 'unist';

export default function ignore() {
  return {
    type: 'ignore',
  } as unist.Node;
}
