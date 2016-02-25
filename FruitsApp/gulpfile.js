(function () {
    'use strict';
    var gulp = require('gulp'),
    //gutil = require('gulp-util'),
    //connect = require('gulp-connect'),
    //open = require('gulp-open'),
        less = require('gulp-less'),
    //jade = require('gulp-jade'),
        rename = require('gulp-rename'),
    //header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
    //sourcemaps = require('gulp-sourcemaps'),
        minifyCSS = require('gulp-minify-css'),
    //tap = require('gulp-tap'),
        concat = require('gulp-concat'),
    //jshint = require('gulp-jshint'),
    //stylish = require('jshint-stylish'),
    //fs = require('fs'),
        autoprefix = require('gulp-autoprefixer'),
        del = require('del'),
        paths = {
            root: './',//当前路径
            source: {
                root: './',
                styles: 'dist/css/',
                scripts: 'dist/js/',
                img: 'dist/img/'
            },
            public: {
                root: './',
                styles: 'public/less/',
                scripts: 'public/js/',
                img: 'public/img/'
            }
        };

    var app = {
        filename: 'app',
        jsConcatFiles: [
            'datetime.js',
            'application.js',
            'common.js',
            'local-resizeI-img.js',
            'localtion.js',
            'validators.js',
            'qrcode.js',
            'WQRcode.js',
            'infinite.js',
            'modals.js',
            'swipeout.js',
            'needfastclick.js',
            'ajax-change-page.js',
            'footer.js',
            'published.js',
            'joined.js',
            'me.js',
            'home.js',
            'publish.js',
            'post.js',
            'participant.js',
            'detail.js'

        ],
        jsSingleFiles: [
            'fastclick.js',
            'jquery.js',
            'common.js'
        ]
    };
//    for (var i = 0; i < app.jsConcatFiles.length; i++) {
//        var jsf = app.jsConcatFiles[i];
//        app.jsConcatFiles[i] = paths.source.scripts + jsf;
//    }
//    for (var i = 0; i < app.jsSingleFiles.length; i++) {
//        var jsf = app.jsSingleFiles[i];
//        app.jsSingleFiles[i] = paths.source.scripts + jsf;
//    }
//    gulp.task('concatScripts', function (cb) {
//        gulp.src(app.jsConcatFiles)
//            .pipe(concat(app.filename + '.js'))
//            .pipe(gulp.dest(paths.public.scripts))
//            .pipe(uglify())
//            .pipe(rename(function (path) {
//                path.basename = path.basename + '.min';
//            }))
//            .pipe(gulp.dest(paths.public.scripts))
//            .on('end', function () {//完成后的回调，继续执行其他任务？
//                cb();
//            });
//    });
    gulp.task('styles', function (cb) {
        gulp.src(paths.public.styles + 'app.less')//标记要处理的文件，读文件过程
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(autoprefix())
            .pipe(gulp.dest(paths.source.styles))//处理完成的文件输出位置，写文件过程
            .pipe(minifyCSS({//css压缩
                advanced: false,
                aggressiveMerging: false
            }))
            .pipe(rename(function (path) {//压缩后重命名
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(paths.source.styles))//输出压缩后的文件
//          .pipe(connect.reload())//本地服务器相关的，如果配置了本地服务器，指的是本地服务器重启
            .on('end', function () {//完成后的回调，继续执行其他任务？
                cb();
            });
    });
    gulp.task('scripts', function (cb) {
        gulp.src(paths.public.scripts + 'app.js')//标记要处理的文件，读文件过程
            .pipe(uglify())
            .pipe(rename(function (path) {//压缩后重命名
                path.basename = path.basename + '.min';
            }))
            .pipe(gulp.dest(paths.source.scripts))//输出压缩后的文件
            //.pipe(connect.reload())//本地服务器相关的，如果配置了本地服务器，指的是本地服务器重启
            .on('end', function () {//完成后的回调，继续执行其他任务？
                cb();
            });
    });
//    gulp.task('scripts', function (cb) {//这个一次性处理的有点多,有点慢3.66s
//        gulp.src(app.jsSingleFiles)
//            .pipe(gulp.dest(paths.public.scripts))
//            .pipe(uglify())
//            .pipe(rename(function (path) {
//                path.basename = path.basename + '.min';
//            }))
//            .pipe(gulp.dest(paths.public.scripts))
//            .on('end', function () {//完成后的回调，继续执行其他任务？
//                cb();
//            });
//    });

    gulp.task('img', function (cb) {
        gulp.src([paths.public.img + '*.*'])
            .pipe(gulp.dest(paths.source.img))
            .on('end', function () {//完成后的回调，继续执行其他任务？
                cb();
            });
    });
    gulp.task('fonts', function (cb) {
        gulp.src([paths.public.fonts + '*.*'])
            .pipe(gulp.dest(paths.source.fonts))
            .on('end', function () {//完成后的回调，继续执行其他任务？
                cb();
            });
    });

    gulp.task('watch', function () {
//        gulp.watch(app.jsConcatFiles, ['concatScripts']).on('change', function (event) {
//            watcherLog(event);
//        });
//        gulp.watch(app.jsSingleFiles, ['scripts']).on('change', function (event) {
//            watcherLog(event);
//        });
//        gulp.watch(paths.source.styles + '*.*', ['styles']).on('change', function (event) {
//            watcherLog(event);
//        });
        gulp.watch(paths.public.styles + '*.*', ['styles']);
    });
//    function watcherLog(event) {
//        var filePath = event.path;
//        var fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
//        console.log('File ' + fileName + ' was ' + event.type + ', running tasks...');
//    }

    //由于调用顺序问题，这个任务无法加到default中，需要手动处理
//    gulp.task('clean', function (cb) {
//        del([
//                paths.public.root + '/**/*'
//        ], {force: true}, cb);
//    });
    gulp.task('default', ['styles','scripts','img']);
})();