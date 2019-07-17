import { UNIST } from 'unist';
import ReVIEWCompiler from '../ReVIEWCompiler';
export interface Converters {
    [key: string]: (this: ReVIEWCompiler, node: UNIST.Node, parent?: UNIST.Parent) => UNIST.Node;
}
export { ReVIEWCompiler };
declare const _default: Converters;
export default _default;
