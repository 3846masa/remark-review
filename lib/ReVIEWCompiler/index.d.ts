import { Converters } from '../converters';
import { UNIST } from 'unist';
import { MDAST } from 'mdast';
export interface ReVIEWCompilerOptions {
    documentInfo: {
        [key: string]: any;
    };
    baseTemplate: string | null;
    templatesDir: string;
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
    private readTemplate;
    compile(): string;
    visit(node: any, parent?: UNIST.Parent, idx?: number): string;
    convert(node: UNIST.Node): string;
    all(parent: UNIST.Parent): string[];
    generateFootnotes(): string;
}
