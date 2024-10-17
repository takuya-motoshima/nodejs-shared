/**
 * Represents the parsed components of a data URL.
 */
interface DataUrlParts {
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
    extension: string | null;
    /**
     * The size of the base64 encoded data in bytes.
     */
    bytesize: number;
}
/**
 * Options for writing a data URL to a file.
 */
interface WriteDataUrlOptions {
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
 */
export default class {
    /**
     * Checks if a string is a data URL.
     * @param {string} dataUrl The string to check.
     * @return {boolean} True if the string is a data URL, false otherwise.
     */
    static isDataUrl(dataUrl: string): boolean;
    /**
     * Parses a data URL and extracts its components (MIME type, base64 data, file extension, and byte size).
     * Normalizes "jpeg" extension to "jpg".
     * @param {string} dataUrl The data URL to parse.
     * @return {DataUrlParts|null} An object containing the parsed `type`, `base64` data, `extension`, and `bytesize`, or `null` if the input is not a valid data URL.
     */
    static parseDataUrl(dataUrl: string): DataUrlParts | null;
    /**
    * Writes a data URL to a file. If the output path doesn't have an extension, the extension from the data URL will be used.
    * @param {string} outputPath The path to the output file.
    * @param {string} dataUrl The data URL to write.
    * @param {number} [permissions=0o755] File permissions. Default is 0o755.
    * @throws {TypeError} If the content is not a data URL.
    * @throws {Error} If base64 data cannot be extracted from the data URL or file writing fails.
    */
    static writeDataUrl(outputPath: string, dataUrl: string, options?: WriteDataUrlOptions): void;
}
export {};
