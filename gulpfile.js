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
const fileInclude = require("gulp-file-include");
const webpack = require("webpack-stream");
const file = require("gulp-file");
const isProd = process.argv.includes("--build");
requre("dotenv").config();

const clean = () => {
  return del(["dist"]);
};

const fonts = () => {
  return src("src/fonts/**", {
    encoding: false,
    removeBOM: false,
  }).pipe(dest("dist/fonts"));
};

const assets = () => {
  return src("src/assets/**", { encoding: false, removeBOM: false }).pipe(
    dest("dist/assets")
  );
};

const styles = () => {
  return src("src/css/**/index.css")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(
      replace(/url\(['"]?\.\.\/\.\.\/img\/(.*?)['"]?\)/g, 'url("../img/$1")')
    )
    .pipe(
      gulpif(
        isProd,
        replace(/url\(['"]?(.*?)\.(jpg|jpeg|png)['"]?\)/g, "url($1.webp)")
      )
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(gulpif(isProd, webpCSS()))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(gulpif(isProd, replace(/\.jpg|\.jpeg|\.png/g, ".webp")))
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
    .pipe(
      gulpif(
        isProd,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          minifyJS: true,
        })
      )
    )
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
      "!src/**/*.pdf",
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
  return (
    src("src/js/*.js")
      .pipe(gulpif(!isProd, sourcemaps.init()))
      .pipe(
        gulpif(
          isProd,
          babel({
            presets: ["@babel/env"],
          })
        )
      )
      // .pipe(concat("index.js"))
      .pipe(webpack(require("./webpack.config.js")))
      .pipe(
        gulpif(
          isProd,
          uglify({
            toplevel: true,
            compress: {
              unused: true,
              dead_code: true,
            },
          }).on("error", notify.onError())
        )
      )
      .pipe(gulpif(!isProd, sourcemaps.write()))
      .pipe(dest("dist/js"))
      .pipe(browserSync.stream())
  );
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

const generateConfig = () => {
  const config = `
    window.firebaseConfig = {
      apiKey: "${process.env.FIREBASE_API_KEY}",
      authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
      databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
      projectId: "${process.env.FIREBASE_PROJECT_ID}",
      storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
      messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
      appId: "${process.env.FIREBASE_APP_ID}",
      measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
    };
  `;
  return file("config.js", config, { src: true }).pipe(dest("dist/js"));
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
  watch("src/assets/**", assets);
  watch("src/fonts/**", fonts);
};

exports.default = series(
  clean,
  fonts,
  assets,
  htmlMinify,
  styles,
  scripts,
  svgSprites,
  svgSymbols,
  images,
  watchFiles
);

exports.build = series(
  clean,
  fonts,
  assets,
  htmlMinify,
  styles,
  scripts,
  generateConfig,
  svgSprites,
  svgSymbols,
  images
);
