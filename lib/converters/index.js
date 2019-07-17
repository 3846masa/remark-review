"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReVIEWCompiler_1 = require("../ReVIEWCompiler");
exports.ReVIEWCompiler = ReVIEWCompiler_1.default;
const join_1 = require("./join");
const joinWithLineBreak_1 = require("./joinWithLineBreak");
const ignore_1 = require("./ignore");
const escape_1 = require("./escape");
const heading_1 = require("./heading");
const reference_1 = require("./reference");
const image_1 = require("./image");
const footnote_1 = require("./footnote");
const table_1 = require("./table");
const crossReference_1 = require("./crossReference");
const footnoteReference_1 = require("./footnoteReference");
const math_1 = require("./math");
const link_1 = require("./link");
const raw = (node) => node;
exports.default = {
    ignore: ignore_1.default,
    image: image_1.default,
    table: table_1.default,
    heading: heading_1.default,
    footnote: footnote_1.default,
    crossReference: crossReference_1.default,
    footnoteReference: footnoteReference_1.default,
    math: math_1.default,
    link: link_1.default,
    yaml: ignore_1.default,
    html: ignore_1.default,
    definition: ignore_1.default,
    tableCaption: ignore_1.default,
    footnoteDefinition: ignore_1.default,
    delete: join_1.default,
    strong: join_1.default,
    emphasis: join_1.default,
    tableCell: join_1.default,
    paragraph: join_1.default,
    root: joinWithLineBreak_1.default,
    blockquote: joinWithLineBreak_1.default,
    list: joinWithLineBreak_1.default,
    listItem: joinWithLineBreak_1.default,
    tableRow: joinWithLineBreak_1.default,
    code: raw,
    crossReferenceLabel: raw,
    inlineCode: escape_1.default,
    text: escape_1.default,
    linkReference: reference_1.default,
    imageReference: reference_1.default,
};
