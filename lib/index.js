"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FrontMatterPlugin = require("remark-frontmatter");
const MathPlugin = require("@paperist/remark-math");
const CrossrefPlugin = require("@paperist/remark-crossref");
const TableCaptionPlugin = require("@paperist/remark-table-caption");
const attacher_1 = require("./attacher");
exports.settings = {
    footnotes: true,
    pedantic: true,
};
exports.plugins = [FrontMatterPlugin, MathPlugin, CrossrefPlugin, TableCaptionPlugin, attacher_1.default];
