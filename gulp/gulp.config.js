module.exports = {
  build_dir: 'build',
  prod_dir: '/var/www/html',
  app_files: {
    js: ['src/**/*.js'],
    tpl_src : [    './build/js/**/*.min.js',
                   './build/js/*.js',
                   './build/view*/*.js',
                   './build/css/**/*.css'
              ]
  }
}
