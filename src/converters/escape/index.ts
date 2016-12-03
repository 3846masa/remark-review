export default function escape(
  node: any,
) {
  node.value = escapeReview(node.value);
  return node;
}

function escapeReview(
  text: string,
) {
  const escapedText =
    text.replace(/\}/g, '\\}');
  return escapedText;
}
