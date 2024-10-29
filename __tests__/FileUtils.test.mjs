import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';
import os from 'node:os';
import moment from 'moment';
import {FileUtils} from '../dist/build.mjs';
import octalToPermissions from './support/octalToPermissions.mjs';
import loadEnvironmentVariables from './support/loadEnvironmentVariables.mjs';

// Extract the directory portion of the URL.  This is the equivalent of __dirname in CommonJS.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const inputsDir = `${__dirname}/inputs`;
const outputsDir = `${__dirname}/outputs`;

// Load environment variables from .env file before running tests.
loadEnvironmentVariables();

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
    const username = 'nginx';
    const groupName = 'nginx';
    const uid = 992;
    const gid = 992;
    FileUtils.changeOwner(filePath, username, groupName);

    const stats = fs.statSync(filePath);
    expect(stats.uid).toBe(uid);
    expect(stats.gid).toBe(gid);
  });

  test('should change owner only, keeping the original group', () => {
    const filePath = path.join(inputsDir, 'file2.txt');
    const username = 'nginx';
    const uid = 992;
    const originalGid = 1000;
    FileUtils.changeOwner(filePath, username);

    const stats = fs.statSync(filePath);
    // console.log('stats=', stats);
    expect(stats.uid).toBe(uid);
    expect(stats.gid).toBe(originalGid);
  });

  test('should throw an error if getting UID fails', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const username = 'nonexistentuser';
    const groupName = 'nginx';
    expect(() => FileUtils.changeOwner(filePath, username, groupName)).toThrow();
  });

  test('should throw an error if getting GID fails', () => {
    const filePath = path.join(inputsDir, 'file.txt');
    const username = 'nginx';
    const groupName = 'nonexistentgroup';
    expect(() => FileUtils.changeOwner(filePath, username, groupName)).toThrow();
  });
});

describe('copy', () => {
  const sourceFile = '/tmp/source.txt';
  const sourceDir = '/tmp/source';
  const destFile = '/tmp/dest.txt';
  const destDir = '/tmp/dest';

  // Create test file and directory before running tests.
  beforeAll(() => {
    fs.writeFileSync(sourceFile, 'Hello, world!');
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
  const dirPath = '/tmp/test-directory'; // More descriptive path

  beforeAll(() => {
    // Create the test directory before tests.
    fs.mkdirSync(dirPath, {recursive: true});
  });

  afterAll(() => {
    // Clean up the test directory after all tests. Even if a test fails.
    fs.rmSync(dirPath, {recursive: true, force: true});
  });

  test('should call rmSync with recursive and force options when deleting a directory', () => {
    FileUtils.deleteDirectory(dirPath);
    expect(fs.existsSync(dirPath)).toBe(false);
  });
});

describe('deleteFile', () => {
  const filePath = '/tmp/test-file.txt';

  beforeAll(() => {
    // Create the test file before tests run
    fs.writeFileSync(filePath, 'Hello, world!');
  });

  afterAll(() => {
    // Clean up the test file after tests complete, even if a test fails.
    try{
      fs.unlinkSync(filePath); // Ensure mockedFs is not used here because afterAll should interact with the real file system.
    } catch(e){
      // Ignore errors, the file might not exist if a test deleted it successfully.
    }
  });

  test('should delete a file if it exists', () => {
    FileUtils.deleteFile(filePath);
    expect(fs.existsSync(filePath)).toBe(false);
  });
});

describe('exists', () => {
  const existingFilePath = '/tmp/existing-file.txt'; // Use a consistent path for easier cleanup
  const nonExistingFilePath = '/path/to/non-existing-file.txt';

  beforeAll(() => {
    // Create a real file for the "exists" test
    fs.writeFileSync(existingFilePath, 'Hello, world!');
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
  const dirPath = '/tmp/test-glob-dir';
  const files = ['file1.txt', 'file2.txt', 'subdir/file3.txt', 'subdir/file4.jpg'];

  beforeAll(() => {
    fs.mkdirSync(dirPath, {recursive: true});
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      fs.mkdirSync(path.dirname(fullPath), {recursive: true}); // Create subdirectories if necessary
      fs.writeFileSync(fullPath, ''); // Create empty files
    });
  });

  afterAll(() => {
    fs.rmSync(dirPath, {recursive: true, force: true});
  });

  test('should return an array of files matching the pattern', () => {
    const pattern = `${dirPath}/**/*.txt`;
    const expectedFiles = [
      path.join(dirPath, 'file1.txt'),
      path.join(dirPath, 'file2.txt'),
      path.join(dirPath, 'subdir', 'file3.txt'),
    ];
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles.sort()).toEqual(expectedFiles.sort());
  });

  test('should return an array of files matching the pattern (jpg)', () => {
    const pattern = `${dirPath}/**/*.jpg`;
    const expectedFiles = [path.join(dirPath, 'subdir', 'file4.jpg')];
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles.sort()).toEqual(expectedFiles.sort());
  });

  test('should return an empty array if no files match', () => {
    const pattern = `${dirPath}/**/*.pdf`;
    const actualFiles = FileUtils.glob(pattern);
    expect(actualFiles).toEqual([]);
  });
});

