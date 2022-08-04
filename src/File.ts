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
   * Get file name.
   */
  public static basename(filePath: string, withExtension: boolean = false): string {
    return path.basename(filePath, withExtension ? undefined : path.extname(filePath));
  }

  /**
   * Change permissions.
   */
  public static chmod(filePath: string, permission: number = 0o755): File {
    fs.chmodSync(filePath, permission);
    return this;
  }

  /**
   * Create a temporary directory.
   * Returns the path to the temporary directory created.
   */
  public static makeTmpDirectory(): string {
    const tmp = `${this.getTmpDirectory()}/${uniqid()}/`;
    this.makeDirectory(tmp);
    return tmp;
  }

  /**
   * Make a directory.
   */
  public static makeDirectory(dirPath: string, permission: number = 0o755): File {
    if (this.existsFile(dirPath))
      return this;
    fse.mkdirsSync(dirPath);
    this.chmod(dirPath, permission);
    return this;
  }

  /**
   * Check if the file exists.
   */
  public static existsFile(filePath: string): boolean {
    try {
      fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete the file.
   */
  public static deleteFile(filePath: string): void {
    if (!this.existsFile(filePath))
      return;
    fs.unlinkSync(filePath);
  }

  /**
   * Delete the directory.
   */
  public static deleteDirectory(dirPath: string): void {
    fse.removeSync(dirPath);
  }

  /**
   * Write a file
   */
  public static write(filePath: string, content: string = '', options: fs.BaseEncodingOptions|string|undefined = undefined, permission: number = 0o755): File {
    // Delete files in the same path.
    this.deleteFile(filePath);

    // If the directory does not exist, create it.
    this.makeDirectory(path.dirname(filePath));

    // Write file.
    fs.writeFileSync(filePath, content, options);

    // Change permissions.
    this.chmod(filePath, permission);
    return this;
  }

  /**
   * Get the contents of a file as a string.
   */
  public static readAsString(filePath: string): string {
    return fs.readFileSync(filePath).toString();
  }

  /**
   * Obtain the contents of a JSON file as an object.
   */
  public static readAsJson(filePath: string): {} {
    return JSON.parse(this.readAsString(filePath));
  }

  /**
   * Obtain the contents of the media file as a DataURL string.
   */
  public static readAsDataUrl(filePath: string): string {
    const content =  fs.readFileSync(filePath, {encoding: 'base64'});
    const mime = mimeTypes.lookup(filePath);
    return `data:${mime};base64,${content}`;
  }

  /**
   * Obtain the contents of a media file as a base64 string.
   */
  public static readAsBase64(filePath: string): string {
    return fs.readFileSync(filePath, {encoding: 'base64'});
  }

  /**
   * Obtain file information.
   */
  public static getStat(filePath: string): any {
    return fs.statSync(filePath);
  }

  /**
   * Get file modification time in unix time.
   */
  public static getFilemtime(filePath: string): number {
    return moment(this.getStat(filePath).mtime).unix();
  }

  /**
   * Get the file extension.
   */
  public static getExtension(filePath: string): string|undefined {
    const ext = path.extname(filePath);
    return ext ? ext.split('.').pop() : undefined;
  }

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
   * @returns {string[]}
   */
  public static find(pattern: string, options: glob.IOptions = {}) {
    return glob.sync(pattern, {nodir: false, ...options});
  }

  /**
   * Returns the path to the new temporary directory. The directory is not created.
   */
  public static getTmpDirectory(): string {
    return os.tmpdir();
  }

  /**
   * Returns the path to the new temporary file. No file is created.
   */
  public static getTmpPath(ext?: string): string {
    let filePath = `${this.getTmpDirectory()}/${uniqid()}`;
    if (ext)
      filePath += `.${ext}`;
    return filePath;
  }

  /**
   * Check if it is a file.
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
   */
  public static rename(from: string, to: string): void {
    fs.renameSync(from, to);
  }
}