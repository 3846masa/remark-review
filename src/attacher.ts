import ReVIEWCompiler, { ReVIEWCompilerOptions } from './ReVIEWCompiler';
import defaultsDeep from 'lodash.defaultsdeep';

import searchFile from './searchFile';

export default function attacher(this: any, options: ReVIEWCompilerOptions) {
  const mergedOpts: ReVIEWCompilerOptions = defaultsDeep(
    options,
    (this.data('settings') || { review: {} }).review,
    ReVIEWCompiler.defaultOptions,
  );

  mergedOpts.baseTemplate = mergedOpts.baseTemplate ? searchFile(mergedOpts.baseTemplate) : null;
  mergedOpts.templatesDir = searchFile(mergedOpts.templatesDir, { type: 'directory' });

  ReVIEWCompiler.defaultOptions = mergedOpts;

  ReVIEWCompiler.processor = this;
  this.Compiler = ReVIEWCompiler;
}
Object.assign(attacher, { Compiler: ReVIEWCompiler });
