const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('JPG data URL to file', () => {
  const outputFile = `${outputDir}/write-data-url-in-jpg.jpg`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-jpg.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('JPG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/write-data-url-in-jpg-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-jpg.txt`));
  expect(File.existsFile(`${outputFile}.jpg`)).toBe(true);
});

test('PNG data URL to file', () => {
  const outputFile = `${outputDir}/write-data-url-in-png.png`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-png.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('PNG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/write-data-url-in-png-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-png.txt`));
  expect(File.existsFile(`${outputFile}.png`)).toBe(true);
});

test('SVG data URL to file', () => {
  const outputFile = `${outputDir}/write-data-url-in-svg.svg`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-svg.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('SVG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/write-data-url-in-svg-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-svg.txt`));
  expect(File.existsFile(`${outputFile}.svg`)).toBe(true);
});

test('GIF data URL to file', () => {
  const outputFile = `${outputDir}/write-data-url-in-gif.gif`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-gif.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('GIF data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/write-data-url-in-gif-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-gif.txt`));
  expect(File.existsFile(`${outputFile}.gif`)).toBe(true);
});

test('PDF data URL to file', () => {
  const outputFile = `${outputDir}/write-data-url-in-pdf.pdf`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-pdf.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('PDF data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/write-data-url-in-pdf-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/data-url-in-pdf.txt`));
  expect(File.existsFile(`${outputFile}.pdf`)).toBe(true);
});