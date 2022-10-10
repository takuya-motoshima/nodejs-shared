import File from './File';
const imageSize = require('image-size');
const sharp = require('sharp');

export default class Media {
  /**
   * Write data URL to a file.
   * If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.
   * This method returns the path to the written file.
   */
  public static writeDataUrlToFile(filePath: string, dataUrl: string, permission: number = 0o755): Media {
    if (!this.isDataUrl(dataUrl))
      throw new TypeError('Content is not in data URL format');
    const hasExtension = filePath.lastIndexOf('.') !== -1;
    if (!hasExtension) {
      const extension = this.getExtensionFromDataUrl(dataUrl);
      filePath += `.${extension}`;
    }
    File.write(filePath, this.dataUrlToBase64(dataUrl), 'base64', permission);
    return filePath;
  }

  /**
   * Convert data URL to blob data in base64 format.
   */
  public static dataUrlToBase64(dataUrl: string): string {
    return dataUrl.replace(/^data:image\/[A-Za-z]+;base64,/, '');
  }

  /**
   * Check if the string is in data URL format.
   */
  public static isDataUrl(dataUrl: string): boolean {
    return /^data:image\/[A-Za-z]+;base64,/.test(dataUrl);
  }

  /**
   * Obtain the MIME type and base64 from the data URL string.
   */
  public static statDataUrl(dataUrl: string): {blob: string, type: string}|undefined {
    const matches = dataUrl.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3)
      return undefined;
    const blob = matches[2];
    const type = matches[1];
    return {blob, type};
  }

  /**
   * Obtain the dimensions (pixels) of the image.
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
   */
  public static async crop(input: string, output: string, {left, top, width, height}: {left: number, top: number, width: number, height: number}): Promise<void> {
    if (left < 0)
      left = 0;
    if (top < 0)
      top = 0;
    await sharp(input)
      .extract({left, top, width, height})
      .toFile(output);
  }

  /**
   * Resize the image.
   */
  public static async resize(input: string, {width, height, output, contain = false}: {width?: number, height?: number, output?: string, contain?: boolean}): Promise<void> {
    const tmp = File.getTmpPath();
    const fit = contain ? 'contain' : 'cover';
    await sharp(input)
      .resize({width, height, fit})
      .toFile(tmp);
    sharp.cache(false);
    if (!output)
      output = input;
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
   */
  public static getMimeTypeFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(/data:(\w+\/[\w-+\d.]+)(?=;|,)/);
    if (!matches)
      return null;
    return matches[1];
  }

  /**
   * Get extension from data URL.
   */
  public static getExtensionFromDataUrl(dataUrl: string): string|null {
    const matches = dataUrl.match(/data:\w+\/([\w-+\d.]+)(?=;|,)/);
    if (!matches)
      return null;
    let extension = matches[1].toLowerCase();
    if (extension === 'jpeg')
      extension = 'jpg';
    return extension;
  }
}