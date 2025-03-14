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
const gulpif = require("gulp-if");
const svgSprite = require("gulp-svg-sprite");
const webpCSS = require("gulp-webp-css");
const isProd = process.argv.includes("--build");

const clean = () => {
  return del(["dist"]);
};

const styles = () => {
  return src("src/css/**/index.css")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(
      gulpif(
        isProd,
        replace(/url\(['"]?(.*?)\.(jpg|jpeg|png)['"]?\)/g, "url($1.webp)")
      )
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulpif(isProd, webpCSS()))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      gulpif(
        isProd,
        htmlmin({
          collapseWhitespace: true,
        })
      )
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
    .pipe(gulpif(isProd, replace(/\.jpg|\.jpeg|\.png/g, ".webp")))
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
    .pipe(gulpif(isProd, imagemin()))
    .pipe(gulpif(isProd, webp()))
    .pipe(dest("dist/img"));
};

const scripts = () => {
  return src("src/js/**/*.js")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(
      gulpif(
        isProd,
        uglify({
          toplevel: true,
        }).on("error", notify.onError())
      )
    )
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  const sprite = src("src/img/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          defs: {
            sprite: "../sprite.defs.svg",
          },
          stack: {
            sprite: "../sprite.svg",
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                js2svg: { indent: 4, pretty: true },
              },
            },
          ],
        },
      })
    )
    .pipe(dest("dist/img"));

  return sprite;
};

const svgSymbols = () => {
  const sprite = src("src/img/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.symbol.svg",
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                js2svg: { indent: 4, pretty: true },
                plugins: [
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: "(fill|stroke)",
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest("dist/img"));

  return sprite;
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
  watch("src/img/**/*.svg", svgSprites);
  watch("src/img/**/*.svg", svgSymbols);
  watch("src/img/**/*.{jpg,jpeg,png,webp}", images);
};

exports.default = series(
  clean,
  htmlMinify,
  styles,
  scripts,
  svgSprites,
  svgSymbols,
  images,
  watchFiles
);
