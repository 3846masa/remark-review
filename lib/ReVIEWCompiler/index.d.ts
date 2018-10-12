import { Converters } from '../converters';
import { UNIST } from 'unist';
import { MDAST } from 'mdast';
export interface ReVIEWCompilerOptions {
    documentInfo: {
        [key: string]: any;
    };
    baseTemplate: string | null;
    templatesDir: string | null;
    imageConfigs: {
        [key: string]: any;
    };
}
export interface ConvertOptionsNode {
    index: number;
    isFirst: boolean;
    isLast: boolean;
}
export default class ReVIEWCompiler {
    tree: UNIST.Node;
    file: any;
    static defaultOptions: ReVIEWCompilerOptions;
    static processor: any;
    footnotes: MDAST.FootnoteDefinition[];
    definitions: {
        [identifier: string]: MDAST.Definition;
    };
    converters: Converters;
    options: ReVIEWCompilerOptions;
    private templates;
    constructor(tree: UNIST.Node, file: any);
    parse(value: string): any;
    private readTemplate(type);
    compile(): string;
    visit(node: any, parent?: UNIST.Parent, idx?: number): any;
    convert(node: UNIST.Node): any;
    all(parent: UNIST.Parent): string[];
    generateFootnotes(): string;
}
