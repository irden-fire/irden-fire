var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    serve = require('gulp-serve'),
    jshint = require('gulp-jshint'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    gulpFilter = require('gulp-filter'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify');

var files = require('./gulp/gulp.config.js');

gulp.task('default', function(callback){
  runSequence('build','watch','serve', callback);
});

gulp.task('build', function(callback){
  runSequence('clean',
    'copy-build',
    'index',
    'move-to-prod',
    callback);
});

gulp.task('serve', serve('build'));

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
  return gulp.src('./app/view*/**/*')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-components-js', function(){
  return gulp.src('./app/**/*.min.js')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-app-js', function(){
  return gulp.src('./app/*.js')
    //.pipe(uglify())3	￼Show/Hide

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
// grab libraries files from bower_components, minify and push in /public
gulp.task('publish-components', function() {

        var jsFilter = gulpFilter('*.js', {restore: true});
        var cssFilter = gulpFilter('*.css', {restore: true});
        var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

        return gulp.src(mainBowerFiles())

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        //.pipe(gulp.dest(dest_path + '/js/'))
        .pipe(uglify())
        .pipe(concat('components.min.js'))
        .pipe(gulp.dest(dest_path + '/js'))
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(minifycss())
        .pipe(concat('components.min.css'))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'));
});

gulp.task('publish-app-css', function() {

        return gulp.src('./app/assets/css/*.css')
        // grab vendor css files from bower_components, minify and push in /public
        //.pipe(minifycss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(dest_path + '/css'));
});

gulp.task('move-to-prod', function() {

        return gulp.src(files.build_dir+'/**/*')

        //move to your prod server directory
        .pipe(gulp.dest(files.prod_dir));
});
