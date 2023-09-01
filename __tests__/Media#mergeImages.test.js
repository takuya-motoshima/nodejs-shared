const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('Merge images vertically', async () => {
  const imgs = [
    `${inputDir}/spongebob1.jpg`,
    `${inputDir}/spongebob2.jpg`,
    `${inputDir}/spongebob3.jpg`,
  ];
  const outputPath = `${outputDir}/merged-vertically.jpg`;
  await Media.mergeImages(imgs, outputPath, {direction: 'vertical'});
  expect(File.existsFile(outputPath)).toBe(true);
});

test('Merge images horizontally', async () => {
  const imgs = [
    `${inputDir}/spongebob1.jpg`,
    `${inputDir}/spongebob2.jpg`,
    `${inputDir}/spongebob3.jpg`,
  ];
  const outputPath = `${outputDir}/merged-horizontally.jpg`;
  await Media.mergeImages(imgs, outputPath, {direction: 'horizontal'});
  expect(File.existsFile(outputPath)).toBe(true);
});

test('Merge images vertically (with margins)', async () => {
  const imgs = [
    `${inputDir}/spongebob1.jpg`,
    `${inputDir}/spongebob2.jpg`,
    `${inputDir}/spongebob3.jpg`,
  ];
  const outputPath = `${outputDir}/merged-vertically-with-margins.jpg`;
  await Media.mergeImages(imgs, outputPath, {direction: 'vertical', offset: 30});
  expect(File.existsFile(outputPath)).toBe(true);
});

test('Merge images horizontally (with margins)', async () => {
  const imgs = [
    `${inputDir}/spongebob1.jpg`,
    `${inputDir}/spongebob2.jpg`,
    `${inputDir}/spongebob3.jpg`,
  ];
  const outputPath = `${outputDir}/merged-horizontally-with-margins.jpg`;
  await Media.mergeImages(imgs, outputPath, {direction: 'horizontal', offset: 30});
  expect(File.existsFile(outputPath)).toBe(true);
});