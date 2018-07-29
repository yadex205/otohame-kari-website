/* global jake, task, desc */

const promisify = require('util').promisify;

const rimraf = promisify(require('rimraf'));

desc('Clean up generated files');
task('clean', { async: true }, async () => {
  try {
    await rimraf('./htdocs/**/*');
    jake.logger.log('[clean] Done');
  } catch (error) {
    jake.logger.error('[clean] Error');
    jake.logger.error(error.toString());
  }
});
