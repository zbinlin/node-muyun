"use strict";

import babel from "rollup-plugin-babel";

export default {
    entry: "./index.js",
    dest: "./dist/index.js",
    format: "cjs",
    moduleName: "muyun",
    sourceMap: true,
    plugins: [
        babel(),
    ],
};
