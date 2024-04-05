const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;

test('Get frame count from GIF', async () => {
  const numberOfFrames = await Media.getNumberOfGifFrames(`${inputDir}/sample.gif`);
  expect(numberOfFrames).toBe(19);
});

test('Get frame count from GIF without animation', async () => {
  const numberOfFrames = await Media.getNumberOfGifFrames(`${inputDir}/sample-non-animated.gif`);
  expect(numberOfFrames).toBe(1);
});

test('Get frame count from gif with data URL', async () => {
  const dataUrl = File.readAsString(`${inputDir}/gif.txt`);
  const numberOfFrames = await Media.getNumberOfGifFrames(dataUrl);
  expect(numberOfFrames).toBe(19);
});