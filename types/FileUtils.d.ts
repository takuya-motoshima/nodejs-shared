import fs from 'node:fs';
import { Buffer } from 'node:buffer';
import { GlobOptions } from 'glob';
/**
 * Options for creating a directory.
 * @interface
 */
export interface MakeDirectoryOptions {
    /**
     * The file mode for the directory.
     */
    mode?: number;
    /**
     * Ownership information for the directory.
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
 * Options for writing a file.  Extends Node.js's `fs.WriteFileOptions`.
 * @interface
 */
export interface WriteOptions extends Extract<fs.WriteFileOptions, object> {
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
 * A utility class for file system operations.
 */
export default class {
    /**
     * Gets the file name from a path.
     * @param {string} filePath The file path.
     * @param {boolean} withExtension Whether to include the file extension (default: false).
     * @return {string} The file name.
     */
    static basename(filePath: string, withExtension?: boolean): string;
    /**
     * Changes file or directory permissions.
     * @param {string} filePath The path of the file or directory.
     * @param {number} mode The new permissions (default: 0o755).
     * @throws {Error} If an error occurs during permission change.
     */
    static changePermission(filePath: string, mode?: number): void;
    /**
     * Changes the owner and/or group of a file or directory.
     * @param {string} filePath The path of the file or directory.
     * @param {string} username The new owner's username.
     * @param {string|undefined} groupName The new group's name. If undefined, the group will not be changed.
     * @throws {Error} If an error occurs during ownership change or user/group lookup.
     */
    static changeOwner(filePath: string, username: string, groupName?: string): void;
    /**
     * Copies a file or directory recursively.
     * @param {string} sourcePath The path of the source file or directory.
     * @param {string} destinationPath The path of the destination.
     * @throws {Error} If an error occurs during copying.
     */
    static copy(sourcePath: string, destinationPath: string): void;
    /**
     * Deletes a directory recursively.
     * @param {string} directoryPath The path of the directory to delete.
     * @throws {Error} If an error occurs during directory deletion.
     */
    static deleteDirectory(directoryPath: string): void;
    /**
     * Deletes a file.
     * @param {string} filePath The path of the file to delete.
     * @throws {Error} If an error occurs during file deletion.
     */
    static deleteFile(filePath: string): void;
    /**
     * Checks if a file or directory exists.
     * @param {string} filePath The path of the file or directory.
     * @return {boolean} `true` if the file or directory exists, `false` otherwise.
     */
    static exists(filePath: string): boolean;
    /**
     * Finds files matching a pattern using the `glob` npm package internally.
     * @param {string} pattern The glob pattern to match.
     * @param {GlobOptions} options Optional glob options (see `glob.GlobOptions`).
     * @return {string[]} An array of absolute paths of the matched files.
     */
    static glob(pattern: string, options?: GlobOptions): string[];
    /**
     * Gets the file extension.
     * @param {string} filePath The path of the file.
     * @return {string|undefined} The file extension, or `undefined` if there is no extension.
     */
    static getExtension(filePath: string): string | undefined;
    /**
     * Gets the file modification time in Unix time.
     * @param {string} filePath The path of the file.
     * @return {number} The last modified Unix time of the file.
     * @throws {Error} If an error occurs during stat retrieval.
     */
    static getFilemtime(filePath: string): number;
    /**
     * Gets file information.
     * @param {string} filePath The path of the file.
     * @return {fs.Stats} A `fs.Stats` object containing file information.
     * @throws {Error} If an error occurs during stat retrieval.
     */
    static getStat(filePath: string): fs.Stats;
    /**
     * Gets the path to the temporary directory.
     * Uses the `TMPDIR` environment variable if present, otherwise uses the system's temporary directory.
     * @return {string} The path to the temporary directory.
     */
    static getTmpDirectory(): string;
    /**
     * Gets a temporary file path.
     * @param {string} extension The file extension (optional).
     * @return {string} The temporary file path.
     */
    static getTmpPath(extension?: string): string;
    /**
     * Checks if a string is a base64 encoded string.
     * @param {string} str The string to check.
     * @return {boolean} `true` if the string is base64 encoded, `false` otherwise.
     */
    static isBase64(str: string): boolean;
    /**
     * Checks if a path is a directory.
     * @param {string} directoryPath The path to check.
     * @return {boolean} `true` if the path is a directory, `false` otherwise.
     * @throws {Error} If the path does not exist.
     */
    static isDirectory(directoryPath: string): boolean;
    /**
     * Checks if a path is a file.
     * @param {string} filePath The path to check.
     * @return {boolean} `true` if the path is a file, `false` otherwise.
     */
    static isFile(filePath: string): boolean;
    /**
     * Checks if a string is a valid file system path.
     * This method checks for invalid characters and empty strings after trimming whitespace.
     * It does not check if the path actually exists.
     * @param {string} str The string to check.
     * @return {boolean} `true` if the string is a valid file system path, `false` otherwise.
     */
    static isPath(str: string): boolean;
    /**
     * Makes a directory recursively.
     * @param {string} directoryPath The path of the directory to create.
     * @param {MakeDirectoryOptions} options Options for directory creation.
     * @throws {Error} If an error occurs during directory creation or changing ownership.
     */
    static makeDirectory(directoryPath: string, options?: MakeDirectoryOptions): void;
    /**
     * Creates a temporary directory. Uses the `TMPDIR` environment variable if present,
     * otherwise uses the system's temporary directory.
     * @param {MakeDirectoryOptions} options Options for directory creation.
     * @return {string} The path of the created temporary directory.
     * @throws {Error} If an error occurs during directory creation.
     */
    static makeTmpDirectory(options?: MakeDirectoryOptions): string;
    /**
     * Reads the content of a file as a base64 string.
     * @param {string} filePath The path of the file to read.
     * @return {string} The content of the file as a base64 string.
     * @throws {Error} If an error occurs during file reading.
     */
    static readAsBase64(filePath: string): string;
    /**
     * Reads the content of a media file and returns it as a data URL string.
     * @param {string} filePath The path of the media file to read.
     * @return {string} The data URL string.
     * @throws {Error} If an error occurs during file reading or data URL generation.
     */
    static readAsDataUrl(filePath: string): string;
    /**
     * Reads the content of a JSON file and parses it as an object.
     * @param {string} filePath The path of the JSON file to read.
     * @return {T} The parsed JSON object.
     * @throws {Error} If an error occurs during file reading or JSON parsing.
     * @template T
     */
    static readAsJson<T>(filePath: string): T;
    /**
     * Reads the content of a file as a string.
     * @param {string} filePath The path of the file to read.
     * @return {string} The content of the file as a string.
     * @throws {Error} If an error occurs during file reading.
     */
    static readAsString(filePath: string): string;
    /**
     * Renames a file or directory.
     * @param {string} sourcePath The original path of the file or directory.
     * @param {string} destinationPath The new path of the file or directory.
     * @throws {Error} If an error occurs during renaming.
     */
    static rename(sourcePath: string, destinationPath: string): void;
    /**
     * Writes content to a file. Creates the directory if it doesn't exist.
     * @example
     * // Example usage with a string:
     * FileUtils.write('path/to/another-file.txt', 'Hello, world!');
     *
     * // Example usage with a Buffer:
     * const buffer = Buffer.from('Hello, world!');
     * FileUtils.write('path/to/file.txt', buffer);
     * @param {string} filePath The path of the file to write to.
     * @param {string|Buffer} content The content to write to the file. Defaults to an empty string.
     * @param {WriteOptions} options Optional settings for file writing, including standard `fs.WriteFileOptions`.
     * @throws {Error} If an error occurs during file writing, directory creation, or permission/owner changes.
     */
    static write(filePath: string, content?: string | Buffer, options?: WriteOptions): void;
}
