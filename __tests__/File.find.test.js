const path = require('path');
const {File} = require('../dist/build.common');

const searchDir = path.join(__dirname, 'input/search-directory');

test('Find the file in the first level directory', () => {
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

test('Find files in directories of all hierarchies', () => {
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

test('Find only PNG files from directories in all hierarchical levels', () => {
  const found = File.find(`${searchDir}/**/*.png`);
  const expected = [
    `${searchDir}/5.png`,
    `${searchDir}/1/13.png`,
    `${searchDir}/2/23.png`,
  ];
  expect(found.sort()).toEqual(expected.sort());
});

test('Find only PNG or JPG files from the directory of the whole hierarchy', () => {
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