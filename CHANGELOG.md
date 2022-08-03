# Changelog
All notable changes to this project will be documented in this file.

## [1.0.3] - 2022-08-03
### Fixed
- Added a method to the Media class to obtain byte size from DataURL or base64.
    Get the byte size of DataURL:
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
    * Media.readAsBase64 => Media.readAsDataUrl

## [1.0.2] - 2021-10-12
### Fixed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
    This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
    Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.1] - 2020-09-25
### Fixed
- Added delete directory method to file module.
    ```js
    import { File } from 'nodejs-shared';
    File.deleteDirectory('/sample');
    ````

## [1.0.0] - 2020-07-13
### Fixed
- First release.

[1.0.1]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.2...v1.0.3