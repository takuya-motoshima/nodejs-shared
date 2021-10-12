# nodejs-shared

This is a shared module of node.js.

## Installation

Install.

```sh
npm install nodejs-shared;
```

## Changelog

### [1.0.2] - 2021-10-12

- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
  This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
  Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

### [1.0.1] - 2020-09-25

- Added delete directory method to file module.

    ```js
    import { File } from 'nodejs-shared';

    // Delete directory
    File.deleteDirectory('/sample');
    ````

## Usage

### File

General file manipulation utilities.

```js
import { File } from 'nodejs-shared';

// Returns the file base name
File.basename('/tmp/sample.html');// 'sample'

// Change permissions
File.chmod('sample.txt', 0o755);

// Create tmp directory
File.makeTmpDirectory();// '/tmp/5tbwc2dukck66vyk/'

// Delete directory
File.deleteDirectory('/sample');

// Make a directory
File.makeDirectory('test');

// Returns whether the file exists
File.existsFile('sample.txt');// true

// Delete file
File.deleteFile('sample.txt');

// Write a file
File.write('sample.txt', 'Hello, World!');

// Read a file as a string
File.readAsString('sample.txt');// 'Hello, World!'


// Read file as JSON object
File.readAsJson('sample.json');// { name: 'John Smith', age: 30 }

// Read files in base64 format
File.readAsBase64('sample.jpg');// 'data:image/jpeg;base64,/9j/4AAQSk...'

// Returns file information
File.getStat('sample.txt');
    // Stats {
    //   dev: 66305,
    //   mode: 33261,
    //   nlink: 1,
    //   uid: 1000,
    //   gid: 1000,
    //   rdev: 0,
    //   blksize: 4096,
    //   ino: 13617488,
    //   size: 13,
    //   blocks: 8,
    //   atimeMs: 1594624654468.3438,
    //   mtimeMs: 1594624654468.3438,
    //   ctimeMs: 1594624971566.2764,
    //   birthtimeMs: 1594624654468.3438,
    //   atime: 2020-07-13T07:17:34.468Z,
    //   mtime: 2020-07-13T07:17:34.468Z,
    //   ctime: 2020-07-13T07:22:51.566Z,
    //   birthtime: 2020-07-13T07:17:34.468Z
    // }

// Returns the file modification date and time
File.getFilemtime('sample.txt');// 1594624654

// Returns the file extension
File.getExtension('sample.txt');// 'txt'

// Find file
File.find('sample/**/*.txt');
    // [
    //   'sample/Administrator/Database/Vivian.txt',
    //   'sample/Architect/Harley.txt',
    //   'sample/Architect/Taylor.txt',
    //   'sample/Engineer/Eliza.txt',
    //   'sample/Engineer/Nancy.txt',
    //   'sample/Engineer/Robin.txt',
    //   'sample/Manager/Melinda.txt'
    // ]

// Returns the tmp directory. However, the tmp directory is not created.
File.getTmpDirectory();// '/tmp'

// Returns the tmp file path. However, tmp file is not created.
File.getTmpPath();// '/tmp/5tbwc2gskck789pt'

// Returns the tmp file path with extension.
File.getTmpPath('txt');// '/tmp/5tbwc2gskck78srx.txt'

// Return whether file
File.isFile('sample.txt');// true

// Rename file or directory name
File.rename('sample.txt', 'new.txt');
```

### Media

General media manipulation utilities.

```js
import { Media } from 'nodejs-shared';

// Write base64 to image
Media.writeBase64Image('sample.jpg', 'data:image/jpeg;base64,/9j/4AAQSk...');

// Convert base64 format to blob format
Media.convertBase64ToBlob('data:image/jpeg;base64,/9j/4AAQSk...');// /9j/4AAQSk...

// Return whether base64 format
Media.isBase64('data:image/jpeg;base64,/9j/4AAQSk...');// true

// Returns base64 file information
Media.statBase64('data:image/jpeg;base64,/9j/4AAQSk...');// { blob: '/9j/4AAQSk...', type: 'jpeg' }

// Returns the dimensions of the image
Media.getDimensions('sample.jpg');// { width: 960, height: 640 }

// Crop image
Media.crop('sample.jpg', 'crop.jpg', { left: 480, top: 220, width: 200, height: 200 });

// Resize to 100px width while keeping the aspect ratio.
Media.resize('sample.jpg', { width: 100 });

// Resize to 100px height while keeping the aspect ratio.
Media.resize('sample.jpg', { height: 100 });

// Resize width and height to 100px while maintaining aspect ratio. (Cover)
Media.resize('sample.jpg', { width: 100, height: 100 });

// // Resize width and height to 100px while maintaining aspect ratio. (Contain)
Media.resize('sample.jpg', { width: 100, height: 100, contain: true });

// Resize to 100px width while keeping the aspect ratio.
Media.resize('sample.jpg', { width: 100 });

// Resize to 100px height while keeping the aspect ratio.
Media.resize('sample.jpg', { height: 100 });

// Resize width and height to 100px while maintaining aspect ratio. (Cover)
Media.resize('sample.jpg', { width: 100, height: 100 });

// // Resize width and height to 100px while maintaining aspect ratio. (Contain)
Media.resize('sample.jpg', { width: 100, height: 100, contain: true });

// If you do not want to change the original image file, set output output destination
Media.resize('sample.jpg', { output: 'resized.jpg', width: 100 });
```

### Reflect

General utility that returns class information.

```js
import { Reflect } from 'nodejs-shared';

class Sample {
  public static func1 () {}
  public static func2 () {}
  private static func3 () {}
  private static func4 () {}
  public func5 () {}
  public func6 () {}
  private func7 () {}
  private func8 () {}
}

const sample = new Sample();

// Return class method name
Reflect.getStaticMethods(Sample);// Set(4) { 'func1', 'func2', 'func3', 'func4' }

// Returns the instance method name
Reflect.getMethods(sample);// Set(5) { 'constructor', 'func5', 'func6', 'func7', 'func8' }
```

### Regex

General Regex utilities.

```js
import { Regex } from 'nodejs-shared';

// Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|" in `string`.
Regex.escape('https://example.jp/?tag=TypeScript');// 'https://example\\.jp/\\?tag=TypeScript'

// When using your own wildcard, you can follow the metacharacters with the regular expression wildcard.
var strRegex = Regex.escape('https://example.jp?tag=*', { '*': '.*?' });
var regex = new RegExp(strRegex);
regex.test('https://example.jp?tag=TypeScript');// true
regex.test('https://example.jp?tag=JavaScript');// true
regex.test('https://example.jp?name=JavaScript');// false
```

## Browser

Browser information detection utility.

```js
import { Browser } from 'nodejs-shared';

// Detect browser information from UA.
Browser.parse('Mozilla/5.0 (Linux; Android 9; Lenovo TB-8505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36');
    // {
    //   platform: 'mobile',
    //   osName: 'Android',
    //   osVersion: 9,
    //   browserName: 'Chrome'
    // }
Browser.parse('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
    // {
    //   platform: 'tablet',
    //   osName: 'iOS',
    //   osVersion: 12.2,
    //   browserName: 'Safari'
    // }
Browser.parse('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; YTB730; GTB7.3; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30618; .NET4.0C)');
    // {
    //   platform: 'desktop',
    //   osName: 'Windows NT',
    //   osVersion: 6,
    //   browserName: 'Internet Explorer'
    // }
```

## Examples

There are some examples in "./examples/main.ts" in this package.Here is the first one to get you started.

## License

[MIT licensed](./LICENSE.txt)
