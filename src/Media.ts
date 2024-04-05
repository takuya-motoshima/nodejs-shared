import fs from 'fs';
import gm from 'gm';
// const gm = require('gm').subClass({imageMagick: true});
import File from '~/File';
import MergeImagesOptions from '~/interfaces/MergeImagesOptions';
import ImageData from '~/interfaces/ImageData';
import Dim from '~/interfaces/Dim';
import ImageInfo from '~/interfaces/ImageInfo';

const validDataUrl = /^data:([a-z]+\/[a-z0-9\-\+\._]+)(?:;..*)?,(..*)/i;

export default class Media {
  /**
   * ImageMagick instance.
   * @memberof Media
   */
  static #im: gm.SubClass = gm.subClass({imageMagick: true});

  /**
   * Write data URL to a file.
   * If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.
   * This method returns the path to the written file.
   * @static
   * @param {string} outputPath Output file path.
   * @param {string} dataUrl Data URL.
   * @param {number} permission File permissions. Default is 0o755.
   * @return {string} Path of the written file.
   * @memberof Media
   */
  public static writeDataUrlToFile(outputPath: string, dataUrl: string, permission: number = 0o755): string {
    if (!this.isDataUrl(dataUrl))
      throw new TypeError('Content is not in data URL format');
    const hasExtension = outputPath.lastIndexOf('.') !== -1;
    if (!hasExtension)
      outputPath += `.${this.getExtensionFromDataUrl(dataUrl)}`;
    const b64 = this.dataUrlToBase64(dataUrl);
    if (!b64)
      throw new Error('Writing to file aborted due to inability to convert from DataURL to base64');
    if (this.getMimeTypeFromDataUrl(dataUrl) === 'image/svg+xml')
      File.write(outputPath, File.isBase64(b64)
        ? Buffer.from(b64, 'base64').toString()
        : decodeURIComponent(b64), undefined, permission);
    else
      File.write(outputPath, b64, 'base64', permission);
    return outputPath;
  }

  /**
   * Convert data URL to blob data in base64 format.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string|null} Base 64 strings.
   * @memberof Media
   */
  public static dataUrlToBase64(dataUrl: string): string|null {
    const matches = dataUrl.match(validDataUrl);
    if (!matches)
      return null;
    return matches[2];
  }

  /**
   * Check if the string is in data URL format.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {boolean} True if it is a data URL.
   * @memberof Media
   */
  public static isDataUrl(dataUrl: string): boolean {
    return validDataUrl.test(dataUrl);
  }

  /**
   * Get the MIME type and base64 from the data URL string.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {{blob: string, type: string}|null} Data URL Analysis Results.
   * @memberof Media
   */
  public static statDataUrl(dataUrl: string): {blob: string, type: string, extension: string|null}|null {
    const matches = dataUrl.match(validDataUrl);
    if (!matches)
      return null;
    const blob = matches[2];
    const type = matches[1].split('/')[1].toLowerCase();
    let extension = type;
    if (extension === 'vnd.microsoft.icon')
      extension = 'ico';
    else if (extension === 'jpeg')
      extension = 'jpg';
    else if (extension === 'svg+xml')
      extension = 'svg';
    return {blob, type, extension};
  }

  /**
   * Get the dimensions (pixels) of the image.
   * @static
   * @param {string} filePath Image file path.
   * @return {{width: number, height: number }|null} Width and height (in pixels) of the image.
   * @memberof Media
   */
  public static getDimensions(filePath: string): {width: number, height: number }|null {
    const imageSize = require('image-size');
    const {width, height} = imageSize(filePath);
    if (width == null || height == null)
      return null;
    return {width, height};
  }

