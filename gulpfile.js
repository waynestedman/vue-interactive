const { src, dest, watch, series, parallel } = require("gulp");

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const livereload = require("gulp-livereload");
const replace = require("gulp-replace");

const files = {
  scssPath: "./src/sass/**/*.scss",
  jsPath: "./src/js/**/*.js"
};

livereload({ start: true });

function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(livereload());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(concat("scripts.js"))
    // .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(livereload());
}

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  livereload.listen();
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true }, //Makes docker work
    // series(parallel(scssTask, jsTask), cacheBustTask)
    series(parallel(scssTask, jsTask))
  );
}

// exports.default = series(parallel(scssTask, jsTask), cacheBustTask, watchTask);
exports.default = series(parallel(scssTask, jsTask), watchTask);
