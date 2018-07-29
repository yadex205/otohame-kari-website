/* global jake, task, desc */

require('./build/html.jake');

desc('Build website');
task('build', ['build:html'])
