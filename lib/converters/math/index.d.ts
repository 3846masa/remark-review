import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';
export default function math(this: ReVIEWCompiler, node: MDAST.Math & ConvertOptionsNode, parent: UNIST.Parent): UNIST.Node;
