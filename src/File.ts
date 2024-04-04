import fs from 'fs';
import path from 'path';
import os from 'os';
import uniqid from 'uniqid';
import moment from "moment";
import glob from 'glob';
import mimeTypes from 'mime-types';
const fse = require('fs-extra');

export default class File {
  /**
   * Get the file name from the path.
   * @static
   * @param {string} filePath File Path.
   * @param {boolean} withExtension True if you want to include the extension, false if you don't. Default is false.
   * @return {string} File Name.
   * @memberof File
   */
  public static basename(filePath: string, withExtension: boolean = false): string {
    return path.basename(filePath, withExtension ? undefined : path.extname(filePath));
  }

  /**
   * Change permissions.
   * @static
   * @param {string} path File or directory path.
   * @param {number} permission Permissions. Default is 0o755.
   * @return {File}
   * @memberof File
   */
  public static chmod(path: string, permission: number = 0o755): File {
    fs.chmodSync(path, permission);
    return this;
  }

  /**
   * Create a temporary directory.
   * @static
   * @return {string} 
   * @memberof File
   */
  public static makeTmpDirectory(): string {
    const tmp = `${this.getTmpDirectory()}/${uniqid()}/`;
    this.makeDirectory(tmp);
    return tmp;
  }

  /**
   * Make a directory.
   * @static
   * @param {string} dirPath Directory path.
   * @param {number} permission Directory permissions. Default is 0o755.
   * @return {File}
   * @memberof File
   */
  public static makeDirectory(dirPath: string, permission: number = 0o755): File {
    if (this.existsFile(dirPath))
      return this;
    fse.mkdirsSync(dirPath);
    this.chmod(dirPath, permission);
    return this;
  }

