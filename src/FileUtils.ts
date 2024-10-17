import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {Buffer} from 'node:buffer';
import uniqid from 'uniqid';
import moment from 'moment';
import {globSync, GlobOptions} from 'glob';
import mime from 'mime-types';
import ProcessUtils from './ProcessUtils';

/**
 * Options for creating a directory.
 */
interface MakeDirectoryOptions {
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
 */
interface WriteOptions extends Extract<fs.WriteFileOptions, object> {
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

// interface WriteOptions {
//   mode?: number;
//   owner?: {
//     username?: string;
//     groupName?: string;
//   };
// }

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
  public static basename(filePath: string, withExtension: boolean = false): string {
    return path.basename(filePath, withExtension ? undefined : path.extname(filePath));
  }

  /**
   * Changes file or directory permissions.
   * @param {string} filePath The path of the file or directory.
   * @param {number} mode The new permissions (default: 0o755).
   * @throws {Error} If an error occurs during permission change.
   */
  public static changePermission(filePath: string, mode: number = 0o755): void {
    try {
      fs.chmodSync(filePath, mode);
    } catch (error) {
      throw new Error(`Failed to change permissions for: ${filePath}, ${error}`);
    }
  }

  /**
   * Changes the owner and/or group of a file or directory.
   * @param {string} filePath The path of the file or directory.
   * @param {string} username The new owner's username.
   * @param {string|undefined} groupName The new group's name. If undefined, the group will not be changed.
   * @throws {Error} If an error occurs during ownership change or user/group lookup.
   */
  public static changeOwner(filePath: string, username: string, groupName?: string): void {
    try {
      const uid = ProcessUtils.getUid(username);
      if (groupName) {
        // Only change the group if groupName is provided
        const gid = ProcessUtils.getGid(groupName);
        fs.chownSync(filePath, uid as number, gid);
      } else {
        // Get the current file stats to retrieve the existing GID.
        const currentStats = fs.statSync(filePath);

        // Change the owner, keeping the original group.
        fs.chownSync(filePath, uid, currentStats.gid);
      }
    } catch (err) {
      throw new Error(`Failed to change owner/group for: ${filePath}, ${err}`);
    }
  }

  /**
   * Copies a file or directory recursively.
   * @param {string} sourcePath The path of the source file or directory.
   * @param {string} destinationPath The path of the destination.
   * @throws {Error} If an error occurs during copying.
   */
  public static copy(sourcePath: string, destinationPath: string): void {
    try {
      fs.cpSync(sourcePath, destinationPath, {recursive: true, force: true});
    } catch (error) {
      throw new Error(`Failed to copy: ${sourcePath} to ${destinationPath}, ${error}`);
    }
  }

  /**
   * Deletes a directory recursively.
   * @param {string} directoryPath The path of the directory to delete.
   * @throws {Error} If an error occurs during directory deletion.
   */
  public static deleteDirectory(directoryPath: string): void {
    try {
      fs.rmSync(directoryPath, {recursive: true, force: true});
    } catch (error) {
      throw new Error(`Failed to delete directory: ${directoryPath}, ${error}`);
    }
  }

  /**
   * Deletes a file.
   * @param {string} filePath The path of the file to delete.
   * @throws {Error} If an error occurs during file deletion.
   */
  public static deleteFile(filePath: string): void {
    try {
      if (this.exists(filePath))
        fs.unlinkSync(filePath);
    } catch (error) {
      throw new Error(`Failed to delete file: ${filePath}, ${error}`);
    }
  }

  /**
   * Checks if a file or directory exists.
   * @param {string} filePath The path of the file or directory.
   * @return {boolean} `true` if the file or directory exists, `false` otherwise.
   */
  public static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Finds files matching a pattern using the `glob` npm package internally.
   * @param {string} pattern The glob pattern to match.
   * @param {GlobOptions} options Optional glob options (see `glob.GlobOptions`).
   * @return {string[]} An array of absolute paths of the matched files.
   */
  public static glob(pattern: string, options: GlobOptions = {}): string[] {
    return globSync(pattern, {nodir: false, ...options}) as string[];
  }

