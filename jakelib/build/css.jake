/* global jake, task, desc, namespace */

const fs        = require('fs');
const path      = require('path');
const promisify = require('util').promisify;

const glob       = promisify(require('glob'));
const replaceExt = require('replace-ext');
const stylus     = require('stylus');
const writeFile  = require('write');

namespace('build', () => {
  desc('Build CSS files');
  task('css', { async: true }, async () => {
    const files = await glob('./src/**/!(_)*.styl');

    for (const srcPath of files) {
      const dest = path.join('./htdocs/', path.relative('./src', replaceExt(srcPath, '.css')));

      try {
        const src = await promisify(fs.readFile)(srcPath);
        const stylusOpt = { filename: srcPath,
                            'include css': true };
        const buffer = await promisify(stylus.render)(src.toString(), stylusOpt);

        await writeFile(dest, buffer);
        jake.logger.log(`[build:css] ${srcPath} ==> ${dest}`);
      } catch (error) {
        jake.logger.error(`[build:css] Error: ${srcPath}`);
        jake.logger.error(error.toString());
      }
    }
  });
});
