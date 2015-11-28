var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./config');
var config = require('./config');
var helpers = require('./helpers');


function _task(name, filesId, helper, options) {
  gulp.task(name, function() {
    if (!helpers[helper]) throw('Helper "'+helper+'" does not exists.');
    if (!config.files[filesId]) throw('Files ID "'+filesId+'" does not exists.');

    return helpers[helper](
      config.files[filesId].input, 
      config.files[filesId].output,
      options
    );
  }); 
}

_task('_vendor_js', 'vendor_js', 'js');
_task('_vendor_css', 'vendor_css', 'css');
_task('_vendor_fonts', 'vendor_fonts', 'fonts');
_task('_app_js_dev', 'app_js', 'js_clean');
_task('_app_js_build', 'app_js', 'js');
_task('_app_less', 'app_less', 'less');
_task('_app_templates', 'app_templates', 'templates');
_task('_app_html', 'app_html', 'html');
_task('_preload_js', 'preload_js', 'js');
_task('_preload_css', 'preload_css', 'css');
_task('_jshint', 'app_js', 'jshint');

gulp.task('_production', function() {
  config.build_env = 'production';
})
gulp.task('_build', [
  '_production',
  '_vendor_js',
  '_vendor_css',
  '_vendor_fonts',
  '_preload_js',
  '_preload_css',
  '_app_js_build',
  '_app_less',
  '_app_templates',
  '_app_html',
]);
gulp.task('_dev', [
  '_vendor_js',
  '_vendor_css',
  '_vendor_fonts',
  '_preload_js',
  '_preload_css',
  '_app_js_dev',
  '_app_less',
  '_app_templates',
  '_app_html',
]);
gulp.task('_livereload', function() {
  connect.server({
    livereload: true,
    root: 'build',
    port: 8000,
  });
});
gulp.task('_watch', function() {
  var f = config.files;
  gulp.watch(f.preload_js.input, ['_preload_js']);
  gulp.watch(f.preload_css.input, ['_preload_css']);
  gulp.watch(f.app_js.input, ['_jshint', '_app_js_dev']);
  gulp.watch(f.app_less.input_all, ['_app_less']);
  gulp.watch(f.app_templates.input, ['_app_templates']);
  gulp.watch(f.app_html.input, ['_app_html']);
});