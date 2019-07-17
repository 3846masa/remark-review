import ReVIEWCompiler, { ReVIEWCompilerOptions } from './ReVIEWCompiler';
import { defaultsDeep } from 'lodash';

import searchFile from './searchFile';

export default function attacher(this: any, options: ReVIEWCompilerOptions) {
  const mergedOpts: ReVIEWCompilerOptions = defaultsDeep(options, (this.data('settings') || { review: {} }).review);

  mergedOpts.baseTemplate = mergedOpts.baseTemplate ? searchFile(mergedOpts.baseTemplate) : null;
  mergedOpts.templatesDir = searchFile(mergedOpts.templatesDir);

  ReVIEWCompiler.defaultOptions = defaultsDeep(mergedOpts, ReVIEWCompiler.defaultOptions);

  ReVIEWCompiler.processor = this;
  this.Compiler = ReVIEWCompiler;
}
Object.assign(attacher, { Compiler: ReVIEWCompiler });
