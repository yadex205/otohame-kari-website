/* global jake, task, desc */

const path      = require('path');
const promisify = require('util').promisify

const ejs        = require('ejs');
const glob       = promisify(require('glob'));
const replaceExt = require('replace-ext')
const writeFile  = require('write');

namespace('build', () => {
  desc('Build HTML files');
  task('html', { async: true }, async () => {
    const files = await glob('./src/**/!(_)*.ejs');

    for (const src of files) {
      const dest = path.join('./htdocs/', path.relative('./src', replaceExt(src, '.html')));

      try {
        const buffer = await ejs.renderFile(src, {}, {});

        await writeFile(dest, buffer);
        jake.log.log(`[build:html] ${src} ==> ${dest}`);
      } catch (error) {
        jake.logger.error(`[build:html] Error: ${src}`);
        jake.logger.error(error.toString());
      }
    }
  });
});
