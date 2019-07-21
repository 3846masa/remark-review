import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import jsYAML from 'js-yaml';
import { defaultsDeep } from 'lodash';
import converters, { Converters } from '../converters';
import visit from 'unist-util-visit';

import searchFile from '../searchFile';

import * as unist from 'unist';
import * as mdast from 'mdast';

export interface ReVIEWCompilerOptions {
  documentInfo: { [key: string]: any };
  baseTemplate: string | null;
  templatesDir: string;
  imageConfigs: { [key: string]: any };
}

export interface ConvertOptionsNode {
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export default class ReVIEWCompiler {
  static defaultOptions: ReVIEWCompilerOptions = {
    documentInfo: {},
    baseTemplate: null,
    templatesDir: path.resolve(__dirname, '../templates'),
    imageConfigs: {
      keepaspectratio: true,
    },
  };
  static processor: any;

  public footnotes: mdast.FootnoteDefinition[] = [];
  public definitions: { [identifier: string]: mdast.Definition } = {};
  public images: { [identifier: string]: mdast.Image } = {};
  public converters: Converters = converters;
  public options: ReVIEWCompilerOptions = ReVIEWCompiler.defaultOptions;

  private templates: { [type: string]: ejs.TemplateFunction } = {};

  constructor(public tree: unist.Node, public file: any) {
    if (file.extension) {
      file.move({
        extension: 're',
      });
    }
    if (file.extname) {
      file.extname = '.re';
    }
  }

  parse(value: string) {
    const ast = ReVIEWCompiler.processor.parse(value);
    return ReVIEWCompiler.processor.runSync(ast);
  }

  private readTemplate(type: string) {
    if (type in this.templates) {
      return this.templates[type];
    }

    let templateStr;
    try {
      const templatePath = path.resolve(this.options.templatesDir, `./${type}.ejs`);
      templateStr = fs.readFileSync(templatePath, 'utf8');
    } catch (_err) {}

    if (!templateStr) {
      try {
        const templatePath = path.resolve(path.resolve(__dirname, '../templates'), `./${type}.ejs`);
        templateStr = fs.readFileSync(templatePath, 'utf8');
      } catch (err) {
        throw err;
      }
    }

    this.templates[type] = ejs.compile(templateStr, {
      context: this,
      escape: (text: string) => text,
    } as any);

    return this.templates[type];
  }

  compile() {
    const node = this.tree;

    visit<mdast.YAML>(node, 'yaml', (YAMLNode) => {
      try {
        this.options = defaultsDeep(jsYAML.safeLoad(YAMLNode.value) || {}, this.options);

        this.options.baseTemplate = this.options.baseTemplate
          ? searchFile(this.options.baseTemplate, this.file.dirname)
          : null;
        this.options.templatesDir = searchFile(this.options.templatesDir, this.file.dirname);

        return true;
      } catch (_e) {
        this.file.fail(_e.message || _e, YAMLNode);
        return false;
      }
    });

    visit<mdast.Definition>(node, 'definition', (def) => {
      const id = def.identifier.toUpperCase();
      this.definitions[id] = def;
      return true;
    });
    visit<mdast.FootnoteDefinition>(node, 'footnoteDefinition', (def) => {
      this.footnotes.push(def);
      return true;
    });

    visit<mdast.Image>(node, 'image', (imgNode, idx, parent) => {
      if (imgNode.url) {
        const sibling = parent!.children[idx! + 1];
        if (sibling && sibling.type === 'crossReferenceLabel') {
          const labelNode = sibling as mdast.CrossReferenceLabel;
          this.images[labelNode.label] = imgNode;
        }
      }
      return true;
    });

    visit<mdast.CrossReference>(node, 'crossReference', (crossRefNode) => {
      const identifiers = crossRefNode.identifiers;
      for (let idx = 0; idx < identifiers.length; idx++) {
        const identifier = identifiers[idx];
        if (identifier in this.images) {
          const imgName = path
            .basename(this.images[identifier].url)
            .split('.')
            .shift();
          identifiers[idx] = `fig:${imgName}`;
        }
      }
      return true;
    });

    const compiled = (this.visit(node) + '\n' + this.generateFootnotes()).trim();

    if (!this.options.baseTemplate) {
      return compiled;
    }

    try {
      const templatePath = path.resolve(this.options.baseTemplate);
      const template = fs.readFileSync(templatePath, 'utf8');
      const data = defaultsDeep(
        {
          body: compiled,
        },
        this.options.documentInfo,
      );
      return ejs.render(template, data, {
        context: this,
        escape: (text: string) => text,
      } as any);
    } catch (_e) {
      this.file.fail(_e.message || _e, node);
      return compiled;
    }
  }

  visit(node: any, parent?: unist.Parent, idx: number = 0) {
    const type: string = node ? node.type : '';
    if (!type) {
      this.file.fail(`Expected node \`${node}\``);
    }

    let cloneNode = defaultsDeep(
      {
        parent,
        index: idx,
        isFirst: parent ? idx === 0 : true,
        isLast: parent ? idx === parent.children.length - 1 : true,
      },
      node,
    ) as unist.Node & ConvertOptionsNode;

    if (typeof this.converters[type] === 'function') {
      // FIXME
      cloneNode = this.converters[type].call(this, cloneNode, parent) as any;
    }

    return this.convert(cloneNode);
  }

  convert(node: unist.Node) {
    const type: string = node ? node.type : '';
    if (!type) {
      return '';
    }

    let template: ejs.TemplateFunction;
    try {
      template = this.readTemplate(type);
    } catch (_e) {
      this.file.fail(_e.message || _e, node);
      return '';
    }

    return template({ node }).replace(/\n$/, '');
  }

  all(parent: unist.Parent) {
    const children = parent.children;
    const length = children.length;
    const values: string[] = [];

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
    const results: string[] = [];

    definitions.forEach((def, idx) => {
      const node = defaultsDeep(
        {
          identifier: `${idx + 1}`,
          value: this.all(def).join(''),
        },
        def,
      ) as unist.Node;
      results.push(this.convert(node));
    });

    return results.join('\n');
  }
}

/**
 * Monkey patch
 * See https://github.com/unifiedjs/unified/blob/6.1.5/index.js#L410-L421
 */
Object.assign(ReVIEWCompiler.prototype, {
  __monkeypatch: {},
});