describe('getExtension', () => {
  test('should return the file extension for a file with an extension', () => {
    expect(FileUtils.getExtension('file.txt')).toBe('txt');
    expect(FileUtils.getExtension('/path/to/another.file.js')).toBe('js');
  });

  test('should return undefined for a file with no extension', () => {
    expect(FileUtils.getExtension('file')).toBeUndefined();
    expect(FileUtils.getExtension('/path/to/file')).toBeUndefined();
  });

  test('should return undefined for a file starting with a dot', () => {
      expect(FileUtils.getExtension('.gitignore')).toBeUndefined();
  });
});

describe('getFilemtime', () => {
  const filePath = '/tmp/test-file-for-mtime.txt'; 

  // Create a file and set modification time before tests
  beforeAll(() => {
    fs.writeFileSync(filePath, 'Hello, world!');
    const targetTime = moment('2024-05-06T18:00:00.000Z').toDate();
    // Set atime to targetTime as well
    fs.utimesSync(filePath, targetTime, targetTime); 
  });

  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  test('should return the correct file modification time', () => {
    const expectedUnixTime = moment('2024-05-06T18:00:00.000Z').unix();
    const actualUnixTime = FileUtils.getFilemtime(filePath);
    expect(actualUnixTime).toBe(expectedUnixTime);
  });

  // Test for statSync failure - still needs a mock
  test('should throw an error if statSync fails', () => {
    // Mock for a different file path to force an error
    const errorFilePath = '/path/to/non-existing-file.txt'; 
    expect(() => FileUtils.getFilemtime(errorFilePath)).toThrow();
  });
});

describe('getTmpDirectory', () => {
  const originalTmpDir = process.env.TMPDIR;

  afterEach(() => {
    // Restore the original TMPDIR environment variable after each test
    process.env.TMPDIR = originalTmpDir;
  });

  test('should return TMPDIR environment variable if set', () => {
    const expectedTmpDir = '/custom/tmp/dir';
    process.env.TMPDIR = expectedTmpDir;
    const tmpDir = FileUtils.getTmpDirectory();
    expect(tmpDir).toBe(expectedTmpDir);
  });

  test('should return os.tmpdir() if TMPDIR is not set', () => {
    delete process.env.TMPDIR; // Ensure TMPDIR is not set
    const expectedTmpDir = os.tmpdir();
    const tmpDir = FileUtils.getTmpDirectory();
    expect(tmpDir).toBe(expectedTmpDir);
  });

  test('should remove trailing slashes from the returned path', () => {
    process.env.TMPDIR = '/custom/tmp/dir';
    const tmpDir = FileUtils.getTmpDirectory();
    expect(tmpDir).toBe('/custom/tmp/dir');
  });
});

