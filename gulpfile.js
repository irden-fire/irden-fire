// Please place all dependencies in this section
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    gulpFilter = require('gulp-filter'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    path = require('path'),
    Server = require('karma').Server;

var files = require('./gulp/gulp.config.js');

gulp.task('default', function(callback){
  runSequence('build','watch','server', callback);
});

/**
 * Run karma test
 */
gulp.task('karma', function (done) {
  new Server({
    configFile: './karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
  * Place here all tasks which connected to building process
  * like cleaning, uglifing, minifing, concating etc.
  */
gulp.task('build', function(callback){
  runSequence(
    'clean',
    'copy-build',
    'index',
    'move-to-prod',
    callback);
});

gulp.task('server', function() {
  connect.server({
      root: files.build_dir,
      port: 3000,
      host: '0.0.0.0',
      fallback: path.join(__dirname,files.build_dir+'/index.html'),
      livereload: true
    });
});

/**
  * This tast inject all dependencies to index.html file.
  * If you dependency didn't inject please check config file:
  * ./gulp/gulp.config.js
  * In this files you need to add path to you dependency in var: app_files.tpl_src
  * Or move you files in proper location, according to config
  */
gulp.task('index', function(){
  return gulp.src('./app/index.html')
    .pipe(inject(gulp.src(files.app_files.tpl_src), {read: false, ignorePath: files.build_dir, addRootSlash: false}))
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('clean', function(){
  return del([files.build_dir], {force: true});
});

gulp.task('copy-build', ['copy-views', 'publish-components', 'copy-assets', 'publish-app-css', 'copy-app-js']);

gulp.task('copy-assets', function(){
  return gulp.src('./app/assets/**/*')
    .pipe(gulp.dest(files.build_dir+'/assets'));
});

gulp.task('copy-views', function(){
  //TODO check out why if you change view* to views all files moves to the root
  return gulp.src('./app/view*/**/*')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-components-js', function(){
  return gulp.src('./app/**/*.min.js')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-app-js', function(){
  return gulp.src('./app/*.js')
    //TODO checkout why there is problem with uglifing
    //.pipe(uglify())
    .pipe(gulp.dest(files.build_dir + '/js'));
});

gulp.task('lint', function(){
  return gulp.src(files.app_files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
  gulp.watch(files.app_files.js, ['lint', 'build']);
});

// Define paths variables
var dest_path =  files.build_dir;

// grab main files from bower_components, minify and push in /public
gulp.task('publish-components', function() {

        var jsFilter = gulpFilter('*.js', {restore: true});
        var cssFilter = gulpFilter('*.css', {restore: true});
        var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

        return gulp.src(mainBowerFiles())

        // grab style files from bower_components and push in build_dir
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(concat('components.min.js'))
        .pipe(gulp.dest(dest_path + '/js'))
        .pipe(jsFilter.restore)

        // grab style files from bower_components and push in build_dir
        .pipe(cssFilter)
        .pipe(minifycss())
        .pipe(concat('components.min.css'))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore)

        // grab font files from bower_components and push in build_dir
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'));
});

gulp.task('publish-app-css', function() {

        return gulp.src('./app/assets/css/*.css')
        // grab application custom css files, minify and push in build_dir
        //TODO checkout why there is problem with app.css minifing
        //.pipe(minifycss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(dest_path + '/css'));
});

gulp.task('move-to-prod', function() {
        return gulp.src(files.build_dir+'/**/*')
        //move to your prod server directory
        .pipe(gulp.dest(files.prod_dir));
});
