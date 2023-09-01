/**
 * ```sh
 * node __prototypes__/get-number-of-gif-frames.js
 * ```
 */
const im = require('gm').subClass({imageMagick: true});

const inputPath = `${__dirname}/input/animated.gif`;

im(inputPath).identify((err, data) => {
  console.log(JSON.stringify(data, null, 2));
  const numberOfFrames = data.format.toLocaleLowerCase() === 'gif' ? data.Scene.length : 1;
  console.log(`numberOfFrames=${numberOfFrames}`);
});