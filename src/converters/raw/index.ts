export default function raw(node: any) {
  node.value = node.value.replace(/\t/g, '\x20\x20\x20\x20');
  return node;
}
