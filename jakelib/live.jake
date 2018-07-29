/* global jake, task, desc */

const chokidar = require('chokidar');
const browserSync = require('browser-sync');

desc('Run live preview environment');
task('live', ['clean', 'build'], { async: true }, () => {
  const server = browserSync.create();
  const map = [{ target: './src/**/*.ejs',           outExt: '.html', taskName: 'build:html' },
               { target: './src/**/*.styl',          outExt: '.css',  taskName: 'build:css' },
               { target: './src/**/*.jsx',           outExt: '.js',   taskName: 'build:js' },
               { target: './src/**/*.{png,jpg,svg}', outExt: null,    taskName: 'build:copy' }];

  server.init({ server: { baseDir: './htdocs' } });

  for (const { target, outExt, taskName } of map) {
    const task = jake.Task[taskName];

    chokidar.watch(target, { ignoreInitial: true }).on('all', () => {
      task.reenable();
      task.invoke();
    });

    task.addListener('complete', () => outExt ? server.reload(`*${outExt}`) : server.reload());
  }
});
