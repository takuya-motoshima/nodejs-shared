import fs from 'node:fs';
import sharp from 'sharp';
import {imageSize as sizeOf} from 'image-size';
import gm from 'gm';
import FileUtils from '~/FileUtils';
import MediaUtils from '~/MediaUtils';

/**
 * Options for cropping an image.
 * @interface
 */
export interface CropOptions {
  /**
   * Left offset for cropping.
   */
  left: number;
  /**
   * Top offset for cropping.
   */
  top: number;
  /**
   * Width of the cropped area.
   */
  width: number;
  /**
   * Height of the cropped area.
   */
  height: number;
}

/**
 * Options for merging multiple images.
 * @interface
 */
export interface MergeImagesOptions {
  /**
   * Direction of the merged image ('vertical' or 'horizontal').
   */
  direction: 'vertical'|'horizontal';

  /**
   * Background color. Can be a string (e.g., "#ffffff", "black", "transparent") or an object with r, g, b, and alpha properties.
   * Default is {alpha: 1, b: 0, g: 0, r: 0}.
   */
  color: string|{
    r?: number;
    g?: number;
    b?: number;
    alpha?: number;
  };

  /**
   * Alignment of the images ('start', 'center', or 'end'). Default is 'start'.
   */
  align: 'start'|'center'|'end'|'start';

  /**
   * Offset in pixels between each image. Default is 0.
   */
  offset: number;

  /**
   * Margin of the result image. Can be a number, a string (CSS shorthand), or an object with top, right, bottom, and left properties.
   */
  margin: number|string|Dimensions;
}

/**
 * Options for resizing an image.
 * @interface
 */
export interface ResizeOptions {
  /**
   * Desired width.
   */
  width?: number;
  /**
   * Desired height.
   */
  height?: number;
  /**
   * Output path for the resized image. If not provided, the original file will be overwritten.
   */
  output?: string;
  /**
   * Resize to fit within the specified dimensions, maintaining aspect ratio. If both width and height are provided, the smaller dimension is used as the limit. 
   */
  contain?: boolean;
}

/**
 * Represents image data including pixel buffer, dimensions, and offset/position.
 * @interface
 */
export interface ImageData {
  /**
   * The pixel data buffer.
   */
  buffer: Buffer;

  /**
   * The height of the image.
   */
  height: number;

  /**
   * The horizontal offset of the image data within a larger context.
   */
  offsetX: number;

  /**
   * The vertical offset of the image data within a larger context.
   */
  offsetY: number;

  /**
   * The width of the image.
   */
  width: number;

  /**
   * The x-coordinate of the image's position.
   */
  x: number;

  /**
   * The y-coordinate of the image's position.
   */
  y: number;
}

/**
 * Represents dimensions with top, right, bottom, and left values.  Useful for padding, margins, etc.
 * @interface
 */
export interface Dimensions {
  /**
   * The top dimension.
   */
  top: number;
  /**
   * The right dimension.
   */
  right: number;
  /**
   * The bottom dimension.
   */
  bottom: number;
  /**
   * The left dimension.
   */
  left: number;
}

/**
 * Options for converting image formats.
 * @interface
 */
export interface ConvertImageFormatOptions {
  /**
   * The version of the BMP format to use. One of "bmp2", "bmp3", or "bmp4".
   */
  bmpVersion?: 'bmp2'|'bmp3'|'bmp4';
  /**
   * If `true`, uses true color for BMP conversion.
   */
  trueColor?: boolean;
  /**
   * Margin around the image (in pixels).
   */
  margin?: number;
  /**
   * Background color (e.g., "#ffffff", "black", "transparent").
   */
  background?: string;
}

/**
 * Extends the GraphicsMagick ImageInfo interface with optional scene information.
 * @interface
 */
export interface ImageMagickInfo extends gm.ImageInfo {
  /**
   * An optional array of strings representing scene information.
   */
  Scene?: string[];
}

/**
 * Provides utility functions for image manipulation.
 * @hideconstructor
 */
export default class {
  /**
   * ImageMagick instance.
   * @private
   */
  private static imageMagick: gm.SubClass = gm.subClass({imageMagick: true});