  /**
   * Check if the file or directory exists.
   * @static
   * @param {string} path File or directory path.
   * @return {boolean} True if the file or directory exists.
   * @memberof File
   */
  public static existsFile(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete the file.
   * @static
   * @param {string} filePath File Path.
   * @memberof File
   */
  public static deleteFile(filePath: string): void {
    if (!this.existsFile(filePath))
      return;
    fs.unlinkSync(filePath);
  }

  /**
   * Delete the directory.
   * @static
   * @param {string} dirPath Directory path.
   * @memberof File
   */
  public static deleteDirectory(dirPath: string): void {
    fse.removeSync(dirPath);
  }

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
  public static write(
    filePath: string,
    content: string = '',
    options: fs.WriteFileOptions|string|undefined = undefined,
    permission: number = 0o755
  ): File {
    // Delete files in the same path.
    this.deleteFile(filePath);

    // If the directory does not exist, create it.
    this.makeDirectory(path.dirname(filePath));

    // Write file.
    if (options)
      fs.writeFileSync(filePath, content, options as fs.WriteFileOptions);
    else
      fs.writeFileSync(filePath, content);

    // Change permissions.
    this.chmod(filePath, permission);
    return this;
  }

  /**
   * Get the contents of a file as a string.
   * @static
   * @param {string} filePath File Path.
   * @return {string} The contents of the file.
   * @memberof File
   */
  public static readAsString(filePath: string): string {
    return fs.readFileSync(filePath).toString();
  }

  /**
   * Get the contents of a JSON file as an object.
   * @static
   * @param {string} filePath File Path.
   * @return {object} An object generated from JSON.
   * @memberof File
   */
  public static readAsJson(filePath: string): {} {
    return JSON.parse(this.readAsString(filePath));
  }

  /**
   * Get the contents of the media file as a data URL string.
   * @static
   * @param {string} filePath File Path.
   * @return {string} Data URL.
   * @memberof File
   */
  public static readAsDataUrl(filePath: string): string {
    const content =  fs.readFileSync(filePath);
    const b64 = Buffer.from(content).toString('base64');
    const mimeType = mimeTypes.lookup(filePath);
    if (mimeType === 'image/svg+xml') {
      const encoded = encodeURIComponent(content.toString());
      return `data:${mimeType};utf8,${encoded}`;
    } else
      return `data:${mimeType};base64,${b64}`;
  }

  /**
   * Get the contents of a media file as a base64 string.
   * @static
   * @param {string} filePath File Path.
   * @return {string} Base 64 strings.
   * @memberof File
   */
  public static readAsBase64(filePath: string): string {
    return fs.readFileSync(filePath, {encoding: 'base64'});
  }

  /**
   * Get file information.
   * @static
   * @param {string} filePath File Path.
   * @return {object} File information object.
   * @memberof File
   */
  public static getStat(filePath: string): any {
    return fs.statSync(filePath);
  }

  /**
   * Get file modification time in unix time.
   * @static
   * @param {string} filePath File Path.
   * @return {number} Last modified unix time of the file.
   * @memberof File
   */
  public static getFilemtime(filePath: string): number {
    return moment(this.getStat(filePath).mtime).unix();
  }

  /**
   * Get the file extension.
   * @static
   * @param {string} filePath File Path.
   * @return {string|undefined} File extension.
   * @memberof File
   */
  public static getExtension(filePath: string): string|undefined {
    const extension = path.extname(filePath);
    return extension ? extension.split('.').pop() : undefined;
  }

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
  public static find(pattern: string, options: glob.IOptions = {}) {
    return glob.sync(pattern, {nodir: false, ...options});
  }

  /**
   * Returns the path to the new temporary directory.
   * The directory is not created.
   * @static
   * @return {string} Temporary directory path.
   * @memberof File
   */
  public static getTmpDirectory(): string {
    return os.tmpdir();
  }

  /**
   * Returns the path to the new temporary file.
   * No file is created.
   * @static
   * @param {string} extension Extension to be given to temporary files. Default is none.
   * @return {string} Temporary file path.
   * @memberof File
   */
  public static getTmpPath(extension?: string): string {
    let filePath = `${this.getTmpDirectory()}/${uniqid()}`;
    if (extension)
      filePath += `.${extension}`;
    return filePath;
  }

  /**
   * Check if it is a file.
   * @static
   * @param {string} filePath File Path.
   * @return {boolean} True if the file is a file.
   * @memberof File
   */
  public static isFile(filePath: string): boolean {
    try {
      const stats = fs.statSync(filePath);
      return stats.isFile();
    } catch {
      return false;
    }
  }

  /**
   * Rename a file or directory.
   * @static
   * @param {string} srcPath Original file path.
   * @param {string} dstPath The destination file path.
   * @memberof File
   */
  public static rename(srcPath: string, dstPath: string): void {
    fs.renameSync(srcPath, dstPath);
  }

  /**
   * Check if it is a base64 string.
   * @static
   * @param {string} str String.
   * @return {boolean} True if base64.
   * @memberof File
   */
  public static isBase64(str: string): boolean {
    return Buffer.from(str, 'base64').toString('base64') === str;
  }

  /**
   * Check if the path is a directory.
   * @static
   * @param {string} inputPath The path of a file or directory.
   * @return {boolean} True if the input path is a directory, false otherwise.
   * @memberof File
   */
  public static isDirectory(inputPath: string): boolean {
    if (!this.existsFile(inputPath))
      throw new Error(`Input path ${inputPath} not found`);
    return this.getStat(inputPath).isDirectory();
  }

  /**
   * Copy a file or directory. The directory can have contents.
   * @static
   * @param {string} srcDir The directory from which the copy was made.
   * @param {string} dstDir The destination directory.
   * @memberof File
   */
  public static copyDirectory(srcDir: string, dstDir: string): void {
    if (!this.isDirectory(srcDir))
      throw new Error(`The ${srcDir} of the source path is not a directory`);
    fse.copySync(srcDir, dstDir);
  }

  /**
   * Check if it is valid as a file system path.
   * @static
   * @param {string} str String.
   * @return {boolean} True if valid as a file system path, false otherwise.
   * @memberof File
   */
  public static isPath(str: string): boolean {
    if (typeof str !== 'string' || str.replace(/^[\s　]+|[\s　]+$/g, '') === '')
      return false;
    const rootPath = path.parse(str).root;
    if (rootPath)
      str = str.slice(rootPath.length);
    return !/[<>:"|?*]/.test(str);
  }
}