"use strict";
const ReviewCompiler_1 = require('./ReviewCompiler');
const transform_1 = require('./transform');
function attacher(remark) {
    remark.Compiler = ReviewCompiler_1.default;
    return transform_1.transform;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = attacher;
Object.assign(attacher, { Compiler: ReviewCompiler_1.default });
