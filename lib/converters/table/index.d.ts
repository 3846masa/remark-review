import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';
export default function table(this: ReVIEWCompiler, node: MDAST.Table & ConvertOptionsNode, parent: UNIST.Parent): UNIST.Node;
