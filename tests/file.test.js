const fs = require('fs');
const {File} = require('../dist/build.common');

const FIND_DIR = `${__dirname}/rootdir`;
describe('File.find()', () => {
  test('All files should be found.', () => {
    const found = File.find(`${FIND_DIR}/*.*`);
    const expected = [
      `${FIND_DIR}/sample0_1.txt`,
      `${FIND_DIR}/sample0_2.txt`,
      `${FIND_DIR}/sample0_3.jpg`,
      `${FIND_DIR}/sample0_4.jpg`,
      `${FIND_DIR}/sample0_5.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('All files should be found, including subdirectories.', () => {
    const found = File.find(`${FIND_DIR}/**/*.*`);
    const expected = [
      `${FIND_DIR}/sample0_1.txt`,
      `${FIND_DIR}/sample0_2.txt`,
      `${FIND_DIR}/sample0_3.jpg`,
      `${FIND_DIR}/sample0_4.jpg`,
      `${FIND_DIR}/sample0_5.png`,
      `${FIND_DIR}/subdir1/sample1_2.jpg`,
      `${FIND_DIR}/subdir1/sample1_3.png`,
      `${FIND_DIR}/subdir1/sample1_1.txt`,
      `${FIND_DIR}/subdir2/sample2_1.txt`,
      `${FIND_DIR}/subdir2/sample2_2.jpg`,
      `${FIND_DIR}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Should find only png files.', () => {
    const found = File.find(`${FIND_DIR}/**/*.png`);
    const expected = [
      `${FIND_DIR}/sample0_5.png`,
      `${FIND_DIR}/subdir1/sample1_3.png`,
      `${FIND_DIR}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Only png or jpg files should be found.', () => {
    const found = File.find(`${FIND_DIR}/**/*.+(png|jpg)`);
    const expected = [
      `${FIND_DIR}/sample0_3.jpg`,
      `${FIND_DIR}/sample0_4.jpg`,
      `${FIND_DIR}/sample0_5.png`,
      `${FIND_DIR}/subdir1/sample1_2.jpg`,
      `${FIND_DIR}/subdir1/sample1_3.png`,
      `${FIND_DIR}/subdir2/sample2_2.jpg`,
      `${FIND_DIR}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
});