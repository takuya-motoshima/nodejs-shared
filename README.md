# nodejs-shared
This is a shared module of node.js.  
Click [here](CHANGELOG.md) to see the change log.

- [nodejs-shared](#nodejs-shared)
    - [Installation](#installation)
    - [Requirements](#requirements)
    - [List of classes and methods.](#list-of-classes-and-methods)
    - [File class](#file-class)
    - [Media class](#media-class)
    - [Reflect class](#reflect-class)
    - [Regex class](#regex-class)
    - [Browser class](#browser-class)
    - [Testing](#testing)
    - [Author](#author)
    - [License](#license)

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
## List of classes and methods.
|Class|Method|Description|
|--|--|--|
|File|[.basename()](#filebasename)|Get the file name from the path.|
|File|[.chmod()](#filechmod)|Change permissions.|
|File|[.makeTmpDirectory()](#filemaketmpdirectory)|Create a temporary directory.|
|File|[.makeDirectory()](#filemakedirectory)|Make a directory.|
|File|[.existsFile()](#fileexistsfile)|Check if the file or directory exists.|
|File|[.deleteFile()](#filedeletefile)|Delete the file.|
|File|[.deleteDirectory()](#filedeletedirectory)|Delete the directory.|
|File|[.write()](#filewrite)|Write a file|
|File|[.readAsString()](#filereadasstring)|Get the contents of a file as a string.|
|File|[.readAsJson()](#filereadasjson)|Get the contents of a JSON file as an object.|
|File|[.readAsDataUrl()](#filereadasdataurl)|Get the contents of the media file as a data URL string.|
|File|[.readAsBase64()](#filereadasbase64)|Get the contents of a media file as a base64 string.|
|File|[.getStat()](#filegetstat)|Get file information.|
|File|[.getFilemtime()](#filegetfilemtime)|Get file modification time in unix time.|
|File|[.getExtension()](#filegetextension)|Get the file extension.|
|File|[.find()](#filefind)|Find files that match the file name or path pattern.|
|File|[.getTmpDirectory()](#filegettmpdirectory)|Returns the path to the new temporary directory.|
|File|[.getTmpPath()](#filegettmppath)|Returns the path to the new temporary file. No file is created.|
|File|[.isFile()](#fileisfile)|Check if it is a file.|
|File|[.rename()](#filerename)|Rename a file or directory.|
|File|[.isBase64()](#fileisbase64)|Check if it is a base64 string.|
|File|[.isDirectory()](#fileisdirectory)|Check if the path is a directory.|
|File|[.copyDirectory()](#filecopydirectory)|Copy a file or directory. The directory can have contents.|
|File|[.isPath()](#fileispath)|Check if it is valid as a file system path.|
|Media|[.writeDataUrlToFile()](#mediawritedataurltofile)|Write data URL to a file.|
|Media|[.dataUrlToBase64()](#mediadataurltobase64)|Convert data URL to blob data in base64 format.|
|Media|[.isDataUrl()](#mediaisdataurl)|Check if the string is in data URL format.|
|Media|[.statDataUrl()](#mediastatdataurl)|Get the MIME type and base64 from the data URL string.|
|Media|[.getDimensions()](#mediagetdimensions)|Get the dimensions (pixels) of the image.|
|Media|[.crop()](#mediacrop)|Crop from image.|
|Media|[.resize()](#mediaresize)|Resize the image.|
|Media|[.dataUrlByteSize()](#mediadataurlbytesize)|Get the byte size of data URL.|
|Media|[.base64ByteSize()](#mediabase64bytesize)|Get base64 byte size.|
|Media|[.getMimeTypeFromDataUrl()](#mediagetmimetypefromdataurl)|Get Mime type from data URL.|
|Media|[.getExtensionFromDataUrl()](#mediagetextensionfromdataurl)|Get extension from data URL.|
|Media|[.mergeImages()](#mediamergeimages)|Merge images.|
|Media|[.extractFirstFrameOfGif()](#mediaextractfirstframeofgif)|Extract and save the first frame of the animated GIF.|
|Media|[.getNumberOfGifFrames()](#mediagetnumberofgifframes)|Get the number of GIF frames.|
|Media|[.convertImageFormat()](#mediaconvertimageformat)|Convert Between Image Formats.|
|Reflect|[.getStaticMethods()](#reflectgetstaticmethods)|Find static methods from the class.|
|Reflect|[.getMethods()](#reflectgetmethods)|Find a method from an instance.|
|Regex|[Regex.escape()](#regexescape)|Escapes the `RegExp` special characters &quot;^&quot;, &quot;$&quot;, &quot;\&quot;, &quot;.&quot;, &quot;*&quot;, &quot;+&quot;, &quot;?&quot;, &quot;(&quot;, &quot;)&quot;, &quot;[&quot;, &quot;]&quot;, &quot;{&quot;, &quot;}&quot;, &quot;|&quot; in `string`.|
|Browser|[Browser.parse()](#browserparse)|Analyze browser information from UA.|

## File class
File utility class.
- ### File.basename()
    Get the file name from the path.

    #### Usage
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
- ### File.chmod()
    Change permissions.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.chmod('sample.txt', 0o755);
    ```

    #### Parameters
    - {string} <code>path</code> File or directory path.
    - {number} <code>permission</code> Permissions. Default is 0o755.

    #### Return value
    {File}
- ### File.makeTmpDirectory()
    Create a temporary directory.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.makeTmpDirectory();// =>/tmp/3msbsb19l6c0a8pi/
    ```

    #### Return value
    {string} Temporary directory path.
- ### File.makeDirectory()
    Make a directory.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.makeDirectory('sample');
    ```

    #### Parameters
    - {string} <code>dirPath</code> Directory path.
    - {number} <code>permission</code> Directory permissions. Default is 0o755.

    #### Return value
    {File}
- ### File.existsFile()
    Check if the file or directory exists.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    if (File.existsFile('sample.txt'))
      console.log('File found');
    ```

    #### Parameters
    - {string} <code>path</code> File or directory path.

    #### Return value
    {boolean} True if the file or directory exists.
- ### File.deleteFile()
    Delete the file.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.deleteFile('sample.txt');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.
- ### File.deleteDirectory()
    Delete the directory.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.deleteDirectory('sample');
    ```

    #### Parameters
    - {string} <code>dirPath</code> Directory path.
- ### File.write()
    Write a file

    #### Usage
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
- ### File.readAsString()
    Get the contents of a file as a string.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    const content = File.readAsString('sample.txt');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {string} The contents of the file.
- ### File.readAsJson()
    Get the contents of a JSON file as an object.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    const object = File.readAsJson('sample.json');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {object} An object generated from JSON.
- ### File.readAsDataUrl()
    Get the contents of the media file as a data URL string.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    const dataUrl = File.readAsDataUrl('sample.jpg');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {string} Data URL.
- ### File.readAsBase64()
    Get the contents of a media file as a base64 string.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    const b64 = File.readAsBase64('sample.jpg');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {string} Base 64 strings.
- ### File.getStat()
    Get file information.

    #### Usage
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
- ### File.getFilemtime()
    Get file modification time in unix time.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    const modifyTime - File.getFilemtime('sample.txt');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {number} Last modified unix time of the file.
- ### File.getExtension()
    Get the file extension.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.getExtension('sample.txt');// =>txt
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {string|undefined} File extension.
- ### File.find()
    Find files that match the file name or path pattern.

    #### Usage
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
- ### File.getTmpDirectory()
    Returns the path to the new temporary directory.  
    The directory is not created.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.getTmpDirectory();// =>/tmp
    ```

    #### Return value
    {string} Temporary directory path.
- ### File.getTmpPath()
    Returns the path to the new temporary file.  
    No file is created.

    #### Usage
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
- ### File.isFile()
    Check if it is a file.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    if (File.isFile('sample.txt'))
      console.log('This is a file, not a directory');
    ```

    #### Parameters
    - {string} <code>filePath</code> File Path.

    #### Return value
    {boolean} True if the file is a file.
- ### File.rename()
    Rename a file or directory.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.rename('old.txt', 'new.txt');
    ```

    #### Parameters
    - {string} <code>srcPath</code> Original file path.
    - {string} <code>dstPath</code> The destination file path.
- ### File.isBase64()
    Check if it is a base64 string.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    if (File.isBase64('iVBORw0KGgoAAAANSUhE'))
      console.log('This is a base64 string');
    ```

    #### Parameters
    - {string} <code>str</code> String.

    #### Return value
    {boolean} True if base64.
- ### File.isDirectory()
    Check if the path is a directory.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    if (File.isDirectory('/tmp/mydir'))
        console.log('This is a directory');
    ```

    #### Parameters
    - {string} <code>inputPath</code> The path of a file or directory.

    #### Return value
    {boolean} True if the input path is a directory, false otherwise.
- ### File.copyDirectory()
    Copy a file or directory. The directory can have contents.

    #### Usage
    ```js
    const {File} = require('nodejs-shared');

    File.copyDirectory('/tmp/mydir', '/tmp/newdir');
    ```

    #### Parameters
    - {string} <code>srcDir</code> The directory from which the copy was made.
    - {string} <code>dstDir</code> The destination directory.

    #### Return value
    Promise&lt;void&gt;
- ### File.isPath()
    Check if it is valid as a file system path.

    #### Usage
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

## Media class
Media (image and video) utility class.

- ### Media.writeDataUrlToFile()
    Write data URL to a file.  
    If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.  
    This method returns the path to the written file.

    #### Usage
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
- ### Media.dataUrlToBase64()
    Convert data URL to blob data in base64 format.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');

    const b64 = Media.dataUrlToBase64('data:image/jpeg;base64,...');
    ```

    #### Parameters
    - {string} <code>dataUrl</code> Data URL.

    #### Return value
    {string|null} Base 64 strings.
- ### Media.isDataUrl()
    Check if the string is in data URL format.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');
    if (Media.isDataUrl('data:image/jpeg;base64,...'))
      console.log('This is a data URL');
    ```

    #### Parameters
    - {string} <code>dataUrl</code> Data URL.

    #### Return value
    {boolean} True if it is a data URL.
- ### Media.statDataUrl()
    Get the MIME type and base64 from the data URL string.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');

    Media.statDataUrl('data:image/jpeg;base64,...'); // =>{blob: '/9j/4AAQSk...', type: 'jpeg', extension: 'jpg'}
    ```

    #### Parameters
    - {string} <code>dataUrl</code> Data URL.

    #### Return value
    {{blob: string, type: string, extension: string|null}|null} Data URL Analysis Results.
- ### Media.getDimensions()
    Get the dimensions (pixels) of the image.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');

    Media.getDimensions('sample.jpg');// =>{width: 960, height: 640}
    ```

    #### Parameters
    - {string} <code>filePath</code> Image file path.

    #### Return value
    {{width: number, height: number }|null} Width and height (in pixels) of the image.
- ### Media.crop()
    Crop from image.

    #### Usage
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
- ### Media.resize()
    Resize the image.  
    If the output option is omitted, the original image is overwritten.

    #### Usage
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
    - {number} <code>width</code> Width after resizing.
    - {number} <code>height</code> Height after resizing.
    - {number} <code>output</code> Image file path after resizing. The default is none, which will overwrite the original image.
    - {boolean} <code>contain</code> If true, resizes the image so that the entire original image is visible. If false, it is stretched to fit the height or width and cropped to fill the area. Default is false.

    #### Return value
    Promise&lt;void&gt;
- ### Media.dataUrlByteSize()
    Get the byte size of data URL.  

    x = (n * (3/4)) - y  
    Where:  
    1. x is the size of a file in bytes  
    2. n is the length of the Base64 String  
    3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.  

    #### Usage
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
- ### Media.base64ByteSize()
    Get base64 byte size.

    x = (n * (3/4)) - y  
    Where:  
    1. x is the size of a file in bytes  
    2. n is the length of the Base64 String  
    3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.  

    #### Usage
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
- ### Media.getMimeTypeFromDataUrl()
    Get Mime type from data URL.

    #### Usage
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
- ### Media.getExtensionFromDataUrl()
    Get extension from data URL.

    #### Usage
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
- ### Media.mergeImages()
    Merge images.

    Merge vertically:  
    <img src="screencaps/merge-images-vertically.png" width="300">

    Merge horizontally:  
    <img src="screencaps/merge-images-horizontally.png" width="300">

    Set 30px margins between images to merge vertically:  
    <img src="screencaps/merge-images-vertically-with-margins.png" width="300">

    #### Usage
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
- ### Media.extractFirstFrameOfGif()
    Extract and save the first frame of the animated GIF.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');

    // Write the first frame of animated.gif to first-frame.gif.
    await Media.extractFirstFrameOfGif('animated.gif', 'first-frame.gif');

    // Overwrite animated.gif with the first frame.
    await Media.extractFirstFrameOfGif('animated.gif');

    // Extract the first frame from the GIF Data URL and save it to an image file.
    await Media.extractFirstFrameOfGif('data:image/gif;base64,...', 'first-frame.gif');
    ```

    #### Parameters
    - {string} <code>inputPathOrDataUrl</code> Path or Data URL of the input image.
    - {string} <code>output</code> Output image path.  
        If not specified, the first frame image is overwritten in the original file.

    #### Return value
    Promise&lt;void&gt;
- ### Media.getNumberOfGifFrames()
    Get the number of GIF frames.

    #### Usage
    ```js
    const {Media} = require('nodejs-shared');

    // Get the number of frames from a GIF image file.
    let numberOfFrames = await Media.getNumberOfGifFrames('animated.gif');

    // Get the number of frames from the GIF Data URL.
    numberOfFrames = await Media.getNumberOfGifFrames('data:image/gif;base64,...');
    ```

    #### Parameters
    - {string} <code>inputPathOrDataUrl</code> Path or Data URL of the input image.

    #### Return value
    {Promise&lt;number|null&gt;} Number of frames in the image.

- ### Media.convertImageFormat()
    Convert Between Image Formats.

    #### Usage
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


## Reflect class
Interface for retrieving reflective information about classes and objects.

- ### Reflect.getStaticMethods()
    Find static methods from the class.

    #### Usage
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
- ### Reflect.getMethods()
    Find a method from an instance.

    #### Usage
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

## Regex class
- ### Regex.escape()
    Escapes the `RegExp` special characters &quot;^&quot;, &quot;$&quot;, &quot;\&quot;, &quot;.&quot;, &quot;*&quot;, &quot;+&quot;, &quot;?&quot;, &quot;(&quot;, &quot;)&quot;, &quot;[&quot;, &quot;]&quot;, &quot;{&quot;, &quot;}&quot;, &quot;|&quot; in `string`.

    #### Usage
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

## Browser class
- ### Browser.parse()
    Analyze browser information from UA.

    #### Usage
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