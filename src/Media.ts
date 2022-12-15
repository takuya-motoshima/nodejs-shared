import fs from 'fs';
const imageSize = require('image-size');
const sharp = require('sharp');
import File from './File';
import MergeImagesOptions from '~/interfaces/MergeImagesOptions';
import ImageData from '~/interfaces/ImageData';
import Dim from '~/interfaces/Dim';

export default class Media {
  /**
   * Write data URL to a file.
   * If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.
   * This method returns the path to the written file.
   *
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
    if (!hasExtension) {
      const extension = this.getExtensionFromDataUrl(dataUrl);
      outputPath += `.${extension}`;
    }
    const isSVG = this.getMimeTypeFromDataUrl(dataUrl) === 'image/svg+xml';
    if (!isSVG)
      File.write(outputPath, this.dataUrlToBase64(dataUrl), 'base64', permission);
    else {
      const base64 = this.dataUrlToBase64(dataUrl);
      let content;
      if (File.isBase64(base64)) 
        content = Buffer.from(base64, 'base64').toString();
      else
        content = decodeURIComponent(base64);
      File.write(outputPath, content, undefined, permission);
    }
    return outputPath;
  }

  /**
   * Convert data URL to blob data in base64 format.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string} Base 64 strings.
   * @memberof Media
   */
  public static dataUrlToBase64(dataUrl: string): string {
    return dataUrl.replace(/^data:image\/[\w-+\d.]+;\w+,/, '');
    // return dataUrl.replace(/^data:image\/[A-Za-z]+;base64,/, '');
  }

  /**
   * Check if the string is in data URL format.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {boolean} True if it is a data URL.
   * @memberof Media
   */
  public static isDataUrl(dataUrl: string): boolean {
    return /^data:image\/[\w-+\d.]+;\w+,/.test(dataUrl);
    // return /^data:image\/[A-Za-z]+;base64,/.test(dataUrl);
  }

  /**
   * Get the MIME type and base64 from the data URL string.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {{blob: string, type: string}|undefined} Data URL Analysis Results.
   * @memberof Media
   */
  public static statDataUrl(dataUrl: string): {blob: string, type: string}|undefined {
    const matches = dataUrl.match(/^data:image\/([\w-+\d.]+);\w+,(.+)$/);
    // const matches = dataUrl.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3)
      return undefined;
    const blob = matches[2];
    const type = matches[1];
    return {blob, type};
  }

  /**
   * Get the dimensions (pixels) of the image.
   *
   * @static
   * @param {string} filePath Image file path.
   * @return {{width: number, height: number }|null} Width and height (in pixels) of the image.
   * @memberof Media
   */
  public static getDimensions(filePath: string): {width: number, height: number }|null {
    // const sizeOf = require('image-sizeaa');
    const {width, height} = imageSize(filePath);
    if (width == null || height == null)
      return null;
    return {width, height};
  }

  /**
   * Crop from image.
   *
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
    await sharp(inputPath)
      .extract({left, top, width, height})
      .toFile(outputPath);
  }

  /**
   * Resize the image.
   * If the output option is omitted, the original image is overwritten.
   *
   * @static
   * @param {string} inputPath The image file path from which to resize.
   * @param {number} width Width after resizing.
   * @param {number} height Height after resizing.
   * @param {number} output Image file path after resizing. The default is none, which will overwrite the original image.
   * @param {boolean} contain If true, resizes the image so that the entire original image is visible. If false, it is stretched to fit the height or width and cropped to fill the area. Default is false.
   * @return {Promise<void>}
   * @memberof Media
   */
  public static async resize(inputPath: string, {width, height, output, contain = false}: {width?: number, height?: number, output?: string, contain?: boolean}): Promise<void> {
    const tmp = File.getTmpPath();
    const fit = contain ? 'contain' : 'cover';
    await sharp(inputPath)
      .resize({width, height, fit})
      .toFile(tmp);
    sharp.cache(false);
    if (!output)
      output = inputPath;
    File.rename(tmp, output);
  }

  /**
   * Get the byte size of data URL.
   *
   * x = (n * (3/4)) - y
   * Where:
   * 1. x is the size of a file in bytes
   * 2. n is the length of the Base64 String
   * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {number} Byte Size.
   * @memberof Media
   */
  public static dataUrlByteSize(dataUrl: string): number {
    if (!this.isDataUrl(dataUrl))
      throw new TypeError('Content is not in data URL format');
    return this.base64ByteSize(this.dataUrlToBase64(dataUrl));
  }

  /**
   * Get base64 byte size.
   *
   * x = (n * (3/4)) - y
   * Where:
   * 1. x is the size of a file in bytes
   * 2. n is the length of the Base64 String
   * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
   *
   * @static
   * @param {string} base64 Base 64 strings.
   * @return {number} Byte Size.
   * @memberof Media
   */
  public static base64ByteSize(base64: string): number {
    // Check whether '=' character exists or not in data Url /9j/4AAQSk…=
    let noOfPaddingCharacter = 0;
    if (base64.charAt(base64.length - 2) === '=')
      noOfPaddingCharacter = 2;
    else if (base64.charAt(base64.length - 1) === '=')
      noOfPaddingCharacter = 1;
    return (base64.length * (3/4)) - noOfPaddingCharacter;
  }

  /**
   * Get Mime type from data URL.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string|null} Mime Type.
   * @memberof Media
   */
  public static getMimeTypeFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(/data:(\w+\/[\w-+\d.]+)(?=;|,)/);
    if (!matches)
      return null;
    return matches[1];
  }

  /**
   * Get extension from data URL.
   *
   * @static
   * @param {string} dataUrl Data URL.
   * @return {string|null} File extension.
   * @memberof Media
   */
  public static getExtensionFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(/data:\w+\/([\w-+\d.]+)(?=;|,)/);
    if (!matches)
      return null;
    let extension = matches[1].toLowerCase();
    if (extension === 'jpeg')
      extension = 'jpg';
    else if (extension === 'svg+xml')
      extension = 'svg';
    return extension;
  }

  /**
   * Merge images.
   *
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
      const meta = await sharp(inputPath).metadata();
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
    const imageBase = sharp({
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
}