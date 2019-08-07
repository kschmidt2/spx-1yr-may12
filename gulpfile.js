// Gulp.js configuration

const
  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // modules
  log = require('fancy-log'),
  gulp = require('gulp'),
  noop = require('gulp-noop'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  terser = require('gulp-terser'),
  stripdebug = devBuild ? null : require('gulp-strip-debug'),
  sourcemaps = devBuild ? require('gulp-sourcemaps') : null,
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  browsersync = require('browser-sync').create(),
  rename = require('gulp-rename'),

  // folders
  app = 'app/',
  dist = 'dist/';

  // gets name of project folder by getting the path,
  // turning it into a string, splitting that string into an array,
  // and getting the last item out of the array
  const projectPath = process.cwd();
  JSON.stringify(projectPath);
  const projectFolder = projectPath.split('/');
  const projectName = projectFolder.pop();

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: 'dist'
    },
    port: 3000
  });
  done();
}

// image processing
function images() {

  const out = dist + 'img/';

  return gulp.src(app + 'img/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out))
    .pipe(browsersync.stream());

};
exports.images = images;

// HTML processing
function html() {
  const out = dist;

  return gulp.src(app + 'html/**/*')
    .pipe(newer(out))
    .pipe(devBuild ? noop() : htmlclean())
    .pipe(gulp.dest(out))
    .pipe(browsersync.stream());
}
exports.html = gulp.series(images, html);

// JS processing
function js() {

  return gulp.src(app + 'js/**/*')
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(deporder())
    .pipe(concat('main.js'))
    .pipe(stripdebug ? stripdebug() : noop())
    .pipe(terser())
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(rename(projectName + '_main.js'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(browsersync.stream());
}
exports.js = js;


// CSS processing
function css() {

  return gulp.src(app + 'scss/styles.scss')
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: '/images/',
      precision: 3,
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(postcss([
      assets({ loadPaths: ['images/'] }),
      autoprefixer,
      mqpacker,
      cssnano
    ]))
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(browsersync.stream());

}
exports.css = gulp.series(images, css);

// run all tasks
exports.build = gulp.parallel(exports.html, exports.css, exports.js);

// watch for file changes
function watch(done) {

  // image changes
  gulp.watch(app + 'images/**/*', images);

  // html changes
  gulp.watch(app + 'html/**/*', html);

  // js changes
  gulp.watch(app + 'js/**/*', js);

  // css changes
  gulp.watch(app + 'scss/**/*', css);

  done();

}
exports.watch = gulp.parallel(watch, browserSync);

exports.default = gulp.series(exports.build, exports.watch);










// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var gulpIf = require('gulp-if');
// var cssnano = require('gulp-cssnano');
// var imagemin = require('gulp-imagemin');
// var cache = require('gulp-cache');
// var del = require('del');
// var runSequence = require('run-sequence');


// // runs sass
// gulp.task('sass', function(){
//   return gulp.src('app/scss/styles.scss')
//     .pipe(sass()) // Using gulp-sass
//     .pipe(gulp.dest('app/css'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

// // automatically refreshes browser
// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'app'
//     },
//   })
// })

// // runs sass and browserSync concurrently
// gulp.task('watch', ['browserSync', 'sass'], function (){
//   gulp.watch('app/scss/**/*.scss', ['sass']);
//   gulp.watch('app/*.html', browserSync.reload);
//   gulp.watch('app/js/**/*.js', browserSync.reload);
// });

// minifies js and css
// gulp.task('useref', function(){
//   return gulp.src('app/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))
//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

// // optimizes images
// gulp.task('images', function(){
//   return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
//   // Caching images that ran through imagemin
//   .pipe(cache(imagemin({
//       interlaced: true
//     })))
//   .pipe(gulp.dest('dist/images'))
// });

// // moves fonts into correct folder
// gulp.task('fonts', function() {
//   return gulp.src('app/fonts/**/*')
//   .pipe(gulp.dest('dist/fonts'))
// })

// // cleans dist folder
// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// })

// // runs all optimization tasks
// gulp.task('build', function (callback) {
//   runSequence('clean:dist',
//     ['sass', 'useref', 'images', 'fonts'],
//     callback
//   )
// })

// gulp.task('default', function (callback) {
//   runSequence(['sass','browserSync', 'watch'],
//     callback
//   )
// })
