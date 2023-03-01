/**
 * ```sh
 * node prototypes/stat-data-url.js
 * ```
 */
const {Media} = require('../dist/build.common');
const constants = require('./constants');

console.log('PNG data URL type=', Media.statDataUrl(constants.PNG_DATAURL).type);
console.log('JPG data URL type=', Media.statDataUrl(constants.JPG_DATAURL).type);
console.log('SVG data URL type=', Media.statDataUrl(constants.SVG_DATAURL).type);
console.log('GIF data URL type=', Media.statDataUrl(constants.GIF_DATAURL).type);