  /**
   * Crops an image using Sharp.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * ImageUtils.cropImage('path/to/image.jpg', 'path/to/image2.jpg', {left: 100, top: 100, width: 200, height: 200});
   * @param {string} inputPath Path to the input image file.
   * @param {string} outputPath Path to save the cropped image.
   * @param {CropOptions} options Cropping options.
   * @return {Promise<void>}
   */
  public static async cropImage(inputPath: string, outputPath: string, options: CropOptions): Promise<void> {
    const {left, top, width, height} = options;
    const safeLeft = Math.max(0, left);
    const safeTop = Math.max(0, top);
    await sharp(inputPath)
      .extract({left: safeLeft, top: safeTop, width, height})
      .toFile(outputPath);
  }

  /**
   * Merges multiple images into a single image using Sharp.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * await ImageUtils.mergeImages(
   *   ['path/to/image1.jpg', 'path/to/image1.jpg'],
   *   'path/to/image3.jpg',
   *   {direction: 'vertical', offset: 30}
   * );
   * @param {string[]} inputPaths An array of paths to the input image files.
   * @param {string} outputPath The path to save the merged image.
   * @param {Partial<MergeImagesOptions>} options Optional settings for merging images.
   * @return {Promise<void>}
   * @throws {TypeError} If inputPaths is not an array or if it's empty.
   */
  public static async mergeImages(inputPaths: string[], outputPath: string, options: Partial<MergeImagesOptions> = {}): Promise<void> {
    if (!Array.isArray(inputPaths) || inputPaths.length < 1)
      throw new TypeError('`inputPaths` must be a non-empty array');
    const {
      direction = 'vertical',
      color = {alpha: 1, b: 0, g: 0, r: 0},
      align = 'start',
      offset = 0,
      margin = 0,
    } = options;
    const calculateAlignmentOffset = (totalSize: number, imageSize: number, alignment: 'start'|'center'|'end'): number => {
      if (alignment === 'center')
        return (totalSize - imageSize) / 2;
      if (alignment === 'end')
        return totalSize - imageSize;
      return 0;
    };
    const parseMargin = (margin: number|string|Dimensions): Dimensions => {
      if (typeof margin === 'number')
        return {top: margin, right: margin, bottom: margin, left: margin};
      if (typeof margin === 'string') {
        const [top, right = top, bottom = top, left = right] = margin.split(' ');
        return {
          top: parseInt(top, 10),
          right: parseInt(right, 10),
          bottom: parseInt(bottom, 10),
          left: parseInt(left, 10),
        };
      }

      // Use spread syntax and nullish coalescing operator to preserve existing values and provide defaults.
      return {
        ...margin,
        top: margin.top ?? 0,
        right: margin.right ?? 0,
        bottom: margin.bottom ?? 0,
        left: margin.left ?? 0,
      };
    };
    const imageDataList = await Promise.all(
      inputPaths.map(async (inputPath: string): Promise<ImageData> => {
        const meta = await sharp(inputPath).metadata();
        if (!meta.width || !meta.height)
          throw new Error(`Invalid image meta for ${inputPath}`)
        return {
          buffer: fs.readFileSync(inputPath),
          width: meta.width,
          height: meta.height,
          x: 0,
          y: 0,
          offsetX: 0,
          offsetY: 0,
        };
      })
    );

    let totalX = 0;
    let totalY = 0;
    const positionedImageList = imageDataList.reduce((acc: ImageData[], data) => {
      const {width, height, offsetX, offsetY} = data;
      acc.push({...data, x: totalX + offsetX, y: totalY + offsetY});
      totalX += width + offsetX;
      totalY += height + offsetY;
      return acc;
    }, []);
    const {top, right, bottom, left} = parseMargin(margin);
    const marginVertical = top + bottom;
    const marginHorizontal = left + right;
    const isVertical = direction === 'vertical';
    const totalWidth = isVertical
      ? Math.max(...positionedImageList.map(({width, offsetX}) => width + offsetX))
      : positionedImageList.reduce((total, {width, offsetX}, index) => total + width + offsetX + (index > 0 ? offset : 0), 0);
    const totalHeight = isVertical
      ? positionedImageList.reduce((total, {height, offsetY}, index) => total + height + offsetY + (index > 0 ? offset : 0), 0)
      : Math.max(...positionedImageList.map(({height, offsetY}) => height + offsetY));
    const imageBase = sharp({
      create: {
        background: color,
        channels: 4,
        width: totalWidth + marginHorizontal,
        height: totalHeight + marginVertical,
      },
    });
    const compositeData = positionedImageList.map((imageData, index) => {
      const {buffer, x, y, offsetX, offsetY, width, height} = imageData;
      const px = isVertical
        ? calculateAlignmentOffset(totalWidth, width, align) + offsetX
        : x + index * offset;
      const py = isVertical
        ? y + index * offset
        : calculateAlignmentOffset(totalHeight, height, align) + offsetY;
      return {
        input: buffer,
        left: Math.floor(px + left),
        top: Math.floor(py + top),
      };
    });
    imageBase.composite(compositeData);
    await imageBase.toFile(outputPath);
  }

