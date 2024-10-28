const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('Crop the image', async () => {
  const inputPath = `${inputDir}/sample1.jpg`;
  const outputPath = `${outputDir}/cropped.jpg`;
  await Media.crop(inputPath, outputPath, {left: 0, top: 0, width: 100, height: 100});
  expect(File.exists(outputPath)).toBe(true);
});