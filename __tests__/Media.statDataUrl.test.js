const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;

test('Stat JPG data URL', () => {
  const dataUrl = File.readAsString(`${inputDir}/jpg.txt`);
  const stats = Media.statDataUrl(dataUrl);
  expect(stats.type).toBe('jpeg');
  expect(stats.extension).toBe('jpg');
  expect(stats.blob).toBe(Media.dataUrlToBase64(dataUrl));
});

test('Stat PNG data URL', () => {
  const dataUrl = File.readAsString(`${inputDir}/png.txt`);
  const stats = Media.statDataUrl(dataUrl);
  expect(stats.type).toBe('png');
  expect(stats.extension).toBe('png');
  expect(stats.blob).toBe(Media.dataUrlToBase64(dataUrl));
});

test('Stat SVG data URL', () => {
  const dataUrl = File.readAsString(`${inputDir}/svg.txt`);
  const stats = Media.statDataUrl(dataUrl);
  expect(stats.type).toBe('svg+xml');
  expect(stats.extension).toBe('svg');
  expect(stats.blob).toBe(Media.dataUrlToBase64(dataUrl));
});

test('Stat GIF data URL', () => {
  const dataUrl = File.readAsString(`${inputDir}/gif.txt`);
  const stats = Media.statDataUrl(dataUrl);
  expect(stats.type).toBe('gif');
  expect(stats.extension).toBe('gif');
  expect(stats.blob).toBe(Media.dataUrlToBase64(dataUrl));
});

test('Stat PDF data URL', () => {
  const dataUrl = File.readAsString(`${inputDir}/pdf.txt`);
  const stats = Media.statDataUrl(dataUrl);
  expect(stats.type).toBe('pdf');
  expect(stats.extension).toBe('pdf');
  expect(stats.blob).toBe(Media.dataUrlToBase64(dataUrl));
});