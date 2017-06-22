'use strict';
// Подключаем плагин(модуль)
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');// Группирует медиазапросы и помещает их в конец CSS документа.
var server = require('browser-sync').create();
// var minify = require('gulp-csso');
// var rename = require('gulp-rename');
// var imagemin = require('gulp-imagemin');
// var svgstore = require('gulp-svgstore');
// var svgmin = require('gulp-svgmin');


// Описание тасков
gulp.task('style', function() {
    gulp.src('sass/style.scss') // Над этим файлом будет работа
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
        // .pipe(gulp.dest('css'))// (pipe - передача файла от одного интрумента к другому, dest - путь назначения)
        // .pipe(minify())
        // .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css')) // Выплевываем файл который получился, в папку css
        .pipe(server.stream());
});

// gulp.task('images', function() {
//     return gulp.src('img/**/*.{png,jpg,gif}')
//         .pipe(imagemin([
//             imagemin.optipng({optimizationLevel: 3}),
//             imagemin.jpegtran({progressive: true})
//         ]))
//         .pipe(gulp.dest('img'));
// });


// Запуск локального сервера
gulp.task('serve', ['style'], function() {
    server.init({
        server: '.',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    // Следит за изменениями файлов
    gulp.watch('sass/**/*.{scss,sass}', ['style']);
    gulp.watch('*.html').on('change', server.reload);
});
