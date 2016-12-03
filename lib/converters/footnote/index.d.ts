import ReviewCompiler from '../../ReviewCompiler';
export default function footnote(this: ReviewCompiler, node: any): {
    type: string;
    identifier: string;
    position: any;
};
