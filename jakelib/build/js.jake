/* global jake, task, desc, namespace */

const path      = require('path');
const promisify = require('util').promisify;

const glob       = promisify(require('glob'));
const replaceExt = require('replace-ext');
const webpack    = promisify(require('webpack'));

namespace('build', () => {
  desc('Build JavaScript files');
  task('js', { async: true }, async () => {
    const files = await glob('./src/**/!(_)*.jsx');

    for (const src of files) {
      const dest = path.join('./htdocs', path.relative('./src', replaceExt(src, '.js')));

      try {
        await webpack({ entry: src,
                        output: { path: path.join(__dirname, '../../', path.dirname(dest)),
                                  filename: path.basename(dest) },
                        resolve: { extensions: ['.js', '.jsx'],
                                   modules: ['node_modules'] },
                        module: { rules: [{ test: /\.jsx$/,
                                            exclude: /node_modules/,
                                            use: { loader: 'babel-loader',
                                                   options: { presets: ['env', 'react'] } } }] } });

        jake.logger.log(`[build:js] ${src} ==> ${dest}`);
      } catch (error) {
        jake.logger.error(`[build:js] Error: ${src}`);
        jake.logger.error(error.toString());
      }
    }
  });
});
