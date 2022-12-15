const fs = require('fs');
const {File} = require('../dist/build.common');

const TEST_FIND_DIR = `${__dirname}/test-to-find-files`;
describe('File.find()', () => {
  test('All files should be found.', () => {
    const found = File.find(`${TEST_FIND_DIR}/*.*`);
    const expected = [
      `${TEST_FIND_DIR}/sample1.txt`,
      `${TEST_FIND_DIR}/sample2.txt`,
      `${TEST_FIND_DIR}/sample3.txt`,
      `${TEST_FIND_DIR}/sample4.jpg`,
      `${TEST_FIND_DIR}/sample5.jpg`,
      `${TEST_FIND_DIR}/sample6.jpg`,
      `${TEST_FIND_DIR}/sample7.png`,
      `${TEST_FIND_DIR}/sample8.png`
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
  test('All files should be found, including subdirectories.', () => {
    const found = File.find(`${TEST_FIND_DIR}/**/*.*`);
    const expected = [
      `${TEST_FIND_DIR}/sample1.txt`,
      `${TEST_FIND_DIR}/sample2.txt`,
      `${TEST_FIND_DIR}/sample3.txt`,
      `${TEST_FIND_DIR}/sample4.jpg`,
      `${TEST_FIND_DIR}/sample5.jpg`,
      `${TEST_FIND_DIR}/sample6.jpg`,
      `${TEST_FIND_DIR}/sample7.png`,
      `${TEST_FIND_DIR}/sample8.png`,
      `${TEST_FIND_DIR}/subdirectory-1/sample10.txt`,
      `${TEST_FIND_DIR}/subdirectory-1/sample11.jpg`,
      `${TEST_FIND_DIR}/subdirectory-1/sample12.jpg`,
      `${TEST_FIND_DIR}/subdirectory-1/sample13.png`,
      `${TEST_FIND_DIR}/subdirectory-1/sample9.txt`,
      `${TEST_FIND_DIR}/subdirectory-2/sample14.txt`,
      `${TEST_FIND_DIR}/subdirectory-2/sample15.jpg`,
      `${TEST_FIND_DIR}/subdirectory-2/sample16.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
  test('Should find only png files.', () => {
    const found = File.find(`${TEST_FIND_DIR}/**/*.png`);
    const expected = [
      `${TEST_FIND_DIR}/sample7.png`,
      `${TEST_FIND_DIR}/sample8.png`,
      `${TEST_FIND_DIR}/subdirectory-1/sample13.png`,
      `${TEST_FIND_DIR}/subdirectory-2/sample16.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
  test('Only png or jpg files should be found.', () => {
    const found = File.find(`${TEST_FIND_DIR}/**/*.+(png|jpg)`);
    const expected = [
      `${TEST_FIND_DIR}/sample4.jpg`,
      `${TEST_FIND_DIR}/sample5.jpg`,
      `${TEST_FIND_DIR}/sample6.jpg`,
      `${TEST_FIND_DIR}/sample7.png`,
      `${TEST_FIND_DIR}/sample8.png`,
      `${TEST_FIND_DIR}/subdirectory-1/sample11.jpg`,
      `${TEST_FIND_DIR}/subdirectory-1/sample12.jpg`,
      `${TEST_FIND_DIR}/subdirectory-1/sample13.png`,
      `${TEST_FIND_DIR}/subdirectory-2/sample15.jpg`,
      `${TEST_FIND_DIR}/subdirectory-2/sample16.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
});