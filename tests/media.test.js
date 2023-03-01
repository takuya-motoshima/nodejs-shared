const fs = require('fs');
const {Media, File} = require('../dist/build.common');
const constants = require('./constants');

const INPUT_DIR = `${__dirname}/input`;
const INPUT_BACKUP_DIR = `${__dirname}/input-backup`;
const OUTPUT_DIR = `${__dirname}/output`;

beforeAll(() => {
  // Reset the output directory before starting the test for this file.
  if (fs.existsSync(OUTPUT_DIR))
    fs.rmdirSync(OUTPUT_DIR, {recursive: true, force: true});
  fs.mkdirSync(OUTPUT_DIR);

  // The input directory will be overwritten during the test, so Reset before testing.
  File.copyDirectory(INPUT_BACKUP_DIR, INPUT_DIR);
});

describe('Media.writeDataUrlToFile()', () => {
  test('png data URL should be written to file.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-1.png`;
    Media.writeDataUrlToFile(filePath, constants.PNG_DATAURL);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('jpg data URL should be written to file.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-2.jpg`;
    Media.writeDataUrlToFile(filePath, constants.JPG_DATAURL);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('svg data URL should be written to file.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-3.svg`;
    Media.writeDataUrlToFile(filePath, constants.SVG_DATAURL);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('png data URL should be written in a file with the extension automatically assigned.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-4`;
    Media.writeDataUrlToFile(filePath, constants.PNG_DATAURL);
    expect(fs.existsSync(`${filePath}.png`)).toBe(true);
  });

  test('jpg data URL should be written in a file with the extension automatically assigned.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-5`;
    Media.writeDataUrlToFile(filePath, constants.JPG_DATAURL);
    expect(fs.existsSync(`${filePath}.jpg`)).toBe(true);
  });

  test('svg data URL should be written in a file with the extension automatically assigned.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-6`;
    Media.writeDataUrlToFile(filePath, constants.SVG_DATAURL);
    expect(fs.existsSync(`${filePath}.svg`)).toBe(true);
  });

  test('GIF data URL should be written in a file with the extension automatically assigned.', () => {
    const filePath = `${OUTPUT_DIR}/media-write-data-url-to-file-7`;
    Media.writeDataUrlToFile(filePath, constants.GIF_DATAURL);
    expect(fs.existsSync(`${filePath}.gif`)).toBe(true);
  });
});