  /**
   * Resizes an image using Sharp.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * // Overwrites the original file with the resized image.
   * ImageUtils.resizeImage('path/to/image.jpg', {width: 200});
   * 
   * // Write the resized image in another file.
   * ImageUtils.resizeImage('path/to/image.jpg', {
   *   output: 'path/to/image2.jpg',
   *   width: 200,
   * });
   * @param {string} inputPath Path to the input image file.
   * @param {ResizeOptions} options Resizing options.
   * @return {Promise<void>}
   */
  public static async resizeImage(inputPath: string, options: ResizeOptions = {}): Promise<void> {
    const {width, height, output, contain = false} = options;
    const fit = contain ? 'contain' : 'cover';
    const buffer = await sharp(inputPath).resize({width, height, fit}).toBuffer();
    const outputFilePath = output || inputPath;
    await sharp(buffer).toFile(outputFilePath);
    sharp.cache(false); // Clear Sharp's cache to prevent issues with subsequent operations
  }

  /**
   * Gets the number of frames in a GIF image using ImageMagick.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * await ImageUtils.getGifFrameCount('path/to/image.gif');
   * @param {string} imageInput Path or data URL of the GIF image.
   * @return {Promise<number|null>}  Number of frames, or null if not a GIF or an error occurred.
   * @throws {Error} If input is a file path and the file is not found.
   */
  public static async getGifFrameCount(imageInput: string): Promise<number|null> {
    const isInputPath = FileUtils.isPath(imageInput);
    if (isInputPath && !FileUtils.exists(imageInput))
      throw new Error(`Input file ${imageInput} not found`);
    return new Promise<number|null>((resolve, reject) => {
      let inputFilePath = imageInput;
      if (!isInputPath) {
        const dataUrlParts = MediaUtils.parseDataUrl(imageInput);
        inputFilePath = FileUtils.getTmpPath(dataUrlParts?.extension || 'tmp');
        MediaUtils.writeDataUrl(inputFilePath, imageInput);
      }
      this.imageMagick(inputFilePath).identify((err: Error|null, data: ImageMagickInfo) => {
        if (err)
          return reject(err);
        const format = (data.format || '').toLowerCase(); // handle cases where data.format is null or undefined
        if (format === 'gif' && Array.isArray(data?.Scene))
          resolve(data.Scene.length);
        else
          resolve(1); // Non-GIFs or GIFs with no Scene data are considered to have 1 frame
      });
    });
  }

