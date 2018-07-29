/* global jake, task, desc */

require('./build/html.jake');
require('./build/css.jake');
require('./build/js.jake');

desc('Build website');
task('build', ['build:html', 'build:css', 'build:js']);
