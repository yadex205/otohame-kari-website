/* global task, desc */

require('./build/html.jake');
require('./build/css.jake');
require('./build/js.jake');
require('./build/copy.jake');

desc('Build website');
task('build', ['build:html', 'build:css', 'build:js', 'build:copy']);
