"use strict";

import babel from "rollup-plugin-babel";

export default {
    entry: "./index.js",
    dest: "./dist/index.js",
    format: "cjs",
    moduleName: "muyun",
    sourceMap: true,
    plugins: [
        babel({
            presets: [
                [
                    "latest", {
                        es2015: false,
                    },
                ],
                "es2015-rollup",
            ],
            plugins: [
                [
                    "transform-runtime", {
                        helpers: false,
                        polyfill: false,
                        regenerator: true,
                    },
                ],
            ],
        }),
    ],
};