describe('getTmpPath', () => {
  test('should return a temporary file path with a random name', () => {
    const tmpPath = FileUtils.getTmpPath();

    // Check if the path starts with /tmp or /var/tmp.
    expect(tmpPath).toMatch(/^\/(tmp|var\/tmp)\/[a-z0-9]+$/);
  });

  test('should return a temporary file path with the specified extension', () => {
    const tmpPath = FileUtils.getTmpPath('txt');

    // Check if the path starts with /tmp or /var/tmp and ends with .txt.
    expect(tmpPath).toMatch(/^\/(tmp|var\/tmp)\/[a-z0-9]+\.txt$/); 
  });
});

describe('isBase64', () => {
  test('should return true for valid base64 strings', () => {
    expect(FileUtils.isBase64('SGVsbG8gd29ybGQh')).toBe(true); // "Hello world!" in base64
    expect(FileUtils.isBase64('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAWcAAAAFElDQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')).toBe(true); // A 1x1 transparent PNG image in base64
  });

  test('should return false for invalid base64 strings', () => {
    expect(FileUtils.isBase64('This is not base64')).toBe(false);
    expect(FileUtils.isBase64('iVBORw0KGgoAAAANSUhEU')).toBe(false); // Incomplete base64 string
  });
});

describe('isDirectory', () => {
  const dirPath = '/tmp/test-dir-for-is-directory';
  const filePath = path.join(dirPath, 'test-file.txt');

  beforeAll(() => {
    // Create the test directory and file
    fs.mkdirSync(dirPath);
    fs.writeFileSync(filePath, 'Hello, world!');
  });

  afterAll(() => {
    // Remove the test directory and file
    fs.rmSync(dirPath, { recursive: true, force: true });
  });

  test('should return true for a directory', () => {
    expect(FileUtils.isDirectory(dirPath)).toBe(true);
  });

  test('should return false for a file', () => {
    expect(FileUtils.isDirectory(filePath)).toBe(false);
  });

  test('should throw an error if the path does not exist', () => {
    const nonExistingPath = '/path/to/non-existing-directory';
    expect(() => FileUtils.isDirectory(nonExistingPath)).toThrow();
  });
});

describe('isFile', () => {
  const dirPath = '/tmp/test-dir-for-is-file';
  const filePath = path.join(dirPath, 'test-file.txt');

  beforeAll(() => {
    // Create the test directory and file
    fs.mkdirSync(dirPath);
    fs.writeFileSync(filePath, 'Hello, world!');
  });

  afterAll(() => {
    // Remove the test directory and file
    fs.rmSync(dirPath, { recursive: true, force: true });
  });

  test('should return true for a file', () => {
    expect(FileUtils.isFile(filePath)).toBe(true);
  });

  test('should return false for a directory', () => {
    expect(FileUtils.isFile(dirPath)).toBe(false);
  });

  test('should return false if statSync throws an error', () => {
    const nonExistingPath = '/path/to/non-existing-file.txt';
    expect(FileUtils.isFile(nonExistingPath)).toBe(false);
  });
});

describe('isPath', () => {
  test('should return true for valid paths', () => {
    expect(FileUtils.isPath('/path/to/file.txt')).toBe(true);
    expect(FileUtils.isPath('relative/path/to/file.txt')).toBe(true);
    expect(FileUtils.isPath('file.txt')).toBe(true);
    expect(FileUtils.isPath('./file.txt')).toBe(true);
    expect(FileUtils.isPath('../file.txt')).toBe(true);
    // expect(FileUtils.isPath('C:\\path\\to\\file.txt')).toBe(true); // Windows path
    expect(FileUtils.isPath('~/file.txt')).toBe(true); // Unix home directory
  });

  test('should return false for invalid paths', () => {
    expect(FileUtils.isPath('')).toBe(false); // Empty string
    expect(FileUtils.isPath(' ')).toBe(false); // Whitespace only
    expect(FileUtils.isPath('path/to/file*.txt')).toBe(false); // Wildcard character
    expect(FileUtils.isPath('path/to/file?.txt')).toBe(false); // Question mark
    expect(FileUtils.isPath('path/to/file<*.txt')).toBe(false); // Less than
    expect(FileUtils.isPath('path/to/file>.txt')).toBe(false); // Greater than
    expect(FileUtils.isPath('path/to/file:"*.txt')).toBe(false); // Double quote
    expect(FileUtils.isPath('path/to/file|*.txt')).toBe(false); // Pipe
    expect(FileUtils.isPath('path/to/file?*.txt')).toBe(false); // Question mark
    expect(FileUtils.isPath('path/to/file\0.txt')).toBe(false); // Null character
    expect(FileUtils.isPath(123)).toBe(false); // Not a string (TypeScript type cast for testing purposes)
  });
});

