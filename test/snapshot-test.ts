import path from 'path';
import globby from 'globby';
import fs from 'fs-extra';
import assert from 'assert';

import remark from 'remark';
import * as remarkReview from '../src/index';

const IS_UPDATE_SNAPSHOTS = process.env.UPDATE_SNAPSHOTS === 'true';

describe('Snapshots', function() {
  this.timeout(Infinity);

  const files = globby.sync('testcases/*.md', {
    cwd: path.resolve(__dirname),
    absolute: true,
  });

  for (const file of files) {
    it(`${path.basename(file)}`, async () => {
      const snapshotPath = path.resolve(__dirname, './snapshots', `${path.basename(file, '.md')}.re`);
      const processor = remark().use(remarkReview);

      const source = await fs.readFile(file, 'utf8');
      const vfile = await processor.process(source);
      if (IS_UPDATE_SNAPSHOTS) {
        await fs.writeFile(snapshotPath, String(vfile), 'utf8');
        return;
      }

      const excepted = await fs.readFile(snapshotPath, 'utf8');
      const actual = String(vfile);
      assert.equal(actual, excepted);
    });
  }
});