describe('Media.crop()', () => {
  test('image should be crop.', async () => {
    const inputPath = `${INPUT_DIR}/sample1.png`;
    const outputPath = `${OUTPUT_DIR}/media-crop-1.png`;
    await Media.crop(inputPath, outputPath, {left: 0, top: 0, width: 256, height: 256});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});

describe('Media.mergeImages()', () => {
  test('Images should be merged vertically.', async () => {
    const inputPaths = [
      `${INPUT_DIR}/sample3.png`,
      `${INPUT_DIR}/sample2.png`,
      `${INPUT_DIR}/sample1.png`,
    ];
    const outputPath = `${OUTPUT_DIR}/media-merge-images-1.png`;
    await Media.mergeImages(inputPaths, outputPath, {direction: 'vertical'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Images should be merged horizontally.', async () => {
    const inputPaths = [
      `${INPUT_DIR}/sample3.png`,
      `${INPUT_DIR}/sample2.png`,
      `${INPUT_DIR}/sample1.png`,
    ];
    const outputPath = `${OUTPUT_DIR}/media-merge-images-2.png`;
    await Media.mergeImages(inputPaths, outputPath, {direction: 'horizontal'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Images should be merged vertically with a 30px margin between each image.', async () => {
    const inputPaths = [
      `${INPUT_DIR}/sample3.png`,
      `${INPUT_DIR}/sample2.png`,
      `${INPUT_DIR}/sample1.png`,
    ];
    const outputPath = `${OUTPUT_DIR}/media-merge-images-3.png`;
    await Media.mergeImages(inputPaths, outputPath, {direction: 'vertical', offset: 30});
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Images should be merged horizontally with a 30px margin between each image.', async () => {
    const inputPaths = [
      `${INPUT_DIR}/sample3.png`,
      `${INPUT_DIR}/sample2.png`,
      `${INPUT_DIR}/sample1.png`,
    ];
    const outputPath = `${OUTPUT_DIR}/media-merge-images-4.png`;
    await Media.mergeImages(inputPaths, outputPath, {direction: 'horizontal', offset: 30});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});

describe('Media.extractFirstFrameOfGif()', () => {
  test('The first frame of a GIF should be written to another image.', async () => {
    const inputPath = `${INPUT_DIR}/sample.gif`;
    const outputPath = `${OUTPUT_DIR}/first-frame-of-sample.gif`;
    await Media.extractFirstFrameOfGif(inputPath, outputPath);
    const numberOfFrames = await Media.getNumberOfGifFrames(outputPath);
    expect(numberOfFrames).toBe(1);
  });

  test('The first frame of the GIF should be overwritten into the input image.', async () => {
    const inputPath = `${INPUT_DIR}/sample.gif`;
    await Media.extractFirstFrameOfGif(inputPath);
    const numberOfFrames = await Media.getNumberOfGifFrames(inputPath);
    expect(numberOfFrames).toBe(1);
  });

  test('The first frame of a GIF with no animation should be written to another image.', async () => {
    const inputPath = `${INPUT_DIR}/sample-non-animated.gif`;
    const outputPath = `${OUTPUT_DIR}/first-frame-of-sample-without-animation.gif`;
    await Media.extractFirstFrameOfGif(inputPath, outputPath);
    const numberOfFrames = await Media.getNumberOfGifFrames(outputPath);
    expect(numberOfFrames).toBe(1);
  });

  test('The first frame should be taken from the GIF data URL and written to a file.', async () => {
    const outputPath = `${OUTPUT_DIR}/first-frame-of-the-gif-data-url.gif`;
    await Media.extractFirstFrameOfGif(constants.GIF_DATAURL, outputPath);
    const numberOfFrames = await Media.getNumberOfGifFrames(outputPath);
    expect(numberOfFrames).toBe(1);
  });
});

describe('Media.getNumberOfGifFrames()', () => {
  test('Should get the number of frames in the GIF.', async () => {
    const inputPath = `${INPUT_DIR}/sample2.gif`;
    const numberOfFrames = await Media.getNumberOfGifFrames(inputPath);
    expect(numberOfFrames).toBe(19);
  });

  test('Should get the number of frames of a GIF without animation.', async () => {
    const inputPath = `${INPUT_DIR}/sample-non-animated.gif`;
    const numberOfFrames = await Media.getNumberOfGifFrames(inputPath);
    expect(numberOfFrames).toBe(1);
  });

  test('Should get the number of frames from the GIF Data URL.', async () => {
    const numberOfFrames = await Media.getNumberOfGifFrames(constants.GIF_DATAURL);
    expect(numberOfFrames).toBe(19);
  });
});

describe('Media.dataUrlToBase64()', () => {
  test('Should be able to convert GIF data URLs to base64.', () => {
    const expected = constants.GIF_BASE_64;
    expect(Media.dataUrlToBase64(constants.GIF_DATAURL)).toBe(expected);
  });
});

describe('Media.statDataUrl()', () => {
  test('GIF data URL type should be "gif".', () => {
    expect(Media.statDataUrl(constants.GIF_DATAURL).type).toBe('gif');
  });

  test('PNG data URL type should be "png".', () => {
    expect(Media.statDataUrl(constants.PNG_DATAURL).type).toBe('png');
  });

  test('JPG data URL type should be "jpeg".', () => {
    expect(Media.statDataUrl(constants.JPG_DATAURL).type).toBe('jpeg');
  });

  test('SVG data URL type should be "svg+xml".', () => {
    expect(Media.statDataUrl(constants.SVG_DATAURL).type).toBe('svg+xml');
  });
});