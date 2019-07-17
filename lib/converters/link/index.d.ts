import { MDAST } from 'mdast';
import { UNIST } from 'unist';
import ReVIEWCompiler from '../../ReVIEWCompiler';
export default function link(this: ReVIEWCompiler, node: MDAST.Link): UNIST.Node;
