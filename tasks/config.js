var project       = require('../package.json');
var files         = require('../files.json');
var build_version = project.version;
var build_date    = (new Date()).toISOString().replace(/T.*/, '');
var build_env     = 'development';

exports.project       = project;
exports.files         = files;
exports.build_version = build_version;
exports.build_date    = build_date;
exports.build_env     = build_env;