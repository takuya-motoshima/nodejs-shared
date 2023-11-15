const path = require('path');
const {File} = require('../dist/build.common');

const searchDir = path.join(__dirname, 'input/search-directory');

test('Find files from the first layer', () => {
  const found = File.find(`${searchDir}/*.*`);
  const expected = [
    `${searchDir}/1.txt`,
    `${searchDir}/2.txt`,
    `${searchDir}/3.jpg`,
    `${searchDir}/4.jpg`,
    `${searchDir}/5.png`,
  ];
  expect(found.sort()).toEqual(expected.sort());
});

test('Find files from all layers', () => {
  const found = File.find(`${searchDir}/**/*.*`);
  const expected = [
    `${searchDir}/1.txt`,
    `${searchDir}/2.txt`,
    `${searchDir}/3.jpg`,
    `${searchDir}/4.jpg`,
    `${searchDir}/5.png`,
    `${searchDir}/1/12.jpg`,
    `${searchDir}/1/13.png`,
    `${searchDir}/1/11.txt`,
    `${searchDir}/2/21.txt`,
    `${searchDir}/2/22.jpg`,
    `${searchDir}/2/23.png`,
  ];
  expect(found.sort()).toEqual(expected.sort());
});

test('Find PNG files from all layers', () => {
  const found = File.find(`${searchDir}/**/*.png`);
  const expected = [
    `${searchDir}/5.png`,
    `${searchDir}/1/13.png`,
    `${searchDir}/2/23.png`,
  ];
  expect(found.sort()).toEqual(expected.sort());
});

test('Find PNG and JPG files from all layers', () => {
  const found = File.find(`${searchDir}/**/*.+(png|jpg)`);
  const expected = [
    `${searchDir}/3.jpg`,
    `${searchDir}/4.jpg`,
    `${searchDir}/5.png`,
    `${searchDir}/1/12.jpg`,
    `${searchDir}/1/13.png`,
    `${searchDir}/2/22.jpg`,
    `${searchDir}/2/23.png`,
  ];
  expect(found.sort()).toEqual(expected.sort());
});