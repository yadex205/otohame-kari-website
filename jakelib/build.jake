/* global jake, task, desc */

require('./build/html.jake');
require('./build/css.jake');

desc('Build website');
task('build', ['build:html', 'build:css']);
