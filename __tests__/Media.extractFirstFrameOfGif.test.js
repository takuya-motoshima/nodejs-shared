const fs = require('fs');
const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('Extract the first frame of GIF (Output to another file)', async () => {
  const inputPath = `${inputDir}/sample.gif`;
  const outputPath = `${outputDir}/gif-first-frame.gif`;
  await Media.extractFirstFrameOfGif(inputPath, outputPath);
  const numberOfFrames = await Media.getNumberOfGifFrames(outputPath);
  expect(numberOfFrames).toBe(1);
});

test('Extract the first frame of GIF (Overwrite original file)', async () => {
  const inputPath = `${inputDir}/sample.gif`;
  const outputPath = `${outputDir}/gif-first-frame-with-overwrite.gif`;

  // Copy the input file to a temporary file.
  const tmpPath = File.getTmpPath('gif');
  fs.copyFileSync(inputPath, tmpPath)
  await Media.extractFirstFrameOfGif(tmpPath);
  const numberOfFrames = await Media.getNumberOfGifFrames(tmpPath);
  expect(numberOfFrames).toBe(1);

  // Copy temporary files to the output directory.
  fs.renameSync(tmpPath, outputPath)
});

test('Extract the first frame of a GIF with no animation (Output to another file)', async () => {
  const inputPath = `${inputDir}/sample-non-animated.gif`;
  const outputPath = `${outputDir}/gif-without-animation-first-frame.gif`;
  await Media.extractFirstFrameOfGif(inputPath, outputPath);
  const numberOfFrames = await Media.getNumberOfGifFrames(outputPath);
  expect(numberOfFrames).toBe(1);
});

test('Extract the first frame of a GIF with no animation (Overwrite original file)', async () => {
  const inputPath = `${inputDir}/sample-non-animated.gif`;
  const outputPath = `${outputDir}/gif-without-animation-first-frame-with-overwrite.gif`;

  // Copy the input file to a temporary file.
  const tmpPath = File.getTmpPath('gif');
  fs.copyFileSync(inputPath, tmpPath)
  await Media.extractFirstFrameOfGif(tmpPath);
  const numberOfFrames = await Media.getNumberOfGifFrames(tmpPath);
  expect(numberOfFrames).toBe(1);

  // Copy temporary files to the output directory.
  fs.renameSync(tmpPath, outputPath)
});