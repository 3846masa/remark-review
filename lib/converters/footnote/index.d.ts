import { MDAST } from 'mdast';
import ReVIEWCompiler from '../../ReVIEWCompiler';
export default function footnote(this: ReVIEWCompiler, node: MDAST.Footnote): MDAST.FootnoteReference;
