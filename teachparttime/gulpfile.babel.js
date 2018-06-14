import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import fileinclude from 'gulp-file-include';
import cleanCSS from 'gulp-clean-css';
import minify from 'gulp-minifier';
import tildeImporter from '@kirpich634/node-sass-tilde-importer';
import uglify from 'gulp-uglify-es';

var paths = {
  scripts: {
    input: 'app/scripts/**/*.js',
    tmp: '.tmp/scripts/',
    output: 'dist/scripts/'
  },
  styles: {
    input: 'app/styles/**/*.scss',
    tmp: '.tmp/styles/',
    output: 'dist/styles/'
  },
  html: {
    input: 'app/pages/**/*.html',
    tmp: '.tmp/',
    output: 'dist/'
  },
  images: {
    input: 'app/images/**/*.{jpeg,jpg,png,svg,gif,ico}',
    tmp: '.tmp/images/',
    output: 'dist/images/'
  },
  fonts: {
    input: 'app/fonts/**/*.{ttf,woff,eof,svg}',
    tmp: '.tmp/fonts',
    output: 'dist/fonts/'
  },
  misc: {
    input: 'app/*.{ico,png,txt,xml,json}',
    tmp: '.tmp/',
    output: 'dist/'
  },
  data: {
    input: 'app/data/**/*.{json,mp4,webm}',
    tmp: '.tmp/data/',
    output: 'dist/data/'
  }
};

const $ = gulpLoadPlugins();
const reload = browserSync.reload;



gulp.task('lint:styles', () => {
  return gulp.src([paths.styles.input, '!app/styles/_variables.scss'])
    .pipe(scsslint({
      'config': 'default.yml'
    }))
})

gulp.task('styles', () => {
  return gulp.src(paths.styles.input)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      importer: tildeImporter,
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['node_modules']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 3 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.styles.tmp))
    .pipe(reload({stream: true}));
})


gulp.task('build:styles', () => {
  return gulp.src(paths.styles.input)
    .pipe($.plumber())
    .pipe($.sass.sync({
      importer: tildeImporter,
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['node_modules']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 3 versions', 'Firefox ESR']}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles.output))
})


gulp.task('scripts', () => {
  return gulp.src([paths.scripts.input, '!node_modules/**'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({presets: ['es2015']}))
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
      }
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.tmp))
    .pipe(reload({stream: true}));
})


gulp.task('lint:scripts', () => {
  return gulp.src([paths.scripts.input, '!node_modules/**'])
    .pipe($.plumber())
    .pipe($.eslint({
      extends: "airbnb"
    }))
    .pipe($.eslint.format())
    .pipe(reload({stream: true}));
})


gulp.task('fileinclude', () => {
  return gulp.src([paths.html.input, '!app/partials/**/*'])
    .pipe($.plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest(paths.html.tmp))
    .pipe(browserSync.stream());
})

gulp.task('html', ['build:styles', 'scripts'], () => {
  return gulp.src([paths.html.input, '!app/partials/**/*'])
    .pipe($.plumber())
    .pipe($.if('*.html', fileinclude({
        prefix: '@@',
        basepath: '@root'
      })))
    .pipe($.useref({
      searchPath: ['node_modules', 'app'],
      base: '../'
    }))
    .pipe($.if('*.js', uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({
      // collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest(paths.html.output))
    .pipe($.if('../scripts/**/*.js', gulp.dest(paths.scripts.output))).on('end', function () {
      del(['scripts'])
    })
})

gulp.task('data', () => {
  return gulp.src(require('main-bower-files')('**/*.{json,mp4,webm}', function (err) {
  })
    .concat(paths.data.input))
    .pipe(gulp.dest(paths.data.tmp))
    .pipe(gulp.dest(paths.data.output));
})

gulp.task('images', () => {
  return gulp.src(paths.images.input)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest(paths.images.output));
})

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {
    })
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
})

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/partials/**/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
})


gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'scripts']));

gulp.task('serve', ['fileinclude', 'images', 'styles', 'scripts', 'fonts', 'data'], () => {
  browserSync({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['.tmp', 'app', 'node_modules']
    },
    cors: true
  });


  gulp.watch([
    '.tmp/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*',
    '.tmp/scripts/*.js'
  ]).on('change', reload);

  gulp.watch('app/**/*.html', ['fileinclude']);
  gulp.watch('app/scripts/*.js', ['fileinclude']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
})


gulp.task('build', ['html', 'images', 'fonts', 'extras', 'data'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
})


gulp.task('default', ['clean'], () => {
  gulp.start('build');
})

