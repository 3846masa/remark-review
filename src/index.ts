import ReviewCompiler from './ReviewCompiler';
import { transform } from './transform';

export default function attacher(remark: any) {
  remark.Compiler = ReviewCompiler;
  return transform;
}

Object.assign(attacher, { Compiler: ReviewCompiler });
