const fs = require('fs');
const {Media} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('Resize the image and write in another file', async () => {
  const inputPath = `${inputDir}/sample1.jpg`;
  const outputPath = `${outputDir}/resized.jpg`;
  await Media.resize(inputPath, {width: 100, output: outputPath});
  const {width} = Media.getDimensions(outputPath);
  expect(width).toBe(100);
});

test('Resize and overwrite the image', async () => {
  const outputPath = `${outputDir}/overwritten-and-resized.jpg`;
  fs.copyFileSync(`${inputDir}/sample1.jpg`, outputPath);
  await Media.resize(outputPath, {width: 100});
  const {width} = Media.getDimensions(outputPath);
  expect(width).toBe(100);
});