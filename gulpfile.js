const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-image");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const typograf = require("gulp-typograf");
const del = require("del");
const webp = require("gulp-webp");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const replace = require("gulp-replace");

const clean = () => {
  return del(["dist"]);
};

const styles = () => {
  return src("src/css/**/index.css")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(replace(/\.jpg|\.jpeg|\.png/g, ".webp"))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      typograf({
        locale: ["ru", "en-US"],
        htmlEntity: { type: "digit" },
        safeTags: [
          ["<\\?php", "\\?>"],
          ["<no-typography>", "</no-typography>"],
        ],
      })
    )
    .pipe(replace(/\.jpg|\.jpeg|\.png/g, ".webp"))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(
    [
      "src/img/**/*.jpg",
      "src/img/**/*.jpeg",
      "src/img/**/*.png",
      "src/img/**/*.webp",
    ],
    {
      encoding: false,
    }
  )
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest("dist/img"));
};

const scripts = () => {
  return src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  watch("src/**/*.html", htmlMinify);
  watch("src/css/**/*.css", styles);
  watch("src/js/**/*.js", scripts);
  watch("src/img/**/*.jpg", images);
  watch("src/img/**/*.png", images);
};

exports.default = series(
  clean,
  htmlMinify,
  styles,
  scripts,
  images,
  watchFiles
);
