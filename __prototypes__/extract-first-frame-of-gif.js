/**
 * ```sh
 * node __prototypes__/extract-first-frame-of-gif.js
 * ```
 */
const im = require('gm').subClass({imageMagick: true});

let inputPath = `${__dirname}/input/animated.gif`;
let outputPath = `${__dirname}/output/sample-first-frame.gif`;
im(`${inputPath}[0]`).write(outputPath, err => {
  if (err)
    console.error(err);
});

inputPath = `${__dirname}/input/non-animated.gif`;
outputPath = `${__dirname}/output/non-animated-first-frame.gif`;
im(`${inputPath}[0]`).write(outputPath, err => {
  if (err)
    console.error(err);
});
