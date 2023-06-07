/**
 * ```sh
 * node __prototypes__/get-tmp-path.js
 * ```
 */
const {File} = require('../dist/build.common');

console.log(File.getTmpPath('gif'));