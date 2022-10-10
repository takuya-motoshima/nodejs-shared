# Changelog
All notable changes to this project will be documented in this file.

## [1.0.4] - 202210/11
### Fixed
- The writeDataUrlToFile method of the Media class now automatically adds an extension when the output filename does not have one.  
    Also, the return value now returns the file path instead of the Media class.  
    ```js
    const {Media} = require('nodejs-shared');

    // Writes DataURL to a file with the specified extension.
    Media.writeDataUrlToFile('test1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==');

    // Writes DataURL to files with extensions detected automatically.
    const writtenFilePath = Media.writeDataUrlToFile('test2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==');
    console.log(writtenFilePath);
    // =>test2.png
    ```

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
### Fixed
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
- Changed to the correct method name as a function.  
    * Media.writeBase64Image => Media.writeDataUrlToFile
    * Media.isBase64 => Media.isDataUrl
    * Media.convertBase64ToBlob => Media.dataUrlToBase64
    * Media.statBase64 => Media.statDataUrl
    * File.readAsBase64 => File.readAsDataUrl

## [1.0.2] - 2021/10/12
### Fixed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
    This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
    Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.1] - 2020/9/25
### Fixed
- Added delete directory method to file module.
    ```js
    import { File } from 'nodejs-shared';
    File.deleteDirectory('/sample');
    ````

## [1.0.0] - 2020/7/13
### Fixed
- First release.

[1.0.1]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.2...v1.0.3