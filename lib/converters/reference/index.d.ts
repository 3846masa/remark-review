import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import ReVIEWCompiler from '../../ReVIEWCompiler';
export default function reference(this: ReVIEWCompiler, node: MDAST.LinkReference | MDAST.ImageReference, parent: UNIST.Parent): any;
