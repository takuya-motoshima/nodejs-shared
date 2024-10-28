import {Buffer} from 'node:buffer';
import mime from 'mime';
import FileUtils from '~/FileUtils';

const dataUrlRegex = /^data:([^;]+);base64,(.*)$/;

/**
 * Represents the parsed components of a data URL.
 * @interface
 */
export interface DataUrlParts {
  /**
   * The MIME type of the data URL. e.g., "image/png".
   */
  mimeType: string;
  /**
   * The base64 encoded data portion of the URL.
   */
  base64: string;
  /**
   * The file extension extracted from the MIME type. e.g., "png". Can be `null` if no extension is found.
   */
  extension: string|null;
  /**
   * The size of the base64 encoded data in bytes.
   */
  bytesize: number;
}

/**
 * Options for writing a data URL to a file.
 * @interface
 */
export interface WriteImageOptions {
  /**
   * The file mode (permissions). Default is `0o755`.
   */
  mode?: number;
  /**
   * Ownership information for the file.
   */
  owner?: {
    /**
     * The username of the owner.
     */
    username?: string;
    /**
     * The group name of the owner.
     */
    groupName?: string;
  };
}

/**
 * Utility class for media manipulation, including image processing and data URL handling.
 * @hideconstructor
 */
export default class {
  /**
   * Checks if a string is a data URL.
   * @example
   * import {MediaUtils} from 'nodejs-shared';
   * 
   * if (MediaUtils.isDataUrl('data:image/jpeg;base64,AA==...'))
   *   ;
   * @param {string} dataUrl The string to check.
   * @return {boolean} True if the string is a data URL, false otherwise.
   */
  public static isDataUrl(dataUrl: string): boolean {
    return dataUrlRegex.test(dataUrl);
  }

  /**
   * Parses a data URL and extracts its components (MIME type, base64 data, file extension, and byte size).
   * Normalizes "jpeg" extension to "jpg".
   * @example
   * import {MediaUtils} from 'nodejs-shared';
   * 
   * // Parse a data URL to extract its MIME type, base64 encoded data, file extension, and size.
   * const dataUrlParts = MediaUtils.parseDataUrl('data:image/jpeg;base64,AA==...'); 
   * console.log(dataUrlParts);
   * // {
   * //   mimeType: 'image/jpeg',
   * //   base64: '/9j/4AAQSk...',
   * //   extension: 'jpg',
   * //   bytesize: 45056
   * // }
   * @param {string} dataUrl The data URL to parse.
   * @return {DataUrlParts|null} An object containing the parsed `type`, `base64` data, `extension`, and `bytesize`, or `null` if the input is not a valid data URL.
   */
   public static parseDataUrl(dataUrl: string): DataUrlParts|null {
    const matches = dataUrl.match(dataUrlRegex);
    if (!matches)
      return null;

    const mimeType = matches[1];
    const base64 = matches[2];

    // Calculate the byte size of the base64 encoded string.
    const paddingChars = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;  // Simplified padding calculation.
    const bytesize = (base64.length * (3 / 4)) - paddingChars;

    let extension = mime.getExtension(mimeType);

    // Normalize "jpeg" to "jpg"
    if (extension === 'jpeg')
      extension = 'jpg';
    return {mimeType, base64, extension, bytesize};
  }

  /**
   * Writes image data to a file.
   * @example
   * import {MediaUtils} from 'nodejs-shared';
   * 
   * // Write a JPEG image using a data URL.
   * MediaUtils.writeImage('path/to/image.jpg', 'data:image/jpeg;base64,AA==...');
   * 
   * // Write a PNG image using a Buffer.
   * MediaUtils.writeImage('path/to/image.png', Buffer.from([...]));
   * 
   * // Write an SVG image using a string.
   * writeImage('path/to/image.svg', '<svg>...</svg>');
   * 
   * // Write with file system options.
   * MediaUtils.writeImage('path/to/image.png', Buffer.from([...]), {mode: 0o644, owner: {username: 'nginx', groupName: 'nginx'}});
   * @param {string} outputPath The path to the output file. The file extension must be provided.
   * @param {string|Buffer} data The image data as a data URL, Buffer, or SVG string.
   * @param {WriteImageOptions} options File write options.
   * @throws {TypeError} If data is not a string or Buffer, or if the data URL is invalid.
   * @throws {Error} If the file writing operation fails.
   */
  public static writeImage(outputPath: string, data: string|Buffer, options: WriteImageOptions = {mode: 0o755}) {
    let dataToWrite: string|Buffer;
    if (typeof data === 'string') {
      const dataUrlParts = this.parseDataUrl(data);
      if (dataUrlParts) { // It's a data URL
        dataToWrite = dataUrlParts.mimeType === 'image/svg+xml' 
          ? (FileUtils.isBase64(dataUrlParts.base64) ? Buffer.from(dataUrlParts.base64, 'base64') : decodeURIComponent(dataUrlParts.base64))
          : Buffer.from(dataUrlParts.base64, 'base64');
      } else if (outputPath.endsWith('.svg')) // Handle svg string directly
        dataToWrite = data; // Assume it is a raw SVG string if not a dataURL and has .svg extension
      else
        throw new TypeError('Data is not a valid data URL, Buffer, or SVG string.');
    } else if (data instanceof Buffer)
      dataToWrite = data;
    else
      throw new TypeError('Data must be a string (data URL or SVG string) or a Buffer.');
    FileUtils.write(outputPath, dataToWrite, options);
  }
}