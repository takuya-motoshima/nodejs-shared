/// <reference types="node" />
import fs from 'fs';
import glob from 'glob';
export default class File {
    /**
     * Get the file name from the path.
     * @static
     * @param {string} filePath File Path.
     * @param {boolean} withExtension True if you want to include the extension, false if you don't. Default is false.
     * @return {string} File Name.
     * @memberof File
     */
    static basename(filePath: string, withExtension?: boolean): string;
    /**
     * Change permissions.
     * @static
     * @param {string} path File or directory path.
     * @param {number} permission Permissions. Default is 0o755.
     * @return {File}
     * @memberof File
     */
    static chmod(path: string, permission?: number): File;
    /**
     * Create a temporary directory.
     * @static
     * @return {string}
     * @memberof File
     */
    static makeTmpDirectory(): string;
    /**
     * Make a directory.
     * @static
     * @param {string} dirPath Directory path.
     * @param {number} permission Directory permissions. Default is 0o755.
     * @return {File}
     * @memberof File
     */
    static makeDirectory(dirPath: string, permission?: number): File;
    /**
     * Check if the file or directory exists.
     * @static
     * @param {string} path File or directory path.
     * @return {boolean} True if the file or directory exists.
     * @memberof File
     */
    static existsFile(path: string): boolean;
    /**
     * Delete the file.
     * @static
     * @param {string} filePath File Path.
     * @memberof File
     */
    static deleteFile(filePath: string): void;
    /**
     * Delete the directory.
     * @static
     * @param {string} dirPath Directory path.
     * @memberof File
     */
    static deleteDirectory(dirPath: string): void;
    /**
     * Write a file
     * @static
     * @param {string} filePath File Path.
     * @param {string} content The contents of the file. Default is an empty string.
     * @param {fs.WriteFileOptions|string|undefined} options Writing options. Default is undefined.
     * @param {number} permission File permissions. Default is 0o755.
     * @return {File}
     * @memberof File
     */
    static write(filePath: string, content?: string, options?: fs.WriteFileOptions | string | undefined, permission?: number): File;
    /**
     * Get the contents of a file as a string.
     * @static
     * @param {string} filePath File Path.
     * @return {string} The contents of the file.
     * @memberof File
     */
    static readAsString(filePath: string): string;
    /**
     * Get the contents of a JSON file as an object.
     * @static
     * @param {string} filePath File Path.
     * @return {object} An object generated from JSON.
     * @memberof File
     */
    static readAsJson(filePath: string): {};
    /**
     * Get the contents of the media file as a data URL string.
     * @static
     * @param {string} filePath File Path.
     * @return {string} Data URL.
     * @memberof File
     */
    static readAsDataUrl(filePath: string): string;
    /**
     * Get the contents of a media file as a base64 string.
     * @static
     * @param {string} filePath File Path.
     * @return {string} Base 64 strings.
     * @memberof File
     */
    static readAsBase64(filePath: string): string;
    /**
     * Get file information.
     * @static
     * @param {string} filePath File Path.
     * @return {object} File information object.
     * @memberof File
     */
    static getStat(filePath: string): any;
    /**
     * Get file modification time in unix time.
     * @static
     * @param {string} filePath File Path.
     * @return {number} Last modified unix time of the file.
     * @memberof File
     */
    static getFilemtime(filePath: string): number;
    /**
     * Get the file extension.
     * @static
     * @param {string} filePath File Path.
     * @return {string|undefined} File extension.
     * @memberof File
     */
    static getExtension(filePath: string): string | undefined;
    /**
     * Find files that match the file name or path pattern.
     * @static
     * @param {string} pattern File pattern to find.
     * @param {glob.IOptions} options Options to find. Default is undefined
     * @return {string[]} Absolute path list of files found.
     * @memberof File
     * @example
     * File.find('**\/*.js');
     * File.find('**\/glo?.js');
     * File.find('**\/*[0-9]*.js');
     */
    static find(pattern: string, options?: glob.IOptions): string[];
    /**
     * Returns the path to the new temporary directory.
     * The directory is not created.
     * @static
     * @return {string} Temporary directory path.
     * @memberof File
     */
    static getTmpDirectory(): string;
    /**
     * Returns the path to the new temporary file.
     * No file is created.
     * @static
     * @param {string} extension Extension to be given to temporary files. Default is none.
     * @return {string} Temporary file path.
     * @memberof File
     */
    static getTmpPath(extension?: string): string;
    /**
     * Check if it is a file.
     * @static
     * @param {string} filePath File Path.
     * @return {boolean} True if the file is a file.
     * @memberof File
     */
    static isFile(filePath: string): boolean;
    /**
     * Rename a file or directory.
     * @static
     * @param {string} srcPath Original file path.
     * @param {string} dstPath The destination file path.
     * @memberof File
     */
    static rename(srcPath: string, dstPath: string): void;
    /**
     * Check if it is a base64 string.
     * @static
     * @param {string} str String.
     * @return {boolean} True if base64.
     * @memberof File
     */
    static isBase64(str: string): boolean;
    /**
     * Check if the path is a directory.
     * @static
     * @param {string} inputPath The path of a file or directory.
     * @return {boolean} True if the input path is a directory, false otherwise.
     * @memberof File
     */
    static isDirectory(inputPath: string): boolean;
    /**
     * Copy a file or directory. The directory can have contents.
     * @static
     * @param {string} srcDir The directory from which the copy was made.
     * @param {string} dstDir The destination directory.
     * @memberof File
     */
    static copyDirectory(srcDir: string, dstDir: string): void;
    /**
     * Check if it is valid as a file system path.
     * @static
     * @param {string} str String.
     * @return {boolean} True if valid as a file system path, false otherwise.
     * @memberof File
     */
    static isPath(str: string): boolean;
}
