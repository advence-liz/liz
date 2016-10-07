//

var gulp = require("gulp"), //本地安装gulp所用到的地方
    clean = require("gulp-clean"),
    less = require("gulp-less"),
    minifycss = require("gulp-minify-css"),
    webpack = require('webpack-stream'),
    rename = require("gulp-rename"),
    babel = require("gulp-babel");

gulp.task("clean", function () {
    return gulp.src("dist/", { read: false }).pipe(clean());
});

gulp.task('copy:js',["clean"], function () {
    return gulp
        .src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/jquery-ui/jquery-ui.js'
            
        ])
        .pipe(
            gulp.dest('dist/js/')
        )
      
});

gulp.task('copy:css',["clean"],function(){
    return gulp
          .src([
              'bower_components/jquery-ui/themes/base/jquery-ui.css',
              'bower_components/bootstrap/dist/css/bootstrap.css'
          ])
           .pipe(
            gulp.dest('dist/css/')
        )
})

gulp.task('copy:fonts',["clean"],function(){
    return gulp
          .src([
              'bower_components/bootstrap/dist/fonts/**'
          ])
           .pipe(
            gulp.dest('dist/font/')
        )
})
gulp.task('complie:less',['clean'],function(){
    return gulp.src(['build/default/pack.less'])
          .pipe(less())
          .pipe(rename('widget.css'))
          .pipe(gulp.dest('dist/css/'))
})

gulp.task('complie:js',['clean'],function(){
        return gulp.src(['build/default/pack.js'])
            .pipe(webpack({
                output: {
                    filename:'widget.js'
                }
            }))
            .pipe(gulp.dest('dist/js/'))
          
})

gulp.task("default", ["copy:js", "copy:css","copy:fonts","complie:less","complie:js"]);