const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;

test('JPG data URL to file', () => {
  const outputFile = `${outputDir}/from-dataurl.jpg`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/jpg.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('JPG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/from-dataurl-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/jpg.txt`));
  expect(File.existsFile(`${outputFile}.jpg`)).toBe(true);
});

test('PNG data URL to file', () => {
  const outputFile = `${outputDir}/from-dataurl.png`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/png.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('PNG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/from-dataurl-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/png.txt`));
  expect(File.existsFile(`${outputFile}.png`)).toBe(true);
});

test('SVG data URL to file', () => {
  const outputFile = `${outputDir}/from-dataurl.svg`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/svg.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('SVG data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/from-dataurl-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/svg.txt`));
  expect(File.existsFile(`${outputFile}.svg`)).toBe(true);
});

test('GIF data URL to file', () => {
  const outputFile = `${outputDir}/from-dataurl.gif`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/gif.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('GIF data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/from-dataurl-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/gif.txt`));
  expect(File.existsFile(`${outputFile}.gif`)).toBe(true);
});

test('PDF data URL to file', () => {
  const outputFile = `${outputDir}/from-dataurl.pdf`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/pdf.txt`));
  expect(File.existsFile(outputFile)).toBe(true);
});

test('PDF data URL to file (extension automatically assigned)', () => {
  const outputFile = `${outputDir}/from-dataurl-without-extension`;
  Media.writeDataUrlToFile(outputFile, File.readAsString(`${inputDir}/pdf.txt`));
  expect(File.existsFile(`${outputFile}.pdf`)).toBe(true);
});