  /**
   * Crop from image.
   * @static
   * @param {string} inputPath Original image file path.
   * @param {string} outputPath Image path after cropping.
   * @param {number} options.left x-coordinate position (pixels) to crop.
   * @param {number} options.top y-coordinate position to crop to (in pixels).
   * @param {number} options.width Width to crop (pixels).
   * @param {number} options.height The height (in pixels) to crop.
   * @return {Promise<void>}
   * @memberof Media
   */
  public static async crop(inputPath: string, outputPath: string, {left, top, width, height}: {left: number, top: number, width: number, height: number}): Promise<void> {
    if (left < 0)
      left = 0;
    if (top < 0)
      top = 0;
    await require('sharp')(inputPath)
      .extract({left, top, width, height})
      .toFile(outputPath);
  }

  /**
   * Resize image.
   * If the output option is omitted, the original image is overwritten.
   * @static
   * @param {string} inputPath The image file path from which to resize.
   * @param {number} options.width Width after resizing.
   * @param {number} options.height Height after resizing.
   * @param {number} options.output Image file path after resizing. The default is none, which will overwrite the original image.
   * @param {boolean} options.contain If true, resizes the image so that the entire original image is visible. If false, it is stretched to fit the height or width and cropped to fill the area. Default is false.
   * @return {Promise<void>}
   * @memberof Media
   */
  public static async resize(inputPath: string, {width, height, output, contain = false}: {width?: number, height?: number, output?: string, contain?: boolean}): Promise<void> {
    // Methods by which an image can be resized to fit the provided dimensions.
    const fit = contain ? 'contain' : 'cover';

    // Resize image.
    const buffer = await require('sharp')(inputPath)
      .resize({width, height, fit})
      .toBuffer();

    // If the output file is unspecified, the input file is overwritten.
    if (!output)
      output = inputPath;

    // Write the resized image.
    await require('sharp')(buffer).toFile(output);
    require('sharp').cache(false);
    // const tmp = File.getTmpPath();
    // const fit = contain ? 'contain' : 'cover';
    // await require('sharp')(inputPath)
    //   .resize({width, height, fit})
    //   .toFile(tmp);
    // require('sharp').cache(false);
    // if (!output)
    //   output = inputPath;
    // File.rename(tmp, output);
  }

  /**
   * Get the byte size of data URL.
   *
   * x = (n * (3/4)) - y
   * Where:
   * 1. x is the size of a file in bytes
   * 2. n is the length of the Base64 String
   * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {number} Byte Size.
   * @memberof Media
   */
  public static dataUrlByteSize(dataUrl: string): number {
    if (!this.isDataUrl(dataUrl))
      throw new TypeError('Content is not in data URL format');
    const b64 = this.dataUrlToBase64(dataUrl);
    if (!b64)
      throw new Error('Cannot get base64 from DataURL when calculating byte size from DataURL');
    return this.base64ByteSize(b64);
  }

  /**
   * Get base64 byte size.
   *
   * x = (n * (3/4)) - y
   * Where:
   * 1. x is the size of a file in bytes
   * 2. n is the length of the Base64 String
   * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
   * @static
   * @param {string} b64 Base 64 strings.
   * @return {number} Byte Size.
   * @memberof Media
   */
  public static base64ByteSize(b64: string): number {
    // Check whether '=' character exists or not in data Url /9j/4AAQSk…=
    let noOfPaddingCharacter = 0;
    if (b64.charAt(b64.length - 2) === '=')
      noOfPaddingCharacter = 2;
    else if (b64.charAt(b64.length - 1) === '=')
      noOfPaddingCharacter = 1;
    return (b64.length * (3/4)) - noOfPaddingCharacter;
  }

