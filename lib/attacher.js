"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReVIEWCompiler_1 = require("./ReVIEWCompiler");
const lodash_1 = require("lodash");
const searchFile_1 = require("./searchFile");
function attacher(options) {
    const mergedOpts = lodash_1.defaultsDeep(options, (this.data('settings') || { review: {} }).review, ReVIEWCompiler_1.default.defaultOptions);
    mergedOpts.baseTemplate = mergedOpts.baseTemplate ? searchFile_1.default(mergedOpts.baseTemplate) : null;
    mergedOpts.templatesDir = searchFile_1.default(mergedOpts.templatesDir);
    ReVIEWCompiler_1.default.defaultOptions = mergedOpts;
    ReVIEWCompiler_1.default.processor = this;
    this.Compiler = ReVIEWCompiler_1.default;
}
exports.default = attacher;
Object.assign(attacher, { Compiler: ReVIEWCompiler_1.default });
