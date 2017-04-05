import ReviewCompiler from '../ReviewCompiler';
export interface Converters {
    [key: string]: (...args: any[]) => any;
}
export { ReviewCompiler };
declare var _default: Converters;
export default _default;
