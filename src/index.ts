import FrontMatterPlugin from 'remark-frontmatter';
import MathPlugin from '@paperist/remark-math';
import CrossrefPlugin from '@paperist/remark-crossref';
import CaptionPlugin from '@paperist/remark-caption';
import ReVIEWPlugin from './attacher';

export const settings = {
  footnotes: true,
};

export const plugins: any = [FrontMatterPlugin, MathPlugin, CrossrefPlugin, CaptionPlugin, ReVIEWPlugin];
