/*global -$ */
'use strict';
// generated on 2015-06-05 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var exec = require('child_process').exec;
var fs = require('fs');
var semver = require('semver');
var autoprefixer = require('autoprefixer');
var pkg = (function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
})();

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      autoprefixer({browsers: ['last 4 versions']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles({
    filter: '**/*.{eot,svg,ttf,woff,woff2}',
    debugging: false
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    'app/CNAME',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 10000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('semverCommit', ['bump'], function () {

  exec('git commit app/manifest.json bower.json package.json -m "Update semver to v'+pkg.version+'"');
});

gulp.task('commitDist', ['build'], function () {

  exec('git add ./dist && git commit ./dist -m "Update dist folder to v'+pkg.version+'"');
});

gulp.task('gitPush', function () {

  exec('git push origin master', function(error, stdout, stderr) {

    $.util.log(stderr);
  });
});

// bump versions on package/bower/manifest
gulp.task('bump', function () {

  // increment version
  var newVer = semver.inc(pkg.version, 'patch');

  pkg.version = newVer;

  // uses gulp-filter
  var manifestFilter = $.filter(['**/manifest.json'], {restore: true});
  var regularJsons = $.filter(['*', '!manifest.json']);

  return gulp.src(['./bower.json', './package.json', './app/manifest.json'])
    .pipe($.bump({
      version: newVer
    }))
    .pipe(manifestFilter)
    .pipe(gulp.dest('./app'))
    .pipe(manifestFilter.restore)
    .pipe(regularJsons)
    .pipe(gulp.dest('./'));
});

gulp.task('upstream', ['commitDist'], function () {

  // return exec('git subtree push --prefix=dist --squash upstream master');

  var upstreamDelayed = function () {

    exec('git subtree push --prefix=dist upstream master', function(error, stdout, stderr){

      $.util.log(stderr);

      exec('git push origin master', function (error, stdout, stderr) {

        // $.util.log('Resetting ./dist temporary commit');
        // exec('git reset HEAD^');
      });
    })
  };

  setTimeout(upstreamDelayed, 1500);
});

gulp.task('deploy', ['clean', 'semverCommit'], function () {
  gulp.start('upstream');
});
;
