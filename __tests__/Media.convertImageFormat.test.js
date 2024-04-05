const {Media} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('Convert JPG to PNG', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample1.jpg`,
    `${outputDir}/jpg2png.png`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('png');
});

test('Convert JPG to GIF', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample1.jpg`,
    `${outputDir}/jpg2gif.gif`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('gif');
});

test('Convert PNG to JPG', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample4.png`,
    `${outputDir}/png2jpg.jpg`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('jpg');
});

test('Convert PNG to GIF', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample4.png`,
    `${outputDir}/png2gif.gif`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('gif');
});

test('Convert GIF to JPG (first frame only)', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample.gif`,
    `${outputDir}/gif2jpg.jpg`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('jpg');
});

test('Convert GIF to PNG (first frame only)', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample.gif`,
    `${outputDir}/gif2png.png`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('png');
});

test('Convert JPG to BMP', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample1.jpg`,
    `${outputDir}/pg2bmp.bmp`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('bmp');
});

test('Convert PNG to BMP', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample4.png`,
    `${outputDir}/png2bmp.bmp`
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('bmp');
});

test('Convert JPG to BMP (24bit color)', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample1.jpg`,
    `${outputDir}/jpg2bmp-with-24bit-color.bmp`,
    {trueColor: true}
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('bmp');
});

test('Convert JPG to PNG with background and margins', async () => {
  const dataUrl = await Media.convertImageFormat(
    `${inputDir}/sample1.jpg`,
    `${outputDir}/jpg2png-with-background-and-margins.png`,
    {margin: 100, background: 'black'}
  );
  expect(Media.statDataUrl(dataUrl).extension).toBe('png');
});