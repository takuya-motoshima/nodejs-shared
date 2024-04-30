# nodejs-shared
This is a shared module of node.js.  
Click [here](CHANGELOG.md) to see the change log.

## Installation
```sh
npm install --save nodejs-shared
```

## Requirements
- [ImageMagick](https://imagemagick.org/index.php) is required to use the methods to retrieve the first frame of a GIF in the Media class and to get the number of frames in a GIF.  
    In Mac OS X, you can simply use [Homebrew](https://brew.sh/) and do:
    ```sh
    brew install imagemagick
    ```

    Confirmation of installation results.
    ```sh
    convert -version
    ```

## API
|Function|Description|
|--|--|
|[File.basename](#filebasename)|Get the file name from the path.|
|[File.chmod](#filechmod)|Change permissions.|
|[File.makeTmpDirectory](#filemaketmpdirectory)|Create a temporary directory.|
|[File.makeDirectory](#filemakedirectory)|Make a directory.|
|[File.existsFile](#fileexistsfile)|Check if the file or directory exists.|
|[File.deleteFile](#filedeletefile)|Delete the file.|
|[File.deleteDirectory](#filedeletedirectory)|Delete the directory.|
|[File.write](#filewrite)|Write a file|
|[File.readAsString](#filereadasstring)|Get the contents of a file as a string.|
|[File.readAsJson](#filereadasjson)|Get the contents of a JSON file as an object.|
|[File.readAsDataUrl](#filereadasdataurl)|Get the contents of the media file as a data URL string.|
|[File.readAsBase64](#filereadasbase64)|Get the contents of a media file as a base64 string.|
|[File.getStat](#filegetstat)|Get file information.|
|[File.getFilemtime](#filegetfilemtime)|Get file modification time in unix time.|
|[File.getExtension](#filegetextension)|Get the file extension.|
|[File.find](#filefind)|Find files that match the file name or path pattern.|
|[File.getTmpDirectory](#filegettmpdirectory)|Get path to temporary directory.|
|[File.getTmpPath](#filegettmppath)|Get temporary file path.|
|[File.isFile](#fileisfile)|Check if it is a file.|
|[File.rename](#filerename)|Rename a file or directory.|
|[File.isBase64](#fileisbase64)|Check if it is a base64 string.|
|[File.isDirectory](#fileisdirectory)|Check if the path is a directory.|
|[File.copyDirectory](#filecopydirectory)|Copy a file or directory. The directory can have contents.|
|[File.isPath](#fileispath)|Check if it is valid as a file system path.|
|[Media.writeDataUrlToFile](#mediawritedataurltofile)|Write data URL to a file.|
|[Media.dataUrlToBase64](#mediadataurltobase64)|Convert data URL to blob data in base64 format.|
|[Media.isDataUrl](#mediaisdataurl)|Check if the string is in data URL format.|
|[Media.statDataUrl](#mediastatdataurl)|Get the MIME type and base64 from the data URL string.|
|[Media.getDimensions](#mediagetdimensions)|Get the dimensions (pixels) of the image.|
|[Media.crop](#mediacrop)|Crop from image.|
|[Media.resize](#mediaresize)|Resize image.|
|[Media.dataUrlByteSize](#mediadataurlbytesize)|Get the byte size of data URL.|
|[Media.base64ByteSize](#mediabase64bytesize)|Get base64 byte size.|
|[Media.getMimeTypeFromDataUrl](#mediagetmimetypefromdataurl)|Get Mime type from data URL.|
|[Media.getExtensionFromDataUrl](#mediagetextensionfromdataurl)|Get extension from data URL.|
|[Media.mergeImages](#mediamergeimages)|Merge images.|
|[Media.extractFirstFrameOfGif](#mediaextractfirstframeofgif)|Extract and save the first frame of the animated GIF.|
|[Media.getNumberOfGifFrames](#mediagetnumberofgifframes)|Get the number of GIF frames.|
|[Media.convertImageFormat](#mediaconvertimageformat)|Convert Between Image Formats.|
|[Reflect.getStaticMethods](#reflectgetstaticmethods)|Find static methods from the class.|
|[Reflect.getMethods](#reflectgetmethods)|Find a method from an instance.|
|[Regex.escape](#regexescape)|Escapes the `RegExp` special characters &quot;^&quot;, &quot;$&quot;, &quot;\&quot;, &quot;.&quot;, &quot;*&quot;, &quot;+&quot;, &quot;?&quot;, &quot;(&quot;, &quot;)&quot;, &quot;[&quot;, &quot;]&quot;, &quot;{&quot;, &quot;}&quot;, &quot;|&quot; in `string`.|
|[Browser.parse](#browserparse)|Analyze browser information from UA.|
|[validators.isAfter](#validatorsisafter)|Check if it is an after date.|
|[validators.isAlpha](#validatorsisalpha)|Check if it is alphabetical (a-zA-Z).|
|[validators.isAlphanumeric](#validatorsisalphanumeric)|Check if alphanumeric (a-zA-Z0-9).|
|[validators.isBefore](#validatorsisbefore)|Check if it is an before date.|
|[validators.isBoolean](#validatorsisboolean)|Check if it is a boolean value.|
|[validators.isDataURI](#validatorsisdatauri)|Check if the data URI format.|
|[validators.isDate](#validatorsisdate)|Check if it is a date (e.g., 2023-09-04, 2023/9/4).|
|[validators.isDecimal](#validatorsisdecimal)|Check if it is a decimal number. For example, 0.1, 0.3, 1.1, 1.00003, 4.0.|
|[validators.isEmail](#validatorsisemail)|Check if it is an email address.|
|[validators.isEmpty](#validatorsisempty)|Checks if the length of the string is zero. undefined,null,[],NaN, and false are considered empty.|
|[validators.isFloat](#validatorsisfloat)|Check if float.|
|[validators.isFQDN](#validatorsisfqdn)|Check if the domain name is fully qualified (e.g. domain.com).|
|[validators.isFQDNorIP](#validatorsisfqdnorip)|Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).|
|[validators.isHash](#validatorsishash)|Check if it is a hash of the specified algorithm.|
|[validators.isHexadecimal](#validatorsishexadecimal)|Check if it is a hexadecimal number.|
|[validators.isHexColor](#validatorsishexcolor)|Check if it is a hexadecimal color code.|
|[validators.isHSL](#validatorsishsl)|Check if the color is an HSL color based on the CSS Colors Level 4 specification.<br>Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).|
|[validators.isIn](#validatorsisin)|Check if the input value is in an array value, string, or object key.|
|[validators.isInt](#validatorsisint)|Check if it is an integer.|
|[validators.isIP](#validatorsisip)|Check for IP (version 4 or 6).|
|[validators.isJSON](#validatorsisjson)|Check for valid JSON (using JSON.parse).|
|[validators.isJWT](#validatorsisjwt)|Check if it is a valid JWT token.|
|[validators.isLength](#validatorsislength)|Check if the length of the string is within the range.|
|[validators.isLowercase](#validatorsislowercase)|Check for lowercase letters.|
|[validators.isNumeric](#validatorsisnumeric)|Check if it contains only numbers.|
|[validators.isPort](#validatorsisport)|Check if it is a port number.|
|[validators.isRGBColor](#validatorsisrgbcolor)|Check if it is an RGB or RGBA color code.|
|[validators.isUppercase](#validatorsisuppercase)|Check for uppercase letters.|
|[validators.isURL](#validatorsisurl)|Check if it is a URL.|
|[validators.isUUID](#validatorsisuuid)|Check if it is a UUID (version 1, 2, 3, 4, or 5).|

### `File.basename()`
Get the file name from the path.

```js
const {File} = require('nodejs-shared');

File.basename('/tmp/sample.txt');// =>sample
File.basename('/tmp/sample.txt', true);// =>sample.txt
```

#### Parameters
- {string} <code>filePath</code> File Path.
- {boolean} <code>withExtension</code> True if you want to include the extension, false if you don't. Default is false.

#### Return value
{string} File Name.

### `File.chmod()`
Change permissions.

```js
const {File} = require('nodejs-shared');

File.chmod('sample.txt', 0o755);
```
#### Parameters
- {string} <code>path</code> File or directory path.
- {number} <code>permission</code> Permissions. Default is 0o755.

#### Return value
{File}

### `File.makeTmpDirectory()`
Create a temporary directory.  
If the `TMPDIR` environment variable is present, the directory set in the `TMPDIR` environment variable is used as the tmp directory.

```js
const {File} = require('nodejs-shared');

File.makeTmpDirectory();// =>/tmp/3msbsb19l6c0a8pi/
```

#### Return value
{string} Temporary directory path.

### `File.makeDirectory()`
Make a directory.

```js
const {File} = require('nodejs-shared');

File.makeDirectory('sample');
```

#### Parameters
- {string} <code>dirPath</code> Directory path.
- {number} <code>permission</code> Directory permissions. Default is 0o755.

#### Return value
{File}

### `File.existsFile()`
Check if the file or directory exists.

```js
const {File} = require('nodejs-shared');

if (File.existsFile('sample.txt'))
    console.log('File found');
```

#### Parameters
- {string} <code>path</code> File or directory path.

#### Return value
{boolean} True if the file or directory exists.

### `File.deleteFile()`
Delete the file.

```js
const {File} = require('nodejs-shared');

File.deleteFile('sample.txt');
```

#### Parameters
- {string} <code>filePath</code> File Path.

### `File.deleteDirectory()`
Delete the directory.

```js
const {File} = require('nodejs-shared');

File.deleteDirectory('sample');
```

#### Parameters
- {string} <code>dirPath</code> Directory path.

### `File.write()`
Write a file

```js
const {File} = require('nodejs-shared');

File.write('sample.txt', 'Hello World');
```

#### Parameters
- {string} <code>filePath</code> File Path.
- {string} <code>content</code> The contents of the file. Default is an empty string.
- {fs.BaseEncodingOptions|string|undefined} <code>options</code> Writing options. Default is undefined.
- {number} <code>permission</code> File permissions. Default is 0o755.

#### Return value
{File}

### `File.readAsString()`
Get the contents of a file as a string.

```js
const {File} = require('nodejs-shared');

const content = File.readAsString('sample.txt');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{string} The contents of the file.

### `File.readAsJson()`
Get the contents of a JSON file as an object.

```js
const {File} = require('nodejs-shared');

const object = File.readAsJson('sample.json');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{object} An object generated from JSON.

### `File.readAsDataUrl()`
Get the contents of the media file as a data URL string.

```js
const {File} = require('nodejs-shared');

const dataUrl = File.readAsDataUrl('sample.jpg');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{string} Data URL.

### `File.readAsBase64()`
Get the contents of a media file as a base64 string.

```js
const {File} = require('nodejs-shared');

const b64 = File.readAsBase64('sample.jpg');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{string} Base 64 strings.

### `File.getStat()`
Get file information.

```js
const {File} = require('nodejs-shared');

File.getStat('sample.txt');
// => {
//   dev: 66305,
//   mode: 33261,
//   nlink: 1,
//   uid: 1000,
//   gid: 1000,
//   rdev: 0,
//   blksize: 4096,
//   ino: 71552737,
//   size: 19,
//   blocks: 8,
//   atimeMs: 1659435841498.44,
//   mtimeMs: 1659435841502.4402,
//   ctimeMs: 1659435841502.4402,
//   birthtimeMs: 1659435841498.44,
//   atime: 2022-08-02T10:24:01.498Z,
//   mtime: 2022-08-02T10:24:01.502Z,
//   ctime: 2022-08-02T10:24:01.502Z,
//   birthtime: 2022-08-02T10:24:01.498Z
// }
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{object} File information object.

### `File.getFilemtime()`
Get file modification time in unix time.

```js
const {File} = require('nodejs-shared');

const modifyTime - File.getFilemtime('sample.txt');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{number} Last modified unix time of the file.

### `File.getExtension()`
Get the file extension.

```js
const {File} = require('nodejs-shared');

File.getExtension('sample.txt');// =>txt
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{string|undefined} File extension.

### `File.find()`
Find files that match the file name or path pattern.

```js
const {File} = require('nodejs-shared');

// Find all files.
let found = File.find(`dir/*.*`);
console.log(found);
// [
//   '/var/dir/1.png',
//   '/var/dir/2.png',
//   '/var/dir/3.svg',
//   '/var/dir/4.jpg'
// ]

// Find all files, including subdirectories.
found = File.find(`dir/**/*.*`);
console.log(found);
// [
//   '/var/dir/subdirectory/sample5.png',
//   '/var/dir/1.png',
//   '/var/dir/2.png',
//   '/var/dir/3.svg',
//   '/var/dir/4.jpg'
// ]

// Find only files with specific extensions.
found = File.find(`dir/**/*.png`);
console.log(found);
// [
//   '/var/dir/subdirectory/sample5.png',
//   '/var/dir/1.png',
//   '/var/dir/2.png'
// ]

// Find only JPG and PNG.
found = File.find(`dir/**/*.+(png|jpg)`);
console.log(found);
// [
//   '/var/dir/subdirectory/sample5.png',
//   '/var/dir/1.png',
//   '/var/dir/2.png',
//   '/var/dir/4.jpg'
// ]
```

#### Parameters
- {string} <code>pattern</code> File pattern to find.
- {glob.IOptions} <code>options</code> Options to find. Default is undefined

#### Return value
{string[]} Absolute path list of files found.

### `File.getTmpDirectory()`
Get path to temporary directory.  
If the `TMPDIR` environment variable is present, the directory set in the `TMPDIR` environment variable is used as the tmp directory. (The trailing slash is automatically removed).

```js
const {File} = require('nodejs-shared');

File.getTmpDirectory();// =>/tmp
```

#### Return value
{string} Temporary directory path.

### `File.getTmpPath()`
Get temporary file path.  
If the `TMPDIR` environment variable is present, the directory set in the `TMPDIR` environment variable is used as the tmp directory.

```js
const {File} = require('nodejs-shared');

File.getTmpPath();// =>/tmp/5tbwc2gskck789pt

// If you want to specify an extension.
File.getTmpPath('txt');// =>/tmp/5tbwc2gskck78srx.txt
```

#### Parameters
- {string} <code>extension</code> Extension to be given to temporary files. Default is none.

#### Return value
{string} Temporary file path.

### `File.isFile()`
Check if it is a file.

```js
const {File} = require('nodejs-shared');

if (File.isFile('sample.txt'))
    console.log('This is a file, not a directory');
```

#### Parameters
- {string} <code>filePath</code> File Path.

#### Return value
{boolean} True if the file is a file.

### `File.rename()`
Rename a file or directory.

```js
const {File} = require('nodejs-shared');

File.rename('old.txt', 'new.txt');
```

#### Parameters
- {string} <code>srcPath</code> Original file path.
- {string} <code>dstPath</code> The destination file path.

### `File.isBase64()`
Check if it is a base64 string.

```js
const {File} = require('nodejs-shared');

if (File.isBase64('iVBORw0KGgoAAAANSUhE'))
    console.log('This is a base64 string');
```

#### Parameters
- {string} <code>str</code> String.

#### Return value
{boolean} True if base64.

### `File.isDirectory()`
Check if the path is a directory.

```js
const {File} = require('nodejs-shared');

if (File.isDirectory('/tmp/mydir'))
    console.log('This is a directory');
```

#### Parameters
- {string} <code>inputPath</code> The path of a file or directory.

#### Return value
{boolean} True if the input path is a directory, false otherwise.

### `File.copyDirectory()`
Copy a file or directory. The directory can have contents.

```js
const {File} = require('nodejs-shared');

File.copyDirectory('/tmp/mydir', '/tmp/newdir');
```

#### Parameters
- {string} <code>srcDir</code> The directory from which the copy was made.
- {string} <code>dstDir</code> The destination directory.

#### Return value
Promise&lt;void&gt;

### `File.isPath()`
Check if it is valid as a file system path.

```js
const {File} = require('nodejs-shared');

File.isPath('.');               // true
File.isPath('aa');              // true
File.isPath('abc.js');          // true
File.isPath('/abc/def/ghi.js'); // true
File.isPath('abc/def/ghi.js');  // true
File.isPath('*.js');            // false
File.isPath('!*.js');           // false
File.isPath('!foo');            // false
File.isPath('!foo.js');         // false
File.isPath('**/abc.js');       // false
File.isPath('abc/*.js');        // false
```

#### Parameters
- {string} <code>str</code> String.

#### Return value
boolean

### `Media.writeDataUrlToFile()`
Write data URL to a file.  
If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.  
This method returns the path to the written file.

```js
const {Media} = require('nodejs-shared');

// Writes DataURL to a file with the specified extension.
Media.writeDataUrlToFile('sample.png', 'data:image/png;base64,...');

// Writes DataURL to files with extensions detected automatically.
Media.writeDataUrlToFile('sample', 'data:image/png;base64,...');

// Writes DataURL to files with extensions detected automatically.
Media.writeDataUrlToFile('sample', 'data:image/svg+xml;utf8,...');
```

#### Parameters
- {string} <code>outputPath</code> Output file path.
- {string} <code>dataUrl</code> Data URL.
- {number} <code>permission</code> File permissions. Default is 0o755.

#### Return value
{string} Path of the written file.

### `Media.dataUrlToBase64()`
Convert data URL to blob data in base64 format.

```js
const {Media} = require('nodejs-shared');

const b64 = Media.dataUrlToBase64('data:image/jpeg;base64,...');
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{string|null} Base 64 strings.

### `Media.isDataUrl()`
Check if the string is in data URL format.

```js
const {Media} = require('nodejs-shared');
if (Media.isDataUrl('data:image/jpeg;base64,...'))
    console.log('This is a data URL');
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{boolean} True if it is a data URL.

### `Media.statDataUrl()`
Get the MIME type and base64 from the data URL string.

```js
const {Media} = require('nodejs-shared');

Media.statDataUrl('data:image/jpeg;base64,...'); // =>{blob: '/9j/4AAQSk...', type: 'jpeg', extension: 'jpg'}
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{{blob: string, type: string, extension: string|null}|null} Data URL Analysis Results.

### `Media.getDimensions()`
Get the dimensions (pixels) of the image.

```js
const {Media} = require('nodejs-shared');

Media.getDimensions('sample.jpg');// =>{width: 960, height: 640}
```

#### Parameters
- {string} <code>filePath</code> Image file path.

#### Return value
{{width: number, height: number }|null} Width and height (in pixels) of the image.

### `Media.crop()`
Crop from image.

```js
const {Media} = require('nodejs-shared');

Media.crop('sample.jpg', 'result.jpg', {left: 0, top: 0, width: 100, height: 100});
```

#### Parameters
- {string} <code>inputPath</code> Original image file path.
- {string} <code>outputPath</code> Image path after cropping.
- {number} <code>options.left</code> x-coordinate position (pixels) to crop.
- {number} <code>options.top</code> y-coordinate position to crop to (in pixels).
- {number} <code>options.width</code> Width to crop (pixels).
- {number} <code>options.height</code> The height (in pixels) to crop.

#### Return value
Promise&lt;void&gt;

### `Media.resize()`
Resize image.  
If the output option is omitted, the original image is overwritten.

```js
const {Media} = require('nodejs-shared');

// Resize to 100px wide without changing the aspect ratio.
Media.resize('sample.jpg', {width: 100});

// Resize to 100px in height without changing the aspect ratio.
Media.resize('sample.jpg', {height: 100});

// Resize the width and height to 100px without changing the aspect ratio.
Media.resize('sample.jpg', {width: 100, height: 100});

// Resizes the width and height to 100px without changing the aspect ratio. (Container)
Media.resize('sample.jpg', {width: 100, height: 100, contain: true});

// Use the output option to write the results to a separate file.
Media.resize('sample.jpg', {output: 'result.jpg', width: 100});
```

#### Parameters
- {string} <code>inputPath</code> The image file path from which to resize.
- {number} <code>options.width</code> Width after resizing.
- {number} <code>options.height</code> Height after resizing.
- {number} <code>options.output</code> Image file path after resizing. The default is none, which will overwrite the original image.
- {boolean} <code>options.contain</code> If true, resizes the image so that the entire original image is visible. If false, it is stretched to fit the height or width and cropped to fill the area. Default is false.

#### Return value
Promise&lt;void&gt;

### `Media.dataUrlByteSize()`
Get the byte size of data URL.  

x = (n * (3/4)) - y  
Where:  
1. x is the size of a file in bytes  
1. n is the length of the Base64 String  
1. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.  

```js
const {File, Media} = require('nodejs-shared');

const dataUrl = File.readAsDataUrl('sample.jpg');
Media.dataUrlByteSize(dataUrl);
// =>30141

// Check the actual file size.
// $ du -b sample.jpg
// 30141   sample.jpg
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{number} Byte Size.

### `Media.base64ByteSize()`
Get base64 byte size.

x = (n * (3/4)) - y  
Where:  
1. x is the size of a file in bytes  
2. n is the length of the Base64 String  
3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.  

```js
const {File, Media} = require('nodejs-shared');
const b64 = File.readAsBase64('sample.jpg');
Media.base64ByteSize(b64);
// =>30141

// Check the actual file size.
// $ du -b sample.jpg
// 30141   sample.jpg
```

#### Parameters
- {string} <code>b64</code> Base 64 strings.

#### Return value
{number} Byte Size.

### `Media.getMimeTypeFromDataUrl()`
Get Mime type from data URL.

```js
const {Media} = require('nodejs-shared');

// Get the Mime type of the PNG image data URL.
let mimeType = Media.getMimeTypeFromDataUrl('data:image/png;base64,...');
console.log(mimeType);// =>Mime type of PNG image data URL: image/png

// Get the Mime type of SVG image data URL.
mimeType = Media.getMimeTypeFromDataUrl('data:image/svg+xml;utf8,...');
console.log(mimeType);// =>Mime type of SVG image data URL: image/svg+xml
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{string|null} Mime Type.

### `Media.getExtensionFromDataUrl()`
Get extension from data URL.

```js
const {Media} = require('nodejs-shared');

// Get PNG image extension.
let extension = Media.getExtensionFromDataUrl('data:image/png;base64,...');
console.log(extension);// =>png

// Get JPG image extension.
extension = Media.getExtensionFromDataUrl('data:image/jpeg;base64,...');
console.log(extension);// =>jpg

// Get SVG image extension.
extension = Media.getExtensionFromDataUrl('data:image/svg+xml;utf8,...');
console.log(extension);// =>svg
```

#### Parameters
- {string} <code>dataUrl</code> Data URL.

#### Return value
{string|null} File extension.

### `Media.mergeImages()`
Merge images.

Merge vertically:  
<img src="screencaps/merge-images-vertically.png" width="300">

Merge horizontally:  
<img src="screencaps/merge-images-horizontally.png" width="300">

Set 30px margins between images to merge vertically:  
<img src="screencaps/merge-images-vertically-with-margins.png" width="300">

```js
const {Media} = require('nodejs-shared');

const imgs = ['1.png', '2.png', '3.png'];

// Merge vertically.
await Media.mergeImages(imgs, 'merged.png', {direction: 'vertical'});

// Merge horizontally.
await Media.mergeImages(imgs, 'merged.png', {direction: 'horizontal'});

// Set 30px margins between images to merge vertically.
await Media.mergeImages(imgs, 'merged.png', {direction: 'vertical', offset: 30});

// Set 30px margins between images to merge horizontally.
await Media.mergeImages(imgs, 'merged.png', {direction: 'horizontal', offset: 30});
```

#### Parameters
- {string[]} <code>inputPaths</code> Path list of image files to merge.
- {string} <code>outputPath</code> File path of the merged image.
- {'vertical'|'horizontal'} <code>options.direction</code> Direction of the merged image.
- {string|{r: number, g: number, b: number, alpha: number}} <code>options.color</code>  
    Default background color represented by RGBA hex value.  
    Default is {alpha: 1., b: 0, g: 0, r: 0}.
- {'start'|'center'|'end'|'start'} <code>options.align</code>  
    Aligning of given images.  
    If the images are not all the same size, images will be sorted to largest image.  
    Possible values are start, center and end.  
    Default is start.
- {number} <code>offset</code> Offset in pixels between each image. Default is 0.
- {number|string|{top: number, right: number, bottom: number, left: number}} <code>options.margin</code>  
    Margin of the result image.
    If Number or String is passed, it will be considered as standard css shorthand properties (e.g. '40 40 0 10').
    An Object entry can have following options:
    - top Number (optional): Margin on top side of result image. Default is 0.
    - right Number (optional): Margin on right side of result image. Default is 0.
    - bottom Number (optional): Margin on bottom side of result image. Default is 0.
    - left Number (optional): Margin on left side of result image. Default is 0.

#### Return value
Promise&lt;void&gt;

### `Media.extractFirstFrameOfGif()`
Extract and save the first frame of the animated GIF.

```js
const {Media} = require('nodejs-shared');

// Write the first frame of sample.gif to first-frame.gif.
await Media.extractFirstFrameOfGif('sample.gif', 'first-frame.gif');

// Overwrite sample.gif with the first frame.
await Media.extractFirstFrameOfGif('sample.gif');

// Extract the first frame from the GIF Data URL and save it to an image file.
await Media.extractFirstFrameOfGif('data:image/gif;base64,...', 'first-frame.gif');
```

#### Parameters
- {string} <code>inputPathOrDataUrl</code> Path or Data URL of the input image.
- {string} <code>output</code> Output image path.  
    If not specified, the first frame image is overwritten in the original file.

#### Return value
Promise&lt;void&gt;

### `Media.getNumberOfGifFrames()`
Get the number of GIF frames.

```js
const {Media} = require('nodejs-shared');

// Get the number of frames from a GIF image file.
let numberOfFrames = await Media.getNumberOfGifFrames('sample.gif');

// Get the number of frames from the GIF Data URL.
numberOfFrames = await Media.getNumberOfGifFrames('data:image/gif;base64,...');
```

#### Parameters
- {string} <code>inputPathOrDataUrl</code> Path or Data URL of the input image.

#### Return value
{Promise&lt;number|null&gt;} Number of frames in the image.

### `Media.convertImageFormat()`
Convert Between Image Formats.

```js
const {Media} = require('nodejs-shared');

// Get the data URL of the converted image format.
const dataUrl1 = await Media.convertImageFormat('input.png');

// In addition to obtaining the data URL, further write the converted image format in the file.
const dataUrl2 = await Media.convertImageFormat('input.png', 'output.jpg');
```

#### Parameters
- {string} <code>inputPathOrDataUrl</code> Path or Data URL of the input image.
- {string} <code>outputPath?</code> Allows you to specify the output path for converted images. The default is undefined.
- {&#039;bmp2&#039;|&#039;bmp3&#039;|&#039;bmp4&#039;} <code>options.bmpVersion?</code> Version of BMP to output.  
    If the output is not BPM, this option is ignored.  
    Default is 'bmp3'.
- {boolean} <code>options.trueColor?</code> Set to true if 24-bit color is used for output BMP. Default is true.
- {number} <code>options.margin?</code> The size of the top, bottom, left, and right margins to be added to the original image.  
    Unit is in pixels.  
    The default is none (undefined).
- {string} <code>options.background?</code> The background color of the margin.  
    This option is ignored if the margin option is absent.  
    Default is white.

#### Return value
{Promise&lt;string&gt;} The data URL of the image whose format was converted.

### `Reflect.getStaticMethods()`
Find static methods from the class.

```js
const {Reflect} = require('nodejs-shared');

class Sample {
    static func1 () {}
    static func2 () {}
    func3 () {}
}
Reflect.getStaticMethods(Sample);
// =>Set(2) { 'func1', 'func2' }
```

#### Parameters
- {any} <code>clazz</code> Class.

#### Return value
{Set<string>} Static method name list.

### `Reflect.getMethods()`
Find a method from an instance.

```js
const {Reflect} = require('nodejs-shared');

class Sample {
    static func1 () {}
    static func2 () {}
    func3 () {}
}
Reflect.getMethods(new Sample);
// =>Set(2) { 'constructor', 'func3' }
```

#### Parameters
- {any} <code>instance</code> Class instance.

#### Return value
{Set<string>} Instance method name list.

### `Regex.escape()`
Escapes the `RegExp` special characters &quot;^&quot;, &quot;$&quot;, &quot;\&quot;, &quot;.&quot;, &quot;*&quot;, &quot;+&quot;, &quot;?&quot;, &quot;(&quot;, &quot;)&quot;, &quot;[&quot;, &quot;]&quot;, &quot;{&quot;, &quot;}&quot;, &quot;|&quot; in `string`.

```js
const {Regex} = require('nodejs-shared');

// Escape special characters in RegExp.
Regex.escape('//sample.com/?tag=typescript');// =>//example\\.jp/\\?tag=typescript

// When using your own wildcard, you can follow the metacharacters with the regular expression wildcard.
const strRegex = Regex.escape('//sample.com?tag=*', { '*': '.*?' });
const regex = new RegExp(strRegex);
regex.test('//sample.com?tag=typescript');// =>true
regex.test('//sample.com?tag=javascript');// =>true
regex.test('//sample.com?name=javascript');// =>false
```

#### Parameters
- {string} <code>str</code> String.
- {{[key: string]: string}} <code>replace?</code> Custom replacement characters. The default is none (undefined).

#### Return value
{string} Escaped string.

### `Browser.parse()`
Analyze browser information from UA.

```js
const {Browser} = require('nodejs-shared');

Browser.parse('Mozilla/5.0 (Linux; Android 9; Lenovo TB-8505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36');
// =>{
//   platform: 'mobile',
//   osName: 'Android',
//   osVersion: 9,
//   browserName: 'Chrome'
// }

Browser.parse('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
// =>{
//   platform: 'tablet',
//   osName: 'iOS',
//   osVersion: 12.2,
//   browserName: 'Safari'
// }

Browser.parse('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; YTB730; GTB7.3; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30618; .NET4.0C)');
// =>{
//   platform: 'desktop',
//   osName: 'Windows NT',
//   osVersion: 6,
//   browserName: 'Internet Explorer'
// }
```

#### Parameters
- {string} <code>ua</code> User agent string.

#### Return value
{{platform: string, osName: string, osVersion: number|null, browserName: string}} Analysis Results.

### `validators.isFQDN()`
Check if the domain name is fully qualified (e.g. domain.com).

```js
const {validators} = require('nodejs-shared');

validators.isFQDN('domain.com');
validators.isFQDN('localhost', {requireFQDNTld: false});
validators.isFQDN('*.example.com', {allowFQDNWildcard: true});
validators.isFQDN('*.shop.example.com', {allowFQDNWildcard: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.requireFQDNTld?</code> If true, the TLD is required. Default is true.
- {boolean} <code>options.allowFQDNWildcard?</code> If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isFQDNorIP()`
Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).

```js
const {validators} = require('nodejs-shared');

validators.isFQDNorIP('domain.com');
validators.isFQDNorIP('1.2.3.4');
validators.isFQDNorIP('2001:db8:3:4::192.0.2.33');
validators.isFQDNorIP('1.2.3.4', {ipVersion: 4});
validators.isFQDNorIP('fe80::a6db:30ff:fe98:e946', {ipVersion: 6});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.requireFQDNTld?</code> If true, the TLD is required. Default is true.
- {boolean} <code>options.allowFQDNWildcard?</code> If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
- {'4'|'6'|4|6} <code>options.ipVersion?</code> 4 or 6. The default is undefind (allows both versions 4 and 6).
- {boolean} <code>options.allowIPRange?</code> If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isHash()`
Check if it is a hash of the specified algorithm.

```js
const {validators} = require('nodejs-shared');

validators.isHash('d94f3f016ae679c3008de268209132f2', 'md5');
validators.isHash('d94f3f016ae679c3008de268209132f2', 'md4');
validators.isHash('d94f3f016ae679c3008de268209132f2', 'ripemd128');
validators.isHash('d94f3f016ae679c3008de268209132f2', 'tiger128');
validators.isHash('d94f3f01', 'crc32');
validators.isHash('d94f3f01', 'crc32b');
validators.isHash('3ca25ae354e192b26879f651a51d92aa8a34d8d3', 'sha1');
validators.isHash('3ca25ae354e192b26879f651a51d92aa8a34d8d3', 'tiger160');
validators.isHash('3ca25ae354e192b26879f651a51d92aa8a34d8d3', 'ripemd160');
validators.isHash('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', 'sha256');
validators.isHash('6281a1f098c5e7290927ed09150d43ff3990a0fe1a48267c', 'tiger192');
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {'md4'|'md5'|'sha1'|'sha256'|'sha384'|'sha512'|'ripemd128'|'ripemd160'|'tiger128'|'tiger160'|'tiger192'|'crc32'|'crc32b'} <code>algorithm</code> Hash algorithm.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isAfter()`
Check if it is an after date.

```js
const {validators} = require('nodejs-shared');

validators.isAfter('2023-09-04', '2023-09-03');
validators.isAfter('2023-09-04', new Date(2023, 8, 3).toString());
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {string} <code>comparisonDate?</code> Date to compare to. Defaults to Date().toString() (now).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isAlpha()`
Check if it is alphabetical (a-zA-Z).

```js
const {validators} = require('nodejs-shared');

validators.isAlpha('abc');
validators.isAlpha('en-US', {ignore: '- /'});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {string|RegExp} <code>options.ignore?</code> String to ignore, or RegExp, e.g. if the option is "-" then spaces and hyphens in the input value will not cause an input error.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isAlphanumeric()`
Check if alphanumeric (a-zA-Z0-9).

```js
const {validators} = require('nodejs-shared');

validators.isAlphanumeric('abc123');
validators.isAlphanumeric('Hello@123', {ignore: '@_- '});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {string|RegExp} <code>options.ignore?</code> String to ignore, or RegExp, e.g. if the option is "-" then spaces and hyphens in the input value will not cause an input error.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isBefore()`
Check if it is an before date.

```js
const {validators} = require('nodejs-shared');

validators.isBefore('2023-09-04', '2023-09-05');
validators.isBefore('2023-09-04', new Date(2023, 8, 5).toString());
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {string} <code>comparisonDate?</code> Date to compare to. Defaults to Date().toString() (now).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isBoolean()`
Check if it is a boolean value.

```js
const {validators} = require('nodejs-shared');

validators.isBoolean('true');
validators.isBoolean('false');
validators.isBoolean('0');
validators.isBoolean('1');
validators.isBoolean('True', {loose: true});
validators.isBoolean('TRUE', {loose: true});
validators.isBoolean('False', {loose: true});
validators.isBoolean('FALSE', {loose: true});
validators.isBoolean('yes', {loose: true});
validators.isBoolean('Yes', {loose: true});
validators.isBoolean('YES', {loose: true});
validators.isBoolean('no', {loose: true});
validators.isBoolean('No', {loose: true});
validators.isBoolean('NO', {loose: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>loose</code>  
    If false, the validator will strictly match ['true', 'false', '0', '1'].  
    If true, the validator will also match 'yes', 'no', and will match a valid boolean string of any case. (e.g.: ['true', 'True', 'TRUE']).  
    Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isDataURI()`
Check if the data URI format.

```js
const {validators} = require('nodejs-shared');

validators.isDataURI('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC');
validators.isDataURI(' data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isDate()`
Check if it is a date (e.g., 2023-09-04, 2023/9/4).

```js
const {validators} = require('nodejs-shared');

validators.isDate();

validators.isDate(new Date());
validators.isDate(new Date([2014, 2, 15]));
validators.isDate(new Date('2014-03-15'));
validators.isDate('2020/02/29');
validators.isDate('15-07-2002', {format: 'DD/MM/YYYY'});
validators.isDate('2020/01/15', {strictMode: true});
validators.isDate('2020 02 29', {delimiters: ['/', ' ']});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {string} <code>options.format?</code> Date Format. Defaults to YYYY/MM/DD.
- {boolean} <code>options.strictMode?</code> If set to true, the validator will reject input that differs from the format. Default is false.
- {string[]} <code>options.delimiters?</code> An array of available date separators. Default is ['/', '-'].

#### Return value
{boolean} True for pass, false for fail.

### `validators.isDecimal()`
Check if it is a decimal number. For example, 0.1, 0.3, 1.1, 1.00003, 4.0.

```js
const {validators} = require('nodejs-shared');

validators.isDecimal('123');
validators.isDecimal('00123');
validators.isDecimal('-00123');
validators.isDecimal('+123');
validators.isDecimal('0.01');
validators.isDecimal('.1');
validators.isDecimal('1.0');
validators.isDecimal('-.25');
validators.isDecimal('0.01', {forceDecimal: true});
validators.isDecimal('123', {decimalDigits: '2,3'});
validators.isDecimal('0.01', {decimalDigits: '2,3'});
validators.isDecimal('1.043', {decimalDigits: '2,3'});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.forceDecimal?</code> If true, the decimal point is required. Default is false.
- {string} <code>options.decimalDigits?</code> The number of digits after the decimal point. Can be a range, such as "1,3", a specific value, such as "3", or a minimum value, such as "1,". Default is "1,".

#### Return value
{boolean} True for pass, false for fail.

### `validators.isEmail()`
Check if it is an email address.

```js
const {validators} = require('nodejs-shared');

validators.isEmail('foo@bar.com', {});
validators.isEmail('hans@m端ller.com', {allowUtf8LocalPart: false});
validators.isEmail('Some Name <foo@bar.com>', {allowDisplayName: true});
validators.isEmail('Some Name <foo@bar.com>', {requireDisplayName: true});
validators.isEmail('email@foo.gmail.com', {hostBlacklist: validators.isEmail('gmail.com', 'foo.bar.com']});
validators.isEmail('email@gmail.com', {hostWhitelist: ['gmail.com', 'foo.bar.com']});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.allowDisplayName?</code> If true, the validator will also match Display Name <email-address>. Default is false.
- {boolean} <code>options.requireDisplayName?</code> If true, the validator will reject strings without the format Display Name <email-address>. Default is false.
- {boolean} <code>options.allowUtf8LocalPart?</code> If false, the validator will not allow any non-English UTF8 character in email address' local part. Default is true.
- {boolean} <code>options.requireTld?</code> If false, email addresses without a TLD in their domain will also be matched. Default is true.
- {string[]} <code>options.hostBlacklist?</code> If the domain of the input is contained in an array, the validation fails. The default is none (empty array).
- {string[]} <code>options.hostWhitelist?</code> If the domain of the input is not contained in the array, the validation fails. The default is none (empty array).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isEmpty()`
Checks if the length of the string is zero. undefined,null,[],NaN, and false are considered empty.

```js
const {validators} = require('nodejs-shared');

validators.isEmpty('');
validators.isEmpty(undefined);
validators.isEmpty(null);
validators.isEmpty([]);
validators.isEmpty(NaN);
validators.isEmpty(' ', {ignoreWhitespace: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.ignoreWhitespace?</code> If true, whitespace before or after the string is ignored. Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isFloat()`
Check if float.

```js
const {validators} = require('nodejs-shared');

validators.isFloat('123');
validators.isFloat('123.');
validators.isFloat('123.123');
validators.isFloat('-123.123');
validators.isFloat('+0.123');
validators.isFloat('0.123');
validators.isFloat('.0');
validators.isFloat('-.123');
validators.isFloat('+.123');
validators.isFloat('01.123');
validators.isFloat('-0.22250738585072011e-307');
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {number} <code>options.min?</code> To check the integer min boundary. The default is none (undefined).
- {number} <code>options.max?</code> To check the integer max boundary. The default is none (undefined).
- {number} <code>options.lt?</code> Enforce integers being greater than the value provided. The default is none (undefined).
- {number} <code>options.gt?</code> Enforce integers being less than the value provided. The default is none (undefined).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isHexadecimal()`
Check if it is a hexadecimal number.

```js
const {validators} = require('nodejs-shared');

validators.isHexadecimal('ff0044');
validators.isHexadecimal('0xff0044');
validators.isHexadecimal('0x0123456789abcDEF');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isHexColor()`
Check if it is a hexadecimal color code.

```js
const {validators} = require('nodejs-shared');
validators.isHexColor('#ff0000ff');
validators.isHexColor('#ff0034');
validators.isHexColor('0f38');
validators.isHexColor('fff');
validators.isHexColor('#f00');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isHSL()`
Check if the color is an HSL color based on the CSS Colors Level 4 specification.  
Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).

```js
const {validators} = require('nodejs-shared');

validators.isHSL('hsL(0, 0%, 0%)');
validators.isHSL('hSl(  360  , 100%  , 100%   )');
validators.isHSL('hsl(270deg, 60%, 70%)');
validators.isHSL('hsl(-540.5turn, 03%, 4%, 500)');
validators.isHSL('hsl(4.71239rad, 60%, 70%)');
validators.isHSL('hsl(200, +.1e-9%, 62e10%, 1)');
validators.isHSL('hsl(270 60% 50% / .15)');
validators.isHSL('hsl(270 60% 50% / 15%)');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isIn()`
Check if the input value is in an array value, string, or object key.

```js
const {validators} = require('nodejs-shared');

validators.isIn(['foo', 'foobar');
validators.isIn(['foobar', 'foobar');
validators.isIn(['foo', ['foo', 'bar']);
validators.isIn(['1', ['1', '2', '3']);
validators.isIn(['foo', {foo: 1, bar: 2, foobar: 3});
validators.isIn(['1', {1: 3, 2: 0, 3: 1});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {any[]|string|object} <code>values</code> Allowed values.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isInt()`
Check if it is an integer.

```js
const {validators} = require('nodejs-shared');

validators.isInt('123', {});
validators.isInt('0', {});
validators.isInt('-0', {});
validators.isInt('+1', {});
validators.isInt('01', {allowLeadingZeroes: true});
validators.isInt('-01', {allowLeadingZeroes: true});
validators.isInt('000', {allowLeadingZeroes: true});
validators.isInt('-000', {allowLeadingZeroes: true});
validators.isInt('+000', {allowLeadingZeroes: true});
validators.isInt('15', {min: 10});
validators.isInt('11', {min: 10, max: 15});
validators.isInt('14', {gt: 10, lt: 15});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {number} <code>options.min?</code> To check the integer min boundary. The default is none (undefined).
- {number} <code>options.max?</code> To check the integer max boundary. The default is none (undefined).
- {boolean} <code>options.allowLeadingZeroes?</code> If false, integers containing leading zeros are not permitted. Default is false.
- {number} <code>options.lt?</code> Enforce integers being greater than the value provided. The default is none (undefined).
- {number} <code>options.gt?</code> Enforce integers being less than the value provided. The default is none (undefined).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isIP()`
Check for IP (version 4 or 6).

```js
const {validators} = require('nodejs-shared');

validators.isIP('1.2.3.4');
validators.isIP('2001:db8:0000:1:1:1:1:1');
validators.isIP('1.2.3.4', {ipVersion: 4});
validators.isIP('2001:db8:0000:1:1:1:1:1', {ipVersion: 6});
validators.isIP('1.2.3.4/1', {allowIPRange: true});
validators.isIP('2001:800::/128', {allowIPRange: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {'4'|'6'|4|6} <code>options.ipVersion?</code> 4 or 6. The default is undefind (allows both versions 4 and 6).
- {boolean} <code>options.allowIPRange?</code> If true, allow IP range input (127.0.0.1/24, 2001::/128, etc.). Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isJSON()`
Check for valid JSON (using JSON.parse).

```js
const {validators} = require('nodejs-shared');

validators.isJSON('{"key": "value"}');
validators.isJSON('{}');
validators.isJSON('{"key": "value"}', {allowPrimitives: true});
validators.isJSON('{}', {allowPrimitives: true});
validators.isJSON('null', {allowPrimitives: true});
validators.isJSON('false', {allowPrimitives: true});
validators.isJSON('true', {allowPrimitives: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.allowPrimitives?</code> If true, the primitives 'true', 'false' and 'null' are accepted as valid JSON values. Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isJWT()`
Check if it is a valid JWT token.

```js
const {validators} = require('nodejs-shared');

validators.isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI');
validators.isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb3JlbSI6Imlwc3VtIn0.ymiJSsMJXR6tMSr8G9usjQ15_8hKPDv_CArLhxw28MI');
validators.isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2xvciI6InNpdCIsImFtZXQiOlsibG9yZW0iLCJpcHN1bSJdfQ.rRpe04zbWbbJjwM43VnHzAboDzszJtGrNsUxaqQ-GQ8');
validators.isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isLength()`
Check if the length of the string is within the range.

```js
const {validators} = require('nodejs-shared');

validators.isLength('abc', {min: 2});
validators.isLength('abc', {min: 2, max: 3});
validators.isLength('干𩸽', {min: 2, max: 3});
validators.isLength('', {max: 0});
validators.isLength('👩🦰👩👩👦👦🏳️🌈', {max: 8});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {number} <code>options.min?</code> Minimum length. Default is 0.
- {number} <code>options.max?</code> Maximum length. Default is none (undefined).

#### Return value
{boolean} True for pass, false for fail.

### `validators.isLowercase()`
Check for lowercase letters.

```js
const {validators} = require('nodejs-shared');

validators.isLowercase();
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isNumeric()`
Check if it contains only numbers.

```js
const {validators} = require('nodejs-shared');

validators.isNumeric('123');
validators.isNumeric('00123');
validators.isNumeric('-00123');
validators.isNumeric('+123');
validators.isNumeric('123.123');
validators.isNumeric('123', {noSymbols: true});
validators.isNumeric('00123', {noSymbols: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.noSymbols?</code> If true, rejects numeric strings containing symbols (`+`, `-`, `. `). Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isPort()`
Check if it is a port number.

```js
const {validators} = require('nodejs-shared');

validators.isPort('8080');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isRGBColor()`
Check if it is an RGB or RGBA color code.

```js
const {validators} = require('nodejs-shared');

validators.isRGBColor('rgb(255,255,255)');
validators.isRGBColor('rgba(255,255,255,1)');
validators.isRGBColor('rgba(255,255,255,.1)');
validators.isRGBColor('rgba(255,255,255,0.1)');
validators.isRGBColor('rgb(5%,5%,5%)');
validators.isRGBColor('rgba(5%,5%,5%,.3)');
validators.isRGBColor('rgb(5,5,5)', {includePercentValues: false});
validators.isRGBColor('rgba(5,5,5,.3)', {includePercentValues: false});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.includePercentValues?</code> If true, allow percentages of rgb or rgba values, such as rgb(5%,5%,5%) or rgba(90%,90%,90%,.3). Default is true.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isUppercase()`
Check for uppercase letters.

```js
const {validators} = require('nodejs-shared');

validators.isUppercase('ABC123');
validators.isUppercase('ALL CAPS IS FUN.');
validators.isUppercase('   .');
```

#### Parameters
- {string} <code>value</code> Value to be validated.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isURL()`
Check if it is a URL.

```js
const {validators} = require('nodejs-shared');

validators.isURL('http://www.foobar.com/');
validators.isURL('https://www.foobar.com/');
validators.isURL('http://www.foobar.com:23/');
validators.isURL('http://www.foobar.com/~foobar');
validators.isURL('http://user:@www.foobar.com/');
validators.isURL('http://:pass@www.foobar.com/');
validators.isURL('http://user@www.foobar.com');
validators.isURL('http://127.0.0.1/');
validators.isURL('http://foobar.com/t$-_.+!*\()');
validators.isURL('http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html');
validators.isURL('http://[1080:0:0:0:8:800:200C:417A]/index.html');
validators.isURL('http://[3ffe:2a00:100:7031::1]');
validators.isURL('http://[::192.9.5.5]/ipng');
validators.isURL('http://[2010:836B:4179::836B:4179]');
validators.isURL('http://1337.com');
validators.isURL('http://localhost/', {requireFQDNTld: false});
validators.isURL('http://localhost/foo.txt', {requireFQDNTld: false});
validators.isURL('https://www.example.com/path', {allowFQDNWildcard: true});
validators.isURL('https://www.example.com/path/path', {allowFQDNWildcard: true});
validators.isURL('https://example.com/*', {allowFQDNWildcard: true});
validators.isURL('https://*.example.com/*', {allowFQDNWildcard: true});
validators.isURL('https://www.example.com/*', {allowFQDNWildcard: true});
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {boolean} <code>options.requireFQDNTld?</code> If true, the TLD is required. Default is true.
- {boolean} <code>options.allowFQDNWildcard?</code> If true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`). Default is false.
- {boolean} <code>options.allowFragments?</code> If true, allow fragment input. Default is false.
- {boolean} <code>options.allowQueryComponents?</code> If true, allow input of query string. Default is false.

#### Return value
{boolean} True for pass, false for fail.

### `validators.isUUID()`
Check if it is a UUID (version 1, 2, 3, 4, or 5).

```js
const {validators} = require('nodejs-shared');

validators.isUUID('A987FBC9-4BED-3078-CF07-9141BA07C9F3');
validators.isUUID('E034B584-7D89-11E9-9669-1AECF481A97B', 1);
validators.isUUID('A987FBC9-4BED-2078-CF07-9141BA07C9F3', 2);
validators.isUUID('A987FBC9-4BED-3078-CF07-9141BA07C9F3', 3);
validators.isUUID('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', 4);
validators.isUUID('987FBC97-4BED-5078-AF07-9141BA07C9F3', 5);
```

#### Parameters
- {string} <code>value</code> Value to be validated.
- {'1'|'2'|'3'|'4'|'5'|'all'|1|2|3|4|5} <code>version?</code> UUID Version. Default is all.

#### Return value
{boolean} True for pass, false for fail.

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)