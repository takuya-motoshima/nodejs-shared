# Changelog
All notable changes to this project will be documented in this file.

## [1.0.16] - Next Release
### Fixed
- Fixed a typo that caused two dots in the extension of temporary images created by GIF-related processing in the media class.

## [1.0.15] - 2023/3/1
### Added
- Added a method to the File class to check if a string is valid as a file system path.
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

### Changed
- The method for retrieving the first frame of a GIF in the Media class can now also process the Data URL of the image.
    ```js
    const {Media} = require('nodejs-shared');

    // Extract the first frame from the GIF Data URL and save it to an image file.
    await Media.extractFirstFrameOfGif('data:image/gif;base64,R0lGODl...', 'first-frame.gif');
    ```
- The method to get the number of frames of a GIF in the Media class can now also process the Data URL of the image.
    ```js
    const {Media} = require('nodejs-shared');

    // Get the number of frames from the GIF Data URL.
    const numberOfFrames = await Media.getNumberOfGifFrames('data:image/gif;base64,R0lGODl...');
    ```
- Added unit tests [here](tests/media.test.js) for a method to convert GIF DataURL to base64 (Media.dataUrlToBase64) and a method to write GID DataURL as an image file (Media.writeDataUrlToFile).
- A unit test for a method to get the type of DataURL (Media.statDataUrl) has been added [here](tests/media.test.js).

## [1.0.14] - 2023/3/1
### Changed
- Fix API reference in README.md.

## [1.0.13] - 2023/3/1
### Added
- Added a method to the Media class to extract and save the first frame of a GIF.
    ```js
    const {Media} = require('nodejs-shared');

    // Write the first frame of sample.gif to first-frame.gif.
    await Media.extractFirstFrameOfGif('sample.gif', 'first-frame.gif');

    // Overwrite sample.gif with the first frame.
    await Media.extractFirstFrameOfGif('sample.gif');
    ```
- Added a method to the Media class to get the number of GIF frames.
    ```js
    const {Media} = require('nodejs-shared');

    // Get the number of frames from a GIF image file.
    const numberOfFrames = await Media.getNumberOfGifFrames('sample.gif');
    ```
- Add a method to the File class to recursively copy directories.
    ```js
    const {File} = require('nodejs-shared');

    File.copyDirectory('/tmp/mydir', '/tmp/newdir');
    ```
- Add a method to the File class to check if it is a directory.
    ```js
    const {File} = require('nodejs-shared');

    if (File.isDirectory('/tmp/mydir'))
        console.log('This is a directory');
    ```

### Changed
- Added unit tests for the newly fixed classes [here](tests/media.test.js).

## [1.0.12] - 2022/12/15
### Changed
- Added changelog and unit test information to README.md.

## [1.0.11] - 2022/12/15
### Added
- Added image merge method.
    Merge vertically:  
    <img src="screencaps/merge-images-vertically.png" width="300">

    Merge horizontally:  
    <img src="screencaps/merge-images-horizontally.png" width="300">

    Set 30px margins between images to merge vertically:  
    <img src="screencaps/merge-images-vertically-with-margins.png" width="300">

    ```js
    const {Media} = require('nodejs-shared');

    const imagePaths = ['sample1.png', 'sample2.png', 'sample2.png'];

    // Merge vertically.
    await Media.mergeImages(imagePaths, 'result1.png', {direction: 'vertical'});

    // Merge horizontally.
    await Media.mergeImages(imagePaths, 'result2.png', {direction: 'horizontal'});

    // Set 30px margins between images to merge vertically.
    await Media.mergeImages(imagePaths, 'result3.png', {direction: 'vertical', offset: 30});

    // Set 30px margins between images to merge horizontally.
    await Media.mergeImages(imagePaths, 'result4.png', {direction: 'horizontal', offset: 30});
    ```

### Changed
- API documentation has been moved from github.io to README.md. 

## [1.0.10] - 2022/10/17
### Fixed
- I am sorry. I forgot to build after fixing the code.

## [1.0.9] - 2022/10/17
### Changed
- Fix typos in the code.

