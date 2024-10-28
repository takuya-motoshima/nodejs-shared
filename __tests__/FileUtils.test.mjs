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

describe('copy', () => {
  const sourceFile = '/tmp/source.txt';
  const sourceDir = '/tmp/source';
  const destFile = '/tmp/dest.txt';
  const destDir = '/tmp/dest';

  // Create test file and directory before running tests.
  beforeAll(() => {
    fs.writeFileSync(sourceFile, 'test file content');
    fs.mkdirSync(sourceDir, {recursive: true});
    fs.writeFileSync(path.join(sourceDir, 'file-in-dir.txt'), 'test file in dir content');
  });

  // Remove test file and directory after running tests.
  afterAll(() => {
    fs.unlinkSync(sourceFile);
    fs.rmSync(sourceDir, {recursive: true, force: true});

    // Remove destination file/directory as well
    fs.rmSync(destFile, {force: true}); // If it's a file
    fs.rmSync(destDir, {recursive: true, force: true}); // If it's a directory
  });

  test('should copy a file', () => {
    FileUtils.copy(sourceFile, destFile);
    expect(fs.existsSync(destFile)).toBe(true); // Check if the file exists
  });

  test('should copy a directory recursively', () => {
    FileUtils.copy(sourceDir, destDir);
    expect(fs.existsSync(destDir)).toBe(true); // Check if the directory exists
    expect(fs.existsSync(path.join(destDir, 'file-in-dir.txt'))).toBe(true); // Check if the file exists
  });
});

describe('deleteDirectory', () => {
  const testDirPath = '/tmp/test-directory'; // More descriptive path

  beforeAll(() => {
    // Create the test directory before tests.
    fs.mkdirSync(testDirPath, {recursive: true});
  });

  afterAll(() => {
    // Clean up the test directory after all tests. Even if a test fails.
    fs.rmSync(testDirPath, {recursive: true, force: true});
  });

  test('should call rmSync with recursive and force options when deleting a directory', () => {
    FileUtils.deleteDirectory(testDirPath);
    expect(fs.existsSync(testDirPath)).toBe(false);
  });
});

describe('deleteFile', () => {
  const testFilePath = '/tmp/test-file.txt';

  beforeAll(() => {
    // Create the test file before tests run
    fs.writeFileSync(testFilePath, 'test content');
  });

  afterAll(() => {
    // Clean up the test file after tests complete, even if a test fails.
    try{
      fs.unlinkSync(testFilePath); // Ensure mockedFs is not used here because afterAll should interact with the real file system.
    } catch(e){
      // Ignore errors, the file might not exist if a test deleted it successfully.
    }
  });

  test('should delete a file if it exists', () => {
    FileUtils.deleteFile(testFilePath);
    expect(fs.existsSync(testFilePath)).toBe(false);
  });
});

describe('exists', () => {
  const existingFilePath = '/tmp/existing-file.txt'; // Use a consistent path for easier cleanup
  const nonExistingFilePath = '/path/to/non-existing-file.txt';

  beforeAll(() => {
    // Create a real file for the "exists" test
    fs.writeFileSync(existingFilePath, 'File Content');
  });

  afterAll(() => {
    fs.unlinkSync(existingFilePath);
  });

  test('should return true if the file/directory exists', () => {
    expect(FileUtils.exists(existingFilePath)).toBe(true);
  });

  test('should return false if the file/directory does not exist', () => {
    expect(FileUtils.exists(nonExistingFilePath)).toBe(false);
  });
});

describe('glob', () => {
  const testDir = '/tmp/test-glob-dir';
  const testFiles = ['file1.txt', 'file2.txt', 'subdir/file3.txt', 'subdir/file4.jpg'];

  beforeAll(() => {
    fs.mkdirSync(testDir, {recursive: true});
    testFiles.forEach(file => {
      const fullPath = path.join(testDir, file);
      fs.mkdirSync(path.dirname(fullPath), {recursive: true}); // Create subdirectories if necessary
      fs.writeFileSync(fullPath, ''); // Create empty files
    });
  });

  afterAll(() => {
    fs.rmSync(testDir, {recursive: true, force: true});
  });

  test('should return an array of files matching the pattern', () => {
    const pattern = `${testDir}/**/*.txt`;
    const expectedFiles = [
      path.join(testDir, 'file1.txt'),
      path.join(testDir, 'file2.txt'),
      path.join(testDir, 'subdir', 'file3.txt'),
    ];
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles.sort()).toEqual(expectedFiles.sort());
  });

  test('should return an array of files matching the pattern (jpg)', () => {
    const pattern = `${testDir}/**/*.jpg`;
    const expectedFiles = [path.join(testDir, 'subdir', 'file4.jpg')];
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles.sort()).toEqual(expectedFiles.sort());
  });

  test('should return an empty array if no files match', () => {
    const pattern = `${testDir}/**/*.pdf`;
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles).toEqual([]);
  });
});