  /**
   * Get Mime type from data URL.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string|null} Mime Type.
   * @memberof Media
   */
  public static getMimeTypeFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(validDataUrl);
    if (!matches)
      return null;
    return matches[1];
  }

  /**
   * Get extension from data URL.
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string|null} File extension.
   * @memberof Media
   */
  public static getExtensionFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(validDataUrl);
    if (!matches)
      return null;
    let extension = matches[1].split('/')[1].toLowerCase();
    if (extension === 'jpeg')
      extension = 'jpg';
    else if (extension === 'svg+xml')
      extension = 'svg';
    else if (extension === 'vnd.microsoft.icon')
      extension = 'ico';
    return extension;
  }

  /**
   * Merge images.
   * @static
   * @param {string[]} inputPaths Path list of image files to merge.
   * @param {string} outputPath File path of the merged image.
   * @param {'vertical'|'horizontal'} options.direction Direction of the merged image.
   * @param {string|{r: number, g: number, b: number, alpha: number}} options.color
   *  Default background color represented by RGBA hex value.
   *  Default is {alpha: 1., b: 0, g: 0, r: 0}.
   * @param {'start'|'center'|'end'|'start'} options.align Aligning of given images.
   *  If the images are not all the same size, images will be sorted to largest image.
   *  Possible values are start, center and end. Default is start.
   * @param {number} offset Offset in pixels between each image. Default is 0.
   * @param {number|string|{top: number, right: number, bottom: number, left: number}} options.margin
   *  Margin of the result image.
   *  If Number or String is passed, it will be considered as standard css shorthand properties (e.g. '40 40 0 10').
   *  An Object entry can have following options:
   *  - top Number (optional) - Margin on top side of result image. Default is 0.
   *  - right Number (optional) - Margin on right side of result image. Default is 0.
   *  - bottom Number (optional) - Margin on bottom side of result image. Default is 0.
   *  - left Number (optional) - Margin on left side of result image. Default is 0.
   * @return {Promise<void>}
   * @memberof Media
   */
  public static async mergeImages(inputPaths: string[], outputPath: string, options: Partial<MergeImagesOptions> = {}): Promise<void> {
    if (!Array.isArray(inputPaths))
      throw new TypeError('`inputPaths` must be an array that contains images');
    else if (inputPaths.length < 1)
      throw new Error('At least `inputPaths` must contain more than one image');
    options = Object.assign({
      direction: 'vertical',
      color: {alpha: 1., b: 0, g: 0, r: 0},
      align: 'start',
      offset: 0,
      margin: 0,
    }, options);
    function alignImage(total: number, size: number, align: 'start'|'center'|'end'|'start'): number {
      if (align === 'center')
        return (total - size) / 2;
      if (align === 'end')
        return total - size;
      return 0;
    }
    function calcMargin(margin: number|Dim|string): Dim {
      if (Number.isInteger(margin as number))
        return {bottom: margin as number, left: margin as number, right: margin as number, top: margin as number};
      if (typeof margin === 'string') {
        const [top, right = top, bottom = top, left = right] = margin.split(' ');
        return {
          bottom: Number(bottom),
          left: Number(left),
          right: Number(right),
          top: Number(top),
        };
      }
      const {top = 0, right = 0, bottom = 0, left = 0} = margin as Dim;
      return {bottom, left, right, top};
    }
    let totalX = 0;
    let totalY = 0;
    const imageDatum = (await Promise.all(inputPaths.map(async (inputPath: string): Promise<ImageData> => {
      const meta = await require('sharp')(inputPath).metadata();
      return {
        buffer: fs.readFileSync(inputPath),
        height: meta.height as number,
        offsetX: 0,
        offsetY: 0,
        width: meta.width as number,
        x: 0,
        y: 0,
      };
    }))).reduce((imageDatum, data) => {
      const {width, height, offsetY, offsetX} = data;
      imageDatum.push({...data, x: totalX + offsetX, y: totalY + offsetY});
      totalX += width + offsetX;
      totalY += height + offsetY;
      return imageDatum;
    }, [] as ImageData[]);
    const {top, right, bottom, left} = calcMargin(options.margin!);
    const marginTopBottom = top + bottom;
    const marginRightLeft = right + left;
    const isVertical = options.direction === 'vertical';
    const totalWidth = isVertical
      ? Math.max(...imageDatum.map(({width, offsetX}) => width + offsetX))
      : imageDatum.reduce((totalWidth, {width, offsetX}, index) => totalWidth + width + offsetX + Number(index > 0) * options.offset!, 0);
    const totalHeight = isVertical
      ? imageDatum.reduce((totalHeight, {height, offsetY}, index) => totalHeight + height + offsetY + Number(index > 0) * options.offset!, 0)
      : Math.max(...imageDatum.map(({height, offsetY}) => height + offsetY));
    const imageBase = require('sharp')({
      create: {
        background: options.color,
        channels: 4,
        height: totalHeight + marginTopBottom,
        width: totalWidth + marginRightLeft,
      },
    });
    const compositeData: any[] = imageDatum.map((imageData, index) => {
      const {buffer, x, y, offsetX, offsetY, width, height} = imageData;
      const [px, py] = isVertical
        ? [alignImage(totalWidth, width, options.align!) + offsetX, y + index * options.offset!]
        : [x + index * options.offset!, alignImage(totalHeight, height, options.align!) + offsetY];
      return {
        input: buffer,
        left: Math.floor(px + left),
        top: Math.floor(py + top),
      };
    });
    imageBase.composite(compositeData);
    await imageBase.toFile(outputPath);
    // return imageBase;
  }

  /**
   * Extract and save the first frame of the animated GIF.
   * @static
   * @param {string} inputPathOrDataUrl Path or Data URL of the input image.
   * @param {string?} outputPath Output image path. If not specified, the first frame image is overwritten in the original file.
   */
  public static async extractFirstFrameOfGif(inputPathOrDataUrl: string, outputPath?: string): Promise<void> {
    const isPath = File.isPath(inputPathOrDataUrl);
    if (isPath && !File.existsFile(inputPathOrDataUrl))
      throw new Error(`Input file ${inputPathOrDataUrl} not found`);
    else if (!isPath && !outputPath)
      throw new Error('If the input is a data URL, the output path is required');
    return new Promise<void>((resolve, reject) => {
      if (!outputPath)
        outputPath = inputPathOrDataUrl;
      // If the input is a data URL, the data URL is written to a file as the input path.
      let inputPath = inputPathOrDataUrl;
      if (!isPath) {
        inputPath = File.getTmpPath(this.statDataUrl(inputPathOrDataUrl)?.extension || 'tmp');
        this.writeDataUrlToFile(inputPath, inputPathOrDataUrl);
      }

      // Write the first frame of the GIF.
      this.#im(`${inputPath}[0]`).write(outputPath, (err: Error|null) => {
        if (err)
          return void reject(err);
        resolve();
      });
    });
  }

  /**
   * Get the number of GIF frames.
   * @static
   * @param {string} inputPathOrDataUrl Path or Data URL of the input image.
   * @return {Promise<number|null>} Number of frames in the image.
   * @memberof Media
   */
  public static async getNumberOfGifFrames(inputPathOrDataUrl: string): Promise<number|null> {
    const isPath = File.isPath(inputPathOrDataUrl);
    if (isPath && !File.existsFile(inputPathOrDataUrl))
      throw new Error(`Input file ${inputPathOrDataUrl} not found`);
    return new Promise<number|null>((resolve, reject) => {
      // If the input is a data URL, the data URL is written to a file as the input path.
      let inputPath = inputPathOrDataUrl;
      if (!isPath) {
        inputPath = File.getTmpPath(this.statDataUrl(inputPathOrDataUrl)?.extension || 'tmp');
        this.writeDataUrlToFile(inputPath, inputPathOrDataUrl);
      }

      // Conversion of image formats.
      this.#im(inputPath).identify((err: Error|null, data: ImageInfo) => {
        if (err)
          return void reject(err);
        if (data.format.toLocaleLowerCase() === 'gif' && Array.isArray(data?.Scene))
          resolve(data.Scene.length);
        else
          resolve(1);
      });
    });
  }

  // /**
  //  * Extract the first frame of the GIF as DataURL.
  //  * @static
  //  * @return {Promise<string>} DataURL of the first frame of the GIF.
  //  * @param {string} inputPath Input image path.
  //  */
  // public static async extractFirstFrameOfGifAsDataURL(inputPath: string): Promise<string> {
  //   if (!File.existsFile(inputPath))
  //     throw new Error(`Input file ${inputPath} not found`);
  //   return new Promise<string>((resolve, reject) => {
  //     // Write the first frame of the GIF.
  //     this.#im(`${inputPath}[0]`).write(outputPath, (err: Error|null) => {
  //       if (err)
  //         return void reject(err);
  //       resolve();
  //     });
  //   });
  // }

  /**
   * Convert Between Image Formats.
   * @static
   * @param {string} inputPathOrDataUrl Path or Data URL of the input image.
   * @param {string} outputPath? Allows you to specify the output path for converted images. The default is undefined.
   * @param {'bmp2'|'bmp3'|'bmp4'} options.bmpVersion? Version of BMP to output.
   *                                                    If the output is not BPM, this option is ignored.
   *                                                    Default is 'bmp3'.
   *                                                    Header size:
   *                                                      Windows BMP v2
   *                                                        Info header size: 12
   *                                                        Info header name: BITMAPCOREHEADER
   *                                                      Windows BMP v3
   *                                                        Info header size: 40
   *                                                        Info header name: BITMAPINFOHEADER
   *                                                      Windows BMP v4
   *                                                        Info header size: 108
   *                                                        Info header name: BITMAPV4HEADER
   *                                                      Windows BMP v5
   *                                                        Info header size: 124
   *                                                        Info header name: BITMAPV5HEADER
   * @param {boolean} options.trueColor? Set to true if 24-bit color is used for output BMP. Default is true.
   * @param {number} options.margin? The size of the top, bottom, left, and right margins to be added to the original image. Unit is in pixels. The default is none (undefined).
   * @param {string} options.background? The background color of the margin. This option is ignored if the margin option is absent. Default is white.
   * @return {Promise<string>} The data URL of the image whose format was converted.
   * @memberof Media
   */
  public static async convertImageFormat(
    inputPathOrDataUrl: string,
    outputPath?: string,
    options?: {
      bmpVersion: 'bmp2'|'bmp3'|'bmp4',
      trueColor: boolean,
      margin: number,
      background: string,
    }): Promise<string> {
    options = Object.assign({
      bmpVersion: 'bmp3',
      trueColor: true,
      margin: null,
      background: 'white',
    }, options);
    const isPath = File.isPath(inputPathOrDataUrl);
    if (isPath && !File.existsFile(inputPathOrDataUrl))
      throw new Error(`Input file ${inputPathOrDataUrl} not found`);
    return new Promise<string>((resolve, reject) => {
      // If the input is a data URL, the data URL is written to a file as the input path.
      let inputPath = inputPathOrDataUrl;
      if (!isPath) {
        inputPath = File.getTmpPath(this.statDataUrl(inputPathOrDataUrl)?.extension || 'tmp');
        this.writeDataUrlToFile(inputPath, inputPathOrDataUrl);
      }
      const inputExtension = (File.getExtension(inputPath) || '').toLocaleLowerCase();
      if (inputExtension === 'gif')
        inputPath += '[0]';

      // Temporary path of output.
      if (!outputPath)
        outputPath = File.getTmpPath(inputExtension);

      // Input Format.
      const inputFormat = (File.getExtension(outputPath) || '').toLocaleLowerCase();

      // If output is BPM, output in BPM V3 format.
      let bmpVersion ='';
      if (inputFormat === 'bmp')
        bmpVersion = `${options?.bmpVersion || 'bmp3'}:`;

      // If the input format is bmp, the truecolor option is applied.
      const state = this.#im(inputPath);
      if (inputFormat === 'bmp' && options?.trueColor)
        state.type('TrueColor');

      // Margins and background color.
      if (options?.margin) {
        state.border(options?.margin, options?.margin);
        state.borderColor(options?.background || 'white');
      }

      // Conversion of image formats.
      state.write(`${bmpVersion}${outputPath}`, (err: Error|null) => {
        if (err)
          return void reject(err);

        // Return the converted image as a data URL.
        resolve(File.readAsDataUrl(outputPath!));
      });
    });
  }
}