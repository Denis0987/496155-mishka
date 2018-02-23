"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-cssmin");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");


gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
    ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
});


gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
})

gulp.task("sprite", function () {
  return gulp.src([
    "source/img/icon-menu-open.svg",
    "source/img/icon-menu-close.svg",
    "source/img/icon-interior.svg",
    "source/img/icon-toy.svg",
    "source/img/icon-search.svg",
    "source/img/icon-cart.svg",
    "source/img/icon-play.svg",
    "source/img/icon-left-arrow.svg",
    "source/img/icon-phone.svg",
    "source/img/icon-mail.svg",
    "source/img/logo-footer.svg",
    "source/img/logo-htmlacademy.svg",
    "source/img/icon-insta.svg",
    "source/img/icon-fb.svg",
    "source/img/icon-twitter.svg"])
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
    ]))
  .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    done
    );
});

