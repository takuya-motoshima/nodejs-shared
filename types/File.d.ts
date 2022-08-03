/// <reference types="node" />
import fs from 'fs';
import glob from 'glob';
export default class File {
    /**
     * Get file name.
     */
    static basename(filePath: string, withExtension?: boolean): string;
    /**
     * Change permissions.
     */
    static chmod(filePath: string, permission?: number): File;
    /**
     * Create a temporary directory.
     * Returns the path to the temporary directory created.
     */
    static makeTmpDirectory(): string;
    /**
     * Make a directory.
     */
    static makeDirectory(dirPath: string, permission?: number): File;
    /**
     * Check if the file exists.
     */
    static existsFile(filePath: string): boolean;
    /**
     * Delete the file.
     */
    static deleteFile(filePath: string): void;
    /**
     * Delete the directory.
     */
    static deleteDirectory(dirPath: string): void;
    /**
     * Write a file
     */
    static write(filePath: string, content?: string, options?: fs.BaseEncodingOptions | string | undefined, permission?: number): File;
    /**
     * Get the contents of a file as a string.
     */
    static readAsString(filePath: string): string;
    /**
     * Obtain the contents of a JSON file as an object.
     */
    static readAsJson(filePath: string): {};
    /**
     * Obtain the contents of the media file as a DataURL string.
     */
    static readAsDataUrl(filePath: string): string;
    /**
     * Obtain the contents of a media file as a base64 string.
     */
    static readAsBase64(filePath: string): string;
    /**
     * Obtain file information.
     */
    static getStat(filePath: string): any;
    /**
     * Get file modification time in unix time.
     */
    static getFilemtime(filePath: string): number;
    /**
     * Get the file extension.
     */
    static getExtension(filePath: string): string | undefined;
    /**
     * Find files that match the file name or path pattern.
     *
     * @example
     * import {File} from 'nodejs-shared';
     *
     * File.find('**\/*.js');
     * File.find('**\/glo?.js');
     * File.find('**\/*[0-9]*.js');
     *
     * @param  {string} pattern
     * @param  {glob.IOptions} options
     * @return {string[]}
     */
    static find(pattern: string, options?: glob.IOptions): string[];
    /**
     * Returns the path to the new temporary directory. The directory is not created.
     */
    static getTmpDirectory(): string;
    /**
     * Returns the path to the new temporary file. No file is created.
     */
    static getTmpPath(ext?: string): string;
    /**
     * Check if it is a file.
     */
    static isFile(filePath: string): boolean;
    /**
     * Rename a file or directory.
     */
    static rename(from: string, to: string): void;
}