  /**
   * Gets the file extension.
   * @param {string} filePath The path of the file.
   * @return {string|undefined} The file extension, or `undefined` if there is no extension.
   */
  public static getExtension(filePath: string): string|undefined {
    const extension = path.extname(filePath);
    return extension ? extension.slice(1) : undefined;
  }

  /**
   * Gets the file modification time in Unix time.
   * @param {string} filePath The path of the file.
   * @return {number} The last modified Unix time of the file.
   * @throws {Error} If an error occurs during stat retrieval.
   */
  public static getFilemtime(filePath: string): number {
    try {
      return moment(this.getStat(filePath).mtime).unix();
    } catch (error) {
      throw new Error(`Failed to retrieve file modification time : ${filePath}, ${error}`);
    }
  }

  /**
   * Gets file information.
   * @param {string} filePath The path of the file.
   * @return {fs.Stats} A `fs.Stats` object containing file information.
   * @throws {Error} If an error occurs during stat retrieval.
   */
  public static getStat(filePath: string): fs.Stats {
    try {
      return fs.statSync(filePath);
    } catch (error) {
      throw new Error(`Failed to retrieve file information : ${filePath}, ${error}`);
    }
  }

  /**
   * Gets the path to the temporary directory.
   * Uses the `TMPDIR` environment variable if present, otherwise uses the system's temporary directory.
   * @return {string} The path to the temporary directory.
   */
  public static getTmpDirectory(): string {
    return (process.env.TMPDIR || os.tmpdir()).replace(/[/\\]$/, '');
  }

  /**
   * Gets a temporary file path.
   * @param {string} extension The file extension (optional).
   * @return {string} The temporary file path.
   */
  public static getTmpPath(extension?: string): string {
    let tmpPath = path.join(this.getTmpDirectory(), uniqid());
    if (extension)
      tmpPath += `.${extension}`;
    return tmpPath;
  }