## [1.0.8] - 2022/10/17
### Fixed
- AFixed a bug that prevented SVG files from being read correctly as DataURL strings.
    ```js
    const {File} = require('nodejs-shared');

    // sample.svg: <svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="900" fill="#151521"/><path d="M450.5 195C376.206 195 315.764 255.443 315.764 329.736C315.764 404.03 376.206 464.473 450.5 464.473C524.794 464.473 585.236 404.03 585.236 329.736C585.236 255.443 524.794 195 450.5 195Z" fill="#3E3E51"/><path d="M618.138 552.495C581.25 515.041 532.349 494.414 480.441 494.414H420.559C368.652 494.414 319.75 515.041 282.862 552.495C246.155 589.766 225.939 638.964 225.939 691.029C225.939 699.297 232.642 706 240.91 706H660.09C668.358 706 675.061 699.297 675.061 691.029C675.061 638.964 654.845 589.766 618.138 552.495Z" fill="#3E3E51"/></svg>
    File.readAsDataUrl(`sample.svg`);
    // =>data:image/svg+xml;utf8,%3Csvg%20width%3D%22900%22%20height%3D%22900%22%20viewBox%3D%220%200%20900%20900%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22900%22%20height%3D%22900%22%20fill%3D%22%23151521%22%2F%3E%0A%3Cpath%20d%3D%22M450.5%20195C376.206%20195%20315.764%20255.443%20315.764%20329.736C315.764%20404.03%20376.206%20464.473%20450.5%20464.473C524.794%20464.473%20585.236%20404.03%20585.236%20329.736C585.236%20255.443%20524.794%20195%20450.5%20195Z%22%20fill%3D%22%233E3E51%22%2F%3E%0A%3Cpath%20d%3D%22M618.138%20552.495C581.25%20515.041%20532.349%20494.414%20480.441%20494.414H420.559C368.652%20494.414%20319.75%20515.041%20282.862%20552.495C246.155%20589.766%20225.939%20638.964%20225.939%20691.029C225.939%20699.297%20232.642%20706%20240.91%20706H660.09C668.358%20706%20675.061%20699.297%20675.061%20691.029C675.061%20638.964%20654.845%20589.766%20618.138%20552.495Z%22%20fill%3D%22%233E3E51%22%2F%3E%0A%3C%2Fsvg%3E%0A
    ```

## [1.0.7] - 2022/10/11
### Fixed
- Fixed a bug that prevents writing to files when the data part of SVG in data URL format is base64 (data:image/svg+xml;base64,).
    ```js
    const {Media} = require('nodejs-shared');

    const urlEncodedSvg = 'data:image/svg+xml;utf8,%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D%0A%3Cpath%20opacity%3D%220.3%22%20d%3D%22M16.5%209C16.5%2013.125%2013.125%2016.5%209%2016.5C4.875%2016.5%201.5%2013.125%201.5%209C1.5%204.875%204.875%201.5%209%201.5C13.125%201.5%2016.5%204.875%2016.5%209Z%22%20fill%3D%22currentColor%22%2F%3E%0D%0A%3Cpath%20d%3D%22M9%2016.5C10.95%2016.5%2012.75%2015.75%2014.025%2014.55C13.425%2012.675%2011.4%2011.25%209%2011.25C6.6%2011.25%204.57499%2012.675%203.97499%2014.55C5.24999%2015.75%207.05%2016.5%209%2016.5Z%22%20fill%3D%22currentColor%22%2F%3E%0D%0A%3Crect%20x%3D%227%22%20y%3D%226%22%20width%3D%224%22%20height%3D%224%22%20rx%3D%222%22%20fill%3D%22currentColor%22%2F%3E%0D%0A%3C%2Fsvg%3E';
    let writtenFilePath = Media.writeDataUrlToFile('upload/urlEncodedSvg', urlEncodedSvg);
    console.log(`Write ${writtenFilePath}`);

    const base64Svg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIG9wYWNpdHk9IjAuMyIgZD0iTTE2LjUgOUMxNi41IDEzLjEyNSAxMy4xMjUgMTYuNSA5IDE2LjVDNC44NzUgMTYuNSAxLjUgMTMuMTI1IDEuNSA5QzEuNSA0Ljg3NSA0Ljg3NSAxLjUgOSAxLjVDMTMuMTI1IDEuNSAxNi41IDQuODc1IDE2LjUgOVoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPg0KPHBhdGggZD0iTTkgMTYuNUMxMC45NSAxNi41IDEyLjc1IDE1Ljc1IDE0LjAyNSAxNC41NUMxMy40MjUgMTIuNjc1IDExLjQgMTEuMjUgOSAxMS4yNUM2LjYgMTEuMjUgNC41NzQ5OSAxMi42NzUgMy45NzQ5OSAxNC41NUM1LjI0OTk5IDE1Ljc1IDcuMDUgMTYuNSA5IDE2LjVaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4NCjxyZWN0IHg9IjciIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4NCjwvc3ZnPg==';
    writtenFilePath = Media.writeDataUrlToFile('upload/base64Svg', base64Svg);
    console.log(`Write ${writtenFilePath}`);
    ```

