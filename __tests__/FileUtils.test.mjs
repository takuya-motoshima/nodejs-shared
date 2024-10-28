import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';
import {FileUtils} from '../dist/build.mjs';
import octalToPermissions from './support/octalToPermissions.mjs';

// Extract the directory portion of the URL.  This is the equivalent of __dirname in CommonJS.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const inputsDir = `${__dirname}/inputs`;
const outputsDir = `${__dirname}/outputs`;
const testUser = 'nginx';
const testGroup = 'nginx';
const testUid = 992;
const testGid = 992;

describe('basename', () => {
  test('should get the base name of a file', () => {
    expect(FileUtils.basename('/path/to/file.txt')).toBe('file');
    expect(FileUtils.basename('/path/to/file.txt', true)).toBe('file.txt');
  });
});

describe('changePermission', () => {
  test('should change file permissions', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const mode = 0o777;
    FileUtils.changePermission(filePath, mode);
    expect(octalToPermissions(fs.statSync(filePath).mode)).toBe(octalToPermissions(mode)); // Check file mode (permissions)
  });

  test('should change permissions with default mode', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    FileUtils.changePermission(filePath);
    expect(octalToPermissions(fs.statSync(filePath).mode)).toBe(octalToPermissions(0o755)); // Check file mode (permissions)
  });

  test('should throw an error if chmodSync fails', () => {
    const filePath = '/path/to/nonexistent/file.txt';
    const mode = 0o777;
    expect(() => FileUtils.changePermission(filePath, mode)).toThrow();
  });
});


describe('changeOwner', () => {
  test('should change owner and group', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const testUser = 'nginx';
    const testGroup = 'nginx';
    const testUid = 992;
    const testGid = 992;
    FileUtils.changeOwner(filePath, testUser, testGroup);

    const stats = fs.statSync(filePath);
    expect(stats.uid).toBe(testUid);
    expect(stats.gid).toBe(testGid);
  });

  test('should change owner only, keeping the original group', () => {
    const filePath = path.join(inputsDir, 'file2.txt');
    const testUser = 'nginx';
    const testUid = 992;
    const originalGid = 1000;
    FileUtils.changeOwner(filePath, testUser);

    const stats = fs.statSync(filePath);
    // console.log('stats=', stats);
    expect(stats.uid).toBe(testUid);
    expect(stats.gid).toBe(originalGid);
  });

  test('should throw an error if getting UID fails', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const testUser = 'nonexistentuser';
    const testGroup = 'nginx';
    expect(() => FileUtils.changeOwner(filePath, testUser, testGroup)).toThrow();
  });

  test('should throw an error if getting GID fails', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const testUser = 'nginx';
    const testGroup = 'nonexistentgroup';
    expect(() => FileUtils.changeOwner(filePath, testUser, testGroup)).toThrow();
  });
});