describe('makeDirectory', () => {
  const dirPath = '/tmp/test-directory';

  afterEach(() => {
    // Clean up the test directory after each test
    // Using the real fs module here to ensure cleanup happens even if tests fail
    if (fs.existsSync(dirPath))
      fs.rmSync(dirPath, {recursive: true, force: true});
  });

  test('should create a directory with default permissions', () => {
    FileUtils.makeDirectory(dirPath);
    expect(fs.existsSync(dirPath)).toBe(true); // Check if the directory exists
    expect(octalToPermissions(fs.statSync(dirPath).mode)).toBe(octalToPermissions(0o755)); // Check file mode (permissions)
  });

  test('should create a directory with custom permissions', () => {
    const customMode = 0o700;
    FileUtils.makeDirectory(dirPath, {mode: customMode});
    expect(fs.existsSync(dirPath)).toBe(true); // Check if the directory exists
    expect(octalToPermissions(fs.statSync(dirPath).mode)).toBe(octalToPermissions(customMode)); // Check file mode (permissions)
  });

  test('should create a directory with owner information', () => {
    const username = 'nginx';
    const groupName = 'nginx';
    const uid = 992;
    const gid = 992;
    FileUtils.makeDirectory(dirPath, {owner: {username, groupName}});
    expect(fs.existsSync(dirPath)).toBe(true); // Check if the directory exists
    const stats = fs.statSync(dirPath);
    expect(stats.uid).toBe(uid);
    expect(stats.gid).toBe(gid);
  });
});

describe('makeTmpDirectory', () => {
  let createdTmpDir;

  afterEach(() => {
    // Clean up the created temporary directory after each test
    if (createdTmpDir && fs.existsSync(createdTmpDir))
      fs.rmSync(createdTmpDir, {recursive: true, force: true});
  });

  test('should create a temporary directory with a unique name', () => {
    createdTmpDir = FileUtils.makeTmpDirectory();
    expect(createdTmpDir).toMatch(/^\/(tmp|var\/tmp)\/[a-z0-9]+$/); // Starts with /tmp or /var/tmp
    expect(fs.existsSync(createdTmpDir)).toBe(true);
  });

  test('should create a temporary directory with custom permissions', () => {
    const customMode = 0o700;
    createdTmpDir = FileUtils.makeTmpDirectory({mode: customMode});
    expect(fs.existsSync(createdTmpDir)).toBe(true); // Check if the directory exists
    expect(octalToPermissions(fs.statSync(createdTmpDir).mode)).toBe(octalToPermissions(customMode)); // Check file mode (permissions)
  });

  test('should create a temporary directory with owner information', () => {
    const username = 'nginx';
    const groupName = 'nginx';
    const uid = 992;
    const gid = 992;
    createdTmpDir = FileUtils.makeTmpDirectory({owner: {username, groupName}});
    expect(fs.existsSync(createdTmpDir)).toBe(true); // Check if the directory exists
    const stats = fs.statSync(createdTmpDir);
    expect(stats.uid).toBe(uid);
    expect(stats.gid).toBe(gid);
  });
});

describe('readAsBase64', () => {
  const filePath = '/tmp/test-file-for-base64.txt';
  const content = 'Hello, world!';
  beforeAll(() => {
    fs.writeFileSync(filePath, content);
  });

  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  test('should read the file content as a base64 string', () => {
    const base64 = FileUtils.readAsBase64(filePath);
    expect(base64).toBe(Buffer.from(content).toString('base64'));
  });
});

