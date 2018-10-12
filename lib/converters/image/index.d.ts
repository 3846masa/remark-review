import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import ReVIEWCompiler, { ConvertOptionsNode } from '../../ReVIEWCompiler';
export default function image(this: ReVIEWCompiler, node: MDAST.Image & ConvertOptionsNode, parent: UNIST.Parent): UNIST.Node;
