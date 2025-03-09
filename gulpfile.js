const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const webp = require("gulp-webp");
const typograf = require("gulp-typograf");
const del = require("del");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;

const clean = () => {
  return del(["dist"]);
};

const styles = () => {
  return src("src/css/**/index.css")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
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
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(["src/img/**/*.jpg", "src/img/**/*.png", "src/img/**/*.jpeg"], {
    encoding: false,
  })
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
};

exports.default = series(
  clean,
  htmlMinify,
  styles,
  scripts,
  images,
  watchFiles
);
