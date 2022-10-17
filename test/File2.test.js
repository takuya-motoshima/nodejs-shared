const {File} = require('../dist/build.common.js');

const imgDir = `${__dirname}/img`;

// Load PNG image as DataURL.
let dataUrl = File.readAsDataUrl(`${imgDir}/sample.png`);
console.log('dataUrl=', dataUrl);

// Load SVG image as DataURL.
dataUrl = File.readAsDataUrl(`${imgDir}/sample.svg`);
console.log('dataUrl=', dataUrl);