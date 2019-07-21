import FrontMatterPlugin = require('remark-frontmatter');
import MathPlugin = require('@paperist/remark-math');
import CrossrefPlugin = require('@paperist/remark-crossref');
import TableCaptionPlugin = require('@paperist/remark-table-caption');
import ReVIEWPlugin from './attacher';

export const settings = {
  footnotes: true,
};

export const plugins: any = [FrontMatterPlugin, MathPlugin, CrossrefPlugin, TableCaptionPlugin, ReVIEWPlugin];
