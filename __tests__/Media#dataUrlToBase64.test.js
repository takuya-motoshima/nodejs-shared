const {Media, File} = require('../dist/build.common');

const inputDir = `${__dirname}/input`;

test('Get base64 from DataURL', () => {
  const dataUrl = File.readAsString(`${inputDir}/data-url-in-jpg.txt`);
  const b64 = dataUrl.replace(/^data:image\/?[A-z]*;base64,/, '');
  expect(Media.dataUrlToBase64(dataUrl)).toBe(b64);
});