## [1.0.6] - 2022/10/11
### Changed
- Fix documentation.

## [1.0.5] - 2022/10/11
### Fixed
- Fixed a bug that prevented the writeDataUrlToFile method of the Media class from writing DataURL format SVG to a file.

## [1.0.4] - 2022/10/11
### Changed
- The writeDataUrlToFile method of the Media class now automatically adds an extension when the output filename does not have one.  
    Also, the return value now returns the file path instead of the Media class.  
    ```js
    const {Media} = require('nodejs-shared');

    // Writes DataURL to a file with the specified extension.
    Media.writeDataUrlToFile('test1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=');

    // Writes DataURL to files with extensions detected automatically.
    const writtenFilePath = Media.writeDataUrlToFile('test2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=');
    console.log(writtenFilePath);
    // =>test2.png
    ```
### Added
- Added method to get Mime type from DataURL.
    ```js
    const {Media} = require('nodejs-shared');

    Media.getMimeTypeFromDataUrl('data:image/png;base64,abc...');
    // =>image/png
    ```
- Added method to get extension from DataURL.
    ```js
    const {Media} = require('nodejs-shared');

    Media.getExtensionFromDataUrl('data:image/png;base64,abc...');
    // =>png

    Media.getExtensionFromDataUrl('data:image/jpeg;base64,abc...');
    // =>jpg
    ```

## [1.0.3] - 2022/8/3
### Added
- Added a method to the Media class to obtain byte size from data URL or base64.
    Get the byte size of data URL:
    ```js
    const {File, Media} = require('nodejs-shared');

    const dataUrl = File.readAsDataUrl('sample.jpg');
    Media.dataUrlByteSize(dataUrl);
    // =>30141
    ```

    Get base64 byte size:
    ```js
    const {File, Media} = require('nodejs-shared');

    const base64 = File.readAsBase64('sample.jpg');
    Media.base64ByteSize(base64);
    // =>30141
    ```

### Changed
- Changed to the correct method name as a function.  
    * Media.writeBase64Image => Media.writeDataUrlToFile
    * Media.isBase64 => Media.isDataUrl
    * Media.convertBase64ToBlob => Media.dataUrlToBase64
    * Media.statBase64 => Media.statDataUrl
    * File.readAsBase64 => File.readAsDataUrl

## [1.0.2] - 2021/10/12
### Changed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
    This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
    Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.1] - 2020/9/25
### Added
- Added delete directory method to file module.
    ```js
    import { File } from 'nodejs-shared';
    File.deleteDirectory('/sample');
    ````

## [1.0.0] - 2020/7/13
### Added
- First release.

[1.0.1]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.4...v1.0.5
[1.0.6]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.5...v1.0.6
[1.0.7]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.6...v1.0.7
[1.0.8]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.7...v1.0.8
[1.0.9]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.8...v1.0.9
[1.0.10]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.9...v1.0.10
[1.0.11]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.10...v1.0.11
[1.0.12]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.11...v1.0.12
[1.0.13]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.12...v1.0.13
[1.0.14]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.13...v1.0.14
[1.0.15]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.14...v1.0.15
[1.0.16]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.15...v1.0.16