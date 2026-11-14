import Typograf from "typograf";
import { defineConfig, loadEnv } from "vite";
import {resolve, extname} from "node:path";
import { createHtmlPlugin } from "vite-plugin-html";
import injectHTML from "vite-plugin-html-inject";
import svgr from "vite-plugin-svgr";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";


function typografPlugin({ enabled = true, options = {} } = {}) {
    return {
        name: "vite-plugin-typograf-inline",
        apply: "build",
        enforce: "post",
        transformIndexHtml(html) {
            if (!enabled) return html;
            const tp = new Typograf({
                locale: ["ru", "en-US"],
                htmlEntity: { type: "digit" },
                safeTags: [
                    ["<\\?php", "\\?>"],
                    ["<no-typography>", "</no-typography>"],
                ],
                ...options
            });
            return tp.execute(html)
        }
    }
}

export default defineConfig(({ command, mode }) => {
    const isProd = command === "build";
    const env = loadEnv(mode, process.cwd(), "");

    return {
        root: ".",
        publicDir: "public", //robots.txt, sitemap.xml 

        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV ?? "production"),
        },

        resolve: {
            alias: {
                "@": resolve(process.cwd(), "src"),
            },
        },

        css: {
            devSourcemap: true,
            postcss: {
                plugins: [
                    autoprefixer({ cascade: false }),
                    ...(isProd ? [cssnano({ preset: "default" })] : [])
                ]
            }
        },
        build: {
            outDir: "dist",
            sourcemap: !isProd,
            minify: isProd ? "terser" : false,
            terserOptions: isProd
                ? {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ["console.log",
                            "console.info"
                        ],
                        passes: 2,
                    },
                    mangle: true,
                    format: { comments: false },
                }
                : undefined,
            rollupOptions: {
                input: {
                    index: resolve(process.cwd(), "index.html"),
                    policy: resolve(process.cwd(), "policy.html"),
                    price: resolve(process.cwd(), "price.html"),
                    yandex: resolve(process.cwd(), "yandex_4c41d9965c1dacf4.html")
                },
                output: {
                    entryFileNames: "js/[name].bundle.js",
                    chunkFileNames: "js/[name].[hash:8].chunk.js",
                    assetFileNames: ({ names }) => {
                        const ext = extname(names?.[0] ?? "").toLowerCase();
                        if (ext === ".css") return "css/[name][extname]";
                        if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext))
                            return "img/[name][extname]";
                        if ([".woff", ".woff2", ".ttf", ".otf", ".eot"].includes(ext))
                            return "fonts/[name][extname]";
                        return "assets/[name][extname]";
                    },
                    manualChunks(id) {
                        if (!id.includes("node_modules")) return;
                        if (id.includes("gsap")) return "gsap";
                        if (id.includes("imask")) return "imask";
                        if (id.includes("firebase")) return "firebase";
                        if (id.includes("swiper")) return "swiper";
                        return "vendors";
                    },
                }
            }
        },

        plugins: [
            injectHTML(),

            typografPlugin({
                enabled: isProd,
                options: {
                    locale: ["ru", "en-US"],
                    htmlEntity: { type: "digit" },
                    safeTags: [
                        ["<\\?php", "\\?>"],
                        ["<no-typography>", "</no-typography>"],
                    ],
                }
            }),

            createHtmlPlugin({
                minify: isProd
                    ? {
                        collapseWhitespase: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        minifyJS: true,
                    }
                    : false,
                inject: {
                    data: {
                        env,
                    },
                },
            }),

            
            // SVG-спрайт через import (аналог gulp-svg-sprite)
            createSvgIconsPlugin({
                iconDirs: [resolve(process.cwd(), "src/img")],
                symbolId: "[name]",
                inject: "body-last",
                customDomId: "svg-sprite",
            }),

            // SVG как React-компонент (если понадобится)
            svgr(),

            // Оптимизация изображений (gulp-image + gulp-webp)
            ViteImageOptimizer({
                test: /\.(jpe?g|png|gif|webp)$/i,
                png: { quality: 80 },
                jpeg: { quality: 80 },
                jpg: { quality: 80 },
                webp: { quality: 80 },
                svg: {
                    plugins: [
                        { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
                    ],
                },
            }),
        ],

        server: {
            port: 3000,
            open: true,
        },

        optimizeDeps: {
            include: ["gsap", "imask", "swiper"],
        },

    }
})