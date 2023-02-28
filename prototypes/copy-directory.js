/**
 * ```sh
 * node prototypes/copy-directory.js
 * ```
 */
const {File} = require('../dist/build.common');

const srcDir = `${__dirname}/input/src-dir`;
const dstDir = `${__dirname}/output/dst-dir`;
File.copyDirectory(srcDir, dstDir);