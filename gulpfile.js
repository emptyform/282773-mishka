'use strict';
// Подключаем плагин(модуль)
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');// Группирует медиазапросы
var server = require('browser-sync').create();
var minify = require('gulp-csso');// Минификация
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var run = require('run-sequence');// Запускает задачи друг за другом
var del = require('del');

// Описание тасков
gulp.task('style', function() {
    gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: [
                'last 2 versions'
            ]}),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest('build/css'))// (pipe - передача файла от одного интрумента к другому, dest - путь назначения)
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css')) // Выплевываем файл который получился, в папку css
        .pipe(server.stream());
});


// Оптимизиция изображений
gulp.task('images', function() {
    return gulp.src('build/img/**/*.{png,jpg,gif}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest('build/img'));
});


// Сборка спрайтов svg
gulp.task('sprite', function() {
    return gulp.src('build/img/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'));

});

// Запускает задачи друг за другом
gulp.task('build', function(callback) {
    run(
        'clean',
        'copy',
        'style',
        'images',
        'sprite',
        callback);
});

// Корирование файлов
gulp.task('copy', function() {
    return gulp.src([
        'fonts/**/*.{woff,woff2}',
        'img/**',
        'js/**',
        '*.html'
    ], {
        base: '.'
    })
        .pipe(gulp.dest('build'));
});


gulp.task('clean', function() {
    return del('build');
});


gulp.task('html:copy', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
    server.reload();
    done();
});

// Запуск локального сервера
gulp.task('serve', function() {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    // Следит за изменениями файлов
    gulp.watch('sass/**/*.{scss,sass}', ['style']);// Следит за измениями в файлах, запускает таск ['style'];
    gulp.watch('*.html', ['html:update']);
});
