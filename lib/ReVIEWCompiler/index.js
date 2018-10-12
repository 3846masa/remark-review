"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const jsYAML = require("js-yaml");
const lodash_1 = require("lodash");
const converters_1 = require("../converters");
const visit = require("unist-util-visit");
const searchFile_1 = require("../searchFile");
class ReVIEWCompiler {
    constructor(tree, file) {
        this.tree = tree;
        this.file = file;
        this.footnotes = [];
        this.definitions = {};
        this.converters = converters_1.default;
        this.options = ReVIEWCompiler.defaultOptions;
        this.templates = {};
        if (file.extension) {
            file.move({
                extension: 're',
            });
        }
        if (file.extname) {
            file.extname = '.re';
        }
    }
    parse(value) {
        const ast = ReVIEWCompiler.processor.parse(value);
        return ReVIEWCompiler.processor.runSync(ast);
    }
    readTemplate(type) {
        if (type in this.templates) {
            return this.templates[type];
        }
        let templateStr;
        try {
            const templatePath = path.resolve(this.options.templatesDir, `./${type}.ejs`);
            templateStr = fs.readFileSync(templatePath, 'utf8');
        }
        catch (_err) { }
        if (!templateStr) {
            try {
                const templatePath = path.resolve(path.resolve(__dirname, '../templates'), `./${type}.ejs`);
                templateStr = fs.readFileSync(templatePath, 'utf8');
            }
            catch (err) {
                throw err;
            }
        }
        this.templates[type] = ejs.compile(templateStr, {
            context: this,
            escape: (text) => text,
        });
        return this.templates[type];
    }
    compile() {
        const node = this.tree;
        visit(node, 'yaml', (YAMLNode) => {
            try {
                const opts = jsYAML.safeLoad(YAMLNode.value) || {};
                opts.baseTemplate = searchFile_1.default(opts.baseTemplate, this.file.dirname);
                opts.templatesDir = searchFile_1.default(opts.templatesDir, this.file.dirname);
                this.options = lodash_1.defaultsDeep(opts, this.options);
                return true;
            }
            catch (_e) {
                this.file.fail(_e.message || _e, YAMLNode);
                return false;
            }
        });
        visit(node, 'definition', (def) => {
            const id = def.identifier.toUpperCase();
            this.definitions[id] = def;
            return true;
        });
        visit(node, 'footnoteDefinition', (def) => {
            this.footnotes.push(def);
            return true;
        });
        const compiled = (this.visit(node) + '\n' + this.generateFootnotes()).trim();
        if (!this.options.baseTemplate) {
            return compiled;
        }
        try {
            const templatePath = path.resolve(this.options.baseTemplate);
            const template = fs.readFileSync(templatePath, 'utf8');
            const data = lodash_1.defaultsDeep({
                body: compiled,
            }, this.options.documentInfo);
            return ejs.render(template, data, {
                context: this,
                escape: (text) => text,
            });
        }
        catch (_e) {
            this.file.fail(_e.message || _e, node);
            return compiled;
        }
    }
    visit(node, parent, idx = 0) {
        const type = node ? node.type : '';
        if (!type) {
            this.file.fail(`Expected node \`${node}\``);
        }
        let cloneNode = lodash_1.defaultsDeep({
            index: idx,
            isFirst: parent ? idx === 0 : true,
            isLast: parent ? idx === parent.children.length - 1 : true,
        }, node);
        if (typeof this.converters[type] === 'function') {
            cloneNode = this.converters[type].call(this, cloneNode, parent);
        }
        return this.convert(cloneNode);
    }
    convert(node) {
        const type = node ? node.type : '';
        if (!type) {
            return '';
        }
        let template;
        try {
            template = this.readTemplate(type);
        }
        catch (_e) {
            this.file.fail(_e.message || _e, node);
            return '';
        }
        return template(node).replace(/\n$/, '');
    }
    all(parent) {
        const children = parent.children;
        const length = children.length;
        const values = [];
        for (let idx = 0; idx < length; idx++) {
            let value = this.visit(children[idx], parent, idx) || '';
            if (children[idx - 1] && children[idx - 1].type === 'break') {
                value = value.replace(/^\s*/g, '');
            }
            values.push(value);
        }
        return values;
    }
    generateFootnotes() {
        const definitions = this.footnotes;
        const results = [];
        definitions.forEach((def, idx) => {
            const node = lodash_1.defaultsDeep({
                identifier: `${idx + 1}`,
                value: this.all(def).join(''),
            }, def);
            results.push(this.convert(node));
        });
        return results.join('\n');
    }
}
ReVIEWCompiler.defaultOptions = {
    documentInfo: {},
    baseTemplate: null,
    templatesDir: path.resolve(__dirname, '../templates'),
    imageConfigs: {
        keepaspectratio: true,
    },
};
exports.default = ReVIEWCompiler;
/**
 * Monkey patch
 * See https://github.com/unifiedjs/unified/blob/6.1.5/index.js#L410-L421
 */
Object.assign(ReVIEWCompiler.prototype, {
    __monkeypatch: {},
});
