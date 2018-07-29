/* global jake, task, desc, namespace */

const cpx = require('cpx');

namespace('build', () => {
  desc('Copy assets');
  task('copy', { async: true }, async () => {
    try {
      await cpx.copy('./src/**/*.{jpg,png,svg}', './htdocs');
      jake.logger.log('[build:copy] Done');
    } catch (error) {
      jake.logger.error('[build:copy] Error');
      jake.logger.error(error.toString());
    }
  });
});
