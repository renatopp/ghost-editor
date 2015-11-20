var gulp = require('gulp');

require('./tasks/tasks');

gulp.task('build', ['_build']);
gulp.task('jshint', ['_jshint']);
gulp.task('serve', ['_dev', '_watch', '_livereload']);