describe('readAsDataUrl', () => {
  const filePath = '/tmp/test-file-for-dataurl.txt';
  const content = 'Hello, world!';

  beforeAll(() => {
    fs.writeFileSync(filePath, content);
  });

  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  test('should read the file content as a data URL', () => {
    const dataUrl = FileUtils.readAsDataUrl(filePath);
    expect(dataUrl).toBe(`data:text/plain;base64,${Buffer.from(content).toString('base64')}`);
  });

  test('should handle svg files correctly', () => {
    const svgContent = '<svg></svg>';
    const svgFilePath = '/tmp/test.svg';
    fs.writeFileSync(svgFilePath, svgContent);
    const dataUrl = FileUtils.readAsDataUrl(svgFilePath);
    expect(dataUrl).toBe(`data:image/svg+xml;utf8,%3Csvg%3E%3C%2Fsvg%3E`);
    fs.unlinkSync(svgFilePath);
  });
});

describe('readAsJson', () => {
  const filePath = '/tmp/test-file-for-json.json';
  const content = {message: 'Hello, world!'};

  beforeAll(() => {
    fs.writeFileSync(filePath, JSON.stringify(content));
  });

  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  test('should read and parse the JSON file content', () => {
    const jsonObject = FileUtils.readAsJson(filePath);
    expect(jsonObject).toEqual(content);
  });
});

describe('readAsString', () => {
  const filePath = '/tmp/test-file-for-string.txt';
  const content = 'Hello, world!';

  beforeAll(() => {
    fs.writeFileSync(filePath, content);
  });

  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  test('should read the file content as a string', () => {
    const stringContent = FileUtils.readAsString(filePath);
    expect(stringContent).toBe(content);
  });
});

describe('rename', () => {
  const oldFilePath = '/tmp/test-file-old.txt';
  const newFilePath = '/tmp/test-file-new.txt';

  beforeEach(() => {
    // Create the test file before each test
    fs.writeFileSync(oldFilePath, 'Hello, world!');
  });

  afterEach(() => {
    // Clean up the test files after each test
    if (fs.existsSync(oldFilePath))
      fs.unlinkSync(oldFilePath);
    if (fs.existsSync(newFilePath))
      fs.unlinkSync(newFilePath);
  });

  test('should rename the file', () => {
    FileUtils.rename(oldFilePath, newFilePath);
    expect(fs.existsSync(oldFilePath)).toBe(false);
    expect(fs.existsSync(newFilePath)).toBe(true);
  });
});

describe('write', () => {
  const filePath = '/tmp/test-file-for-write.txt';
  const content = 'Hello, world!';
  const buffer = Buffer.from(content);

  afterEach(() => {
    // Clean up the test file after each test
    if (fs.existsSync(filePath))
      fs.unlinkSync(filePath);
  });

  test('should write a string to a file with default permissions', () => {
    FileUtils.write(filePath, content);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe(content);
  });

  test('should write a Buffer to a file with default permissions', () => {
    FileUtils.write(filePath, buffer);
    expect(fs.readFileSync(filePath)).toEqual(buffer); // Compare Buffers directly
  });

  test('should write to a file with custom permissions', () => {
    const customMode = 0o644;
    FileUtils.write(filePath, content, {mode: customMode});
    expect(octalToPermissions(fs.statSync(filePath).mode)).toBe(octalToPermissions(customMode)); // Check file mode (permissions)
  });

  test('should write to a file with owner information', () => {
    const username = 'nginx';
    const groupName = 'nginx';
    const uid = 992;
    const gid = 992;
    FileUtils.write(filePath, content, {owner: {username, groupName}});
    const stats = fs.statSync(filePath);
    expect(stats.uid).toBe(uid);
    expect(stats.gid).toBe(gid);
  });

  test('should create the directory if it does not exist', () => {
    const newFilePath = '/tmp/new-dir/test-file.txt';
    FileUtils.write(newFilePath, content);
    expect(fs.existsSync(newFilePath)).toBe(true);

    // Clean up the newly created directory.
    fs.rmSync('/tmp/new-dir', {recursive: true, force: true});
  });
});