  /**
   * Checks if a string is a base64 encoded string.
   * @param {string} str The string to check.
   * @return {boolean} `true` if the string is base64 encoded, `false` otherwise.
   */
  public static isBase64(str: string): boolean {
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a path is a directory.
   * @param {string} directoryPath The path to check.
   * @return {boolean} `true` if the path is a directory, `false` otherwise.
   * @throws {Error} If the path does not exist.
   */
  public static isDirectory(directoryPath: string): boolean {
    if (!this.exists(directoryPath))
      throw new Error(`Input path ${directoryPath} not found`);
    return this.getStat(directoryPath).isDirectory();
  }

  /**
   * Checks if a path is a file.
   * @param {string} filePath The path to check.
   * @return {boolean} `true` if the path is a file, `false` otherwise.
   */
  public static isFile(filePath: string): boolean {
    try {
      const stats = this.getStat(filePath);
      return stats.isFile();
    } catch {
      return false;
    }
  }

  /**
   * Checks if a string is a valid file system path.
   * This method checks for invalid characters and empty strings after trimming whitespace.
   * It does not check if the path actually exists.
   * @param {string} str The string to check.
   * @return {boolean} `true` if the string is a valid file system path, `false` otherwise.
   */
  public static isPath(str: string): boolean {
    if (typeof str !== 'string' || str.trim() === '')
      return false;
    const rootPath = path.parse(str).root;
    if (rootPath)
      str = str.slice(rootPath.length);
    const invalidCharacters = /[<>:"|?*\u0000-\u001F]/;
    return !invalidCharacters.test(str);
  }

  /**
   * Makes a directory recursively.
   * @param {string} directoryPath The path of the directory to create.
   * @param {MakeDirectoryOptions} options Options for directory creation.
   * @param {number|undefined} options.mode The directory permissions (default: 0o755).
   * @param {object|undefined} options.owner The owner information for the directory.
   * @param {string|undefined} options.owner.username The username of the owner.
   * @param {string|undefined} options.owner.groupName The group name of the owner.
   * @throws {Error} If an error occurs during directory creation or changing ownership.
   */
  public static makeDirectory(directoryPath: string, options: MakeDirectoryOptions = {}): void {
    try {
      const {mode = 0o755, owner} = options;
      fs.mkdirSync(directoryPath, {recursive: true, mode});
      if (owner?.username)
        this.changeOwner(directoryPath, owner.username, owner.groupName);
    } catch (error) {
      throw new Error(`Failed to create directory: ${directoryPath}, ${error}`);
    }
  }

  /**
   * Creates a temporary directory. Uses the `TMPDIR` environment variable if present, 
   * otherwise uses the system's temporary directory.
   * @param {MakeDirectoryOptions} options Options for directory creation.
   * @param {number|undefined} options.mode The directory permissions (default: 0o755).
   * @param {object|undefined} options.owner The owner information for the directory.
   * @param {string|undefined} options.owner.username The username of the owner.
   * @param {string|undefined} options.owner.groupName The group name of the owner.
   * @return {string} The path of the created temporary directory.
   * @throws {Error} If an error occurs during directory creation.
   */
  public static makeTmpDirectory(options: MakeDirectoryOptions = {}): string {
    const tmpDirectory = path.join(this.getTmpDirectory(), uniqid());
    this.makeDirectory(tmpDirectory, options);
    return tmpDirectory;
  }

  /**
   * Reads the content of a file as a base64 string.
   * @param {string} filePath The path of the file to read.
   * @return {string} The content of the file as a base64 string.
   * @throws {Error} If an error occurs during file reading.
   */
  public static readAsBase64(filePath: string): string {
    try {
      const content = fs.readFileSync(filePath);
      return content.toString('base64');
    } catch (error) {
      throw new Error(`Failed to read as base64: ${filePath}, ${error}`);
    }
  }

  /**
   * Reads the content of a media file and returns it as a data URL string.
   * @param {string} filePath The path of the media file to read.
   * @return {string} The data URL string.
   * @throws {Error} If an error occurs during file reading or data URL generation.
   */
   public static readAsDataUrl(filePath: string): string {
    try {
      const content = fs.readFileSync(filePath);
      const mimeType = mime.lookup(filePath) || 'application/octet-stream';
      const base64 = content.toString('base64');
      if (mimeType === 'image/svg+xml') {
        const encoded = encodeURIComponent(content.toString('utf8')); // Explicitly use utf8 encoding
        return `data:${mimeType};utf8,${encoded}`;
      } else
        return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      throw new Error(`Failed to read media file: ${filePath}, ${error}`);
    }
  }

  /**
   * Reads the content of a JSON file and parses it as an object.
   * @param {string} filePath The path of the JSON file to read.
   * @return {T} The parsed JSON object.
   * @throws {Error} If an error occurs during file reading or JSON parsing.
   * @template T
   */
  public static readAsJson<T>(filePath: string): T {
    try {
      const content = this.readAsString(filePath);
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read JSON file: ${filePath}, ${error}`);
    }
  }

  /**
   * Reads the content of a file as a string.
   * @param {string} filePath The path of the file to read.
   * @return {string} The content of the file as a string.
   * @throws {Error} If an error occurs during file reading.
   */
  public static readAsString(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to read file: ${filePath}, ${error}`);
    }
  }

  /**
   * Renames a file or directory.
   * @param {string} sourcePath The original path of the file or directory.
   * @param {string} destinationPath The new path of the file or directory.
   * @throws {Error} If an error occurs during renaming.
   */
  public static rename(sourcePath: string, destinationPath: string): void {
    try {
      fs.renameSync(sourcePath, destinationPath);
    } catch (error) {
      throw new Error(`Failed to rename file or directory: ${sourcePath} to ${destinationPath}`);
    }
  }

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
   * @param {number|undefined} options.mode File permissions. Defaults to 0o755.  Overridden by `options.mode` if provided.
   * @param {object|undefined} options.owner Owner information.
   * @param {string|undefined} options.owner.username The owner of the file.
   * @param {string|undefined} options.owner.groupName The group of the file.
   * @throws {Error} If an error occurs during file writing, directory creation, or permission/owner changes.
   */
  public static write(filePath: string, content: string|Buffer = '', options: WriteOptions = {}): void {
    try {
      const fileOptions: fs.WriteFileOptions = {mode: 0o755, ...options};
      this.makeDirectory(path.dirname(filePath)); // Assuming makeDirectory is defined elsewhere
      fs.writeFileSync(filePath, content, fileOptions);
      if (options.owner?.username)
        this.changeOwner(filePath, options.owner.username, options.owner.groupName);
    } catch (error) {
      throw new Error(`Failed to write to file : ${filePath}, ${error}`);
    }
  }
}