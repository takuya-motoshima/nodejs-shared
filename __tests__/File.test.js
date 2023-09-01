const {File} = require('../dist/build.common');

const findDir = `${__dirname}/find`;

describe('File.find()', () => {
  test('All files should be found.', () => {
    const found = File.find(`${findDir}/*.*`);
    const expected = [
      `${findDir}/sample0_1.txt`,
      `${findDir}/sample0_2.txt`,
      `${findDir}/sample0_3.jpg`,
      `${findDir}/sample0_4.jpg`,
      `${findDir}/sample0_5.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('All files should be found, including subdirectories.', () => {
    const found = File.find(`${findDir}/**/*.*`);
    const expected = [
      `${findDir}/sample0_1.txt`,
      `${findDir}/sample0_2.txt`,
      `${findDir}/sample0_3.jpg`,
      `${findDir}/sample0_4.jpg`,
      `${findDir}/sample0_5.png`,
      `${findDir}/subdir1/sample1_2.jpg`,
      `${findDir}/subdir1/sample1_3.png`,
      `${findDir}/subdir1/sample1_1.txt`,
      `${findDir}/subdir2/sample2_1.txt`,
      `${findDir}/subdir2/sample2_2.jpg`,
      `${findDir}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Should find only png files.', () => {
    const found = File.find(`${findDir}/**/*.png`);
    const expected = [
      `${findDir}/sample0_5.png`,
      `${findDir}/subdir1/sample1_3.png`,
      `${findDir}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });

  test('Only png or jpg files should be found.', () => {
    const found = File.find(`${findDir}/**/*.+(png|jpg)`);
    const expected = [
      `${findDir}/sample0_3.jpg`,
      `${findDir}/sample0_4.jpg`,
      `${findDir}/sample0_5.png`,
      `${findDir}/subdir1/sample1_2.jpg`,
      `${findDir}/subdir1/sample1_3.png`,
      `${findDir}/subdir2/sample2_2.jpg`,
      `${findDir}/subdir2/sample2_3.png`,
    ];
    expect(found.sort()).toEqual(expected.sort());
  });
});