  /**
   * Extracts and saves the first frame of an animated GIF using ImageMagick.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * // Overwrite the first frame with the original file.
   * await ImageUtils.extractFirstGifFrame('path/to/image.gif');
   * 
   * // Write the first frame in a separate file.
   * await ImageUtils.extractFirstGifFrame('path/to/image.gif', 'path/to/image2.gif');
   * @param {string} imageInput Path or data URL of the animated GIF.
   * @param {string} outputPath Output path for the first frame. If not provided, the original file will be overwritten if it is a path; if it's a data URL, outputPath is required.
   * @return {Promise<void>}
   * @throws {Error} If the input file is not found, input is a data URL and no output path is specified, or an error occurs during processing.
   */
  public static async extractFirstGifFrame(imageInput: string, outputPath?: string): Promise<void> {
    const isInputPath = FileUtils.isPath(imageInput);
    if (isInputPath && !FileUtils.exists(imageInput))
      throw new Error(`Input file ${imageInput} not found`);
    else if (!isInputPath && !outputPath)
      throw new Error('If the input is a data URL, an output path is required');
    return new Promise<void>((resolve, reject) => {
      const finalOutputPath = outputPath || imageInput;
      let inputFilePath = imageInput;
      if (!isInputPath) {
        const dataUrlParts = MediaUtils.parseDataUrl(imageInput);
        inputFilePath = FileUtils.getTmpPath(dataUrlParts?.extension || 'tmp');
        MediaUtils.writeDataUrl(inputFilePath, imageInput);
      }
      this.imageMagick(`${inputFilePath}[0]`).write(finalOutputPath, (err: Error|null) => {
        if (err)
          return reject(err);
        resolve();
      });
    });
  }

  /**
   * Gets image dimensions using the `image-size` npm package.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * ImageUtils.getImageDimensions('path/to/image.jpg');// {width: 960, height: 640}
   * @param {string} filePath Path to the image file.
   * @return {{width: number, height: number}|null} Image dimensions, or `null` if an error occurs or the image is invalid.
   */
  public static getImageDimensions(filePath: string): {width: number; height: number}|null {
    try {
      const {width, height} = sizeOf(filePath);
      return width && height ? {width, height} : null;
    } catch (error) {
      return null; // Handle errors gracefully, e.g. log the error
    }
  }

  /**
   * Converts between image formats using ImageMagick.
   * @example
   * import {ImageUtils} from 'nodejs-shared';
   * 
   * // Convert jpg to png and write in file.
   * await ImageUtils.convertImageFormat('path/to/image.jpg', 'path/to/image.png');
   * @param {string} imageInput Path or data URL of the input image.
   * @param {string} outputPath Optional output path for the converted image. If not provided, a temporary file is used.
   * @param {ConvertImageFormatOptions} options Conversion options.
   * @return {Promise<string>} Data URL of the converted image.
   * @throws {Error} If the input file is not found or an error occurs during conversion.
   */
  public static async convertImageFormat(imageInput: string, outputPath?: string, options: ConvertImageFormatOptions = {}): Promise<string> {
    const {bmpVersion = 'bmp3', trueColor = true, margin, background = 'white'} = options;
    const isInputPath = FileUtils.isPath(imageInput);
    if (isInputPath && !FileUtils.exists(imageInput))
      throw new Error(`Input file ${imageInput} not found`);
    return new Promise<string>((resolve, reject) => {
      let inputFilePath = imageInput;
      if (!isInputPath) {
        const dataUrlParts = MediaUtils.parseDataUrl(imageInput);
        inputFilePath = FileUtils.getTmpPath(dataUrlParts?.extension || 'tmp');
        MediaUtils.writeDataUrl(inputFilePath, imageInput);
      }
      const inputExt = (FileUtils.getExtension(inputFilePath) || '').toLowerCase();
      const firstFramePath = inputExt === 'gif' ? `${inputFilePath}[0]` : inputFilePath;
      const tmpOutputPath = outputPath || FileUtils.getTmpPath(inputExt);
      const outputExt = (FileUtils.getExtension(tmpOutputPath) || '').toLowerCase();
      const bmpVersionPrefix = outputExt === 'bmp' ? `${bmpVersion}:` : '';
      const image = this.imageMagick(firstFramePath);
      if (outputExt === 'bmp' && trueColor)
        image.type('TrueColor');
      if (margin) {
        image.border(margin, margin);
        image.borderColor(background);
      }
      image.write(`${bmpVersionPrefix}${tmpOutputPath}`, (err: Error|null) => {
        if (err)
          return reject(err);
        resolve(FileUtils.readAsDataUrl(tmpOutputPath));
      });
    });
  }
}