var config = require('./config');

var gulp          = require('gulp');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var minifyCss     = require('gulp-minify-css');
var minifyHTML    = require('gulp-minify-html');
var connect       = require('gulp-connect');
var less          = require('gulp-less');
var jshint        = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var replace       = require('gulp-replace');
var stylish       = require('jshint-stylish');

function splitName(name) {
  var i = name.search(/\/[^\/]*$/);
  return {
    path: name.substring(0, i),
    name: name.substring(i+1),
  };
}

module.exports = {
  css: function(input, output, options) {
    options = options||{};
    output = splitName(output);

    return gulp
      .src(input)
      .pipe(minifyCss())
      .pipe(concat(output.name))
      .pipe(gulp.dest(output.path))
      .pipe(connect.reload());
  },

  js: function(input, output, options) {
    options = options||{};
    output = splitName(output);

    return gulp
      .src(input)
      .pipe(uglify())
      .pipe(concat(output.name))
      .pipe(replace('[BUILD_VERSION]', config.build_version))
      .pipe(replace('[BUILD_DATE]', config.build_date))
      .pipe(replace('[BUILD_ENV]', config.build_env))
      .pipe(gulp.dest(output.path))
      .pipe(connect.reload());
  },

  js_clean: function(input, output, options) {
    options = options||{};
    output = splitName(output);

    return gulp
      .src(input)
      .pipe(concat(output.name))
      .pipe(replace('[BUILD_VERSION]', config.build_version))
      .pipe(replace('[BUILD_DATE]', config.build_date))
      .pipe(replace('[BUILD_ENV]', config.build_env))
      .pipe(gulp.dest(output.path))
      .pipe(connect.reload());
  },

  jshint: function(input, output, options) {
    options = options||{};

    return gulp
      .src(input)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
},

  less: function(input, output, options) {
    options = options||{};
    output = splitName(output);
    
    return gulp
      .src(input)
      .pipe(less())
      .pipe(minifyCss())
      .pipe(concat(output.name))
      .pipe(gulp.dest(output.path))
      .pipe(connect.reload());
  },

  fonts: function(input, output, options) {
    options = options||{};
    return gulp
      .src(input)
      .pipe(gulp.dest(output));
  },

  templates: function(input, output, options) {
    options = options||{};
    output = splitName(output);

    return gulp.src(input)
      .pipe(minifyHTML({empty:true}))
      .pipe(replace('[BUILD_VERSION]', config.build_version))
      .pipe(replace('[BUILD_DATE]', config.build_date))
      .pipe(replace('[BUILD_ENV]', config.build_env))
      .pipe(templateCache(output.name, {standalone:true}))
      .pipe(gulp.dest(output.path))
      .pipe(connect.reload());
  },

  html: function(input, output, options) {
    options = options||{};
    
    return gulp
      .src(input)
      .pipe(minifyHTML({empty:true}))
      .pipe(replace('[BUILD_VERSION]', config.build_version))
      .pipe(replace('[BUILD_DATE]', config.build_date))
      .pipe(replace('[BUILD_ENV]', config.build_env))
      .pipe(gulp.dest(output))
      .pipe(connect.reload());
  },
}