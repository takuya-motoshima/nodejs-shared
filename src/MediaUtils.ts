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
export interface WriteDataUrlOptions {
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
   * Writes a data URL to a file. If the output path doesn't have an extension, the extension from the data URL will be used.
   * @example
   * import {MediaUtils} from 'nodejs-shared';
   * 
   * // Write a JPEG image to a file using a data URL.
   * MediaUtils.writeDataUrl('path/to/image.jpg', 'data:image/jpeg;base64,AA==...');
   * 
   * // Write a JPEG image to a file, specifying file mode, owner, and group.
   * // mode: 0o644 (read/write for owner, read-only for group and others)
   * // owner: Sets the file owner to the 'nginx' user and group.
   * MediaUtils.writeDataUrl('path/to/image.jpg', 'data:image/jpeg;base64,AA==...', {
   *   mode: 0o644,
   *   owner: {username: 'nginx', groupName: 'nginx'},
   * });
   * @param {string} outputPath The path to the output file.
   * @param {string} dataUrl The data URL to write.
   * @param {WriteDataUrlOptions} options File write options.
   * @throws {TypeError} If the content is not a data URL.
   * @throws {Error} If base64 data cannot be extracted from the data URL or file writing fails.
   */
  public static writeDataUrl(outputPath: string, dataUrl: string, options: WriteDataUrlOptions = {mode: 0o755}) {
    if (!this.isDataUrl(dataUrl))
      throw new TypeError('Content is not in data URL format');
    const dataUrlParts = this.parseDataUrl(dataUrl);
    if (!dataUrlParts)
      throw new Error('Could not parse data URL');
    if (dataUrlParts.mimeType === 'image/svg+xml') {
      const content = FileUtils.isBase64(dataUrlParts.base64) ? Buffer.from(dataUrlParts.base64, 'base64').toString() : decodeURIComponent(dataUrlParts.base64);
      FileUtils.write(outputPath, content, options);
    } else {
      const buffer = Buffer.from(dataUrlParts.base64, 'base64');
      FileUtils.write(outputPath, buffer, options);
    }
  }
}