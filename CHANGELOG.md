# Changelog
All notable changes to this project will be documented in this file.

## [2.0.0] - 2024/10/16
### Changed
- Added `"type": "module"` to `package.json`
- Updated Rollup and TypeScript.
- Excluded sharp from the bundle.

    rollup.config.js:
    ```js
    external: [
        ...builtins,
        'sharp',
    ],
    ```
- Renamed `File` class to `FileUtils`.  
    Renamed `Media` class to `MediaUtils`.  
    Added new utility classes: `ProcessUtils` and `ImageUtils`.
    Existing methods have also been modified. Please review the following changes:

    | Class | Change Description | Before | After |
    |---|---|---|---|
    | `FileUtils` | Method renamed. | `chmod(path: string, permission: number = 0o755): File` | `changePermission(filePath: string, mode: number = 0o755): void` |
    | `FileUtils` | New method added. |  | `changeOwner(filePath: string, username: string, groupName?: string): void` |
    | `FileUtils` | Method renamed. Now supports copying both files and directories. | `copyDirectory(srcDir: string, dstDir: string): void` | `copy(sourcePath: string, destinationPath: string): void` |
    | `FileUtils` | Method renamed. | `existsFile(path: string): boolean` | `exists(filePath: string): boolean` |
    | `FileUtils` | Method renamed. | `find(pattern: string, options: GlobOptions = {})` | `glob(pattern: string, options: GlobOptions = {}): string[]` |
    | `FileUtils` | Parameter changed. Added options for file owner and group for directories. | `makeDirectory(dirPath: string, permission: number = 0o755): File` | `makeDirectory(directoryPath: string, options: MakeDirectoryOptions = {}): void` |
    | `FileUtils` | Parameter changed. Added options for file owner and group for directories. | `makeTmpDirectory(): string` | `makeTmpDirectory(options: MakeDirectoryOptions = {}): string` |
    | `FileUtils` | Parameter changed. Added options for file owner and group for files. | `write(filePath: string, content: string = '', options: fs.WriteFileOptions|string|undefined = undefined, permission: number = 0o755): File` | `write(filePath: string, content: string|Buffer = '', options: WriteOptions = {}): void` |
    | `MediaUtils` | Removed. Use `parseDataUrl` instead. | `base64ByteSize(base64: string): number` | - |
    | `MediaUtils` | Moved to `ImageUtils.ts`. | `convertImageFormat(imageInput: string, outputPath?: string, options?: {bmpVersion: 'bmp2'|'bmp3'|'bmp4', trueColor: boolean, margin: number, background: string}): Promise<string>` | `convertImageFormat(imageInput: string, outputPath?: string, options: ConvertImageFormatOptions = {}): Promise<string>` |
    | `MediaUtils` | Moved to `ImageUtils.ts` and renamed. | `crop(inputPath: string, outputPath: string, {left, top, width, height}: {left: number, top: number, width: number, height: number}): Promise<void>` | `cropImage(inputPath: string, outputPath: string, options: CropOptions): Promise<void>` |
    | `MediaUtils` | Removed. Use `parseDataUrl` instead. | `dataUrlByteSize(dataUrl: string): number` | - |
    | `MediaUtils` | Removed. Use `parseDataUrl` instead. | `dataUrlToBase64(dataUrl: string): string|null` | - |
    | `MediaUtils` | Moved to `ImageUtils.ts` and renamed. | `extractFirstFrameOfGif(imageInput: string, outputPath?: string): Promise<void>` | `extractFirstGifFrame(imageInput: string, outputPath?: string): Promise<void>` |
    | `MediaUtils` | Method renamed. | `getDimensions(filePath: string): {width: number, height: number }|null` | `getImageDimensions(filePath: string): {width: number; height: number}|null` |
    | `MediaUtils` | Removed. Use `parseDataUrl` instead. | `getExtensionFromDataUrl(dataUrl: string): string|null` | - |
    | `MediaUtils` | Removed. Use `parseDataUrl` instead. | `getMimeTypeFromDataUrl(dataUrl: string): string|null` | - |
    | `MediaUtils` | Moved to `ImageUtils.ts` and renamed. | `getNumberOfGifFrames(imageInput: string): Promise<number|null>` | `getGifFrameCount(imageInput: string): Promise<number|null>` |
    | `MediaUtils` | Method renamed. The return value now includes byte size. | `statDataUrl(dataUrl: string): {blob: string, type: string, extension: string|null}|null` | `parseDataUrl(dataUrl: string): DataUrlParts|null` |
    | `MediaUtils` | Moved to `ImageUtils.ts`. | `mergeImages(inputPaths: string[], outputPath: string, options: Partial<MergeImagesOptions> = {}): Promise<void>` | `mergeImages(inputPaths: string[], outputPath: string, options: Partial<MergeImagesOptions> = {}): Promise<void>` |
    | `MediaUtils` | Moved to `ImageUtils.ts` and renamed. | `resize(inputPath: string, {width, height, output, contain = false}: {width?: number, height?: number, output?: string, contain?: boolean}): Promise<void>` | `resizeImage(inputPath: string, options: ResizeOptions = {}): Promise<void>` |
    | `MediaUtils` | Renamed and changed parameters. Added options for file owner and group for files. | `writeDataUrlToFile(outputPath: string, dataUrl: string, permission: number = 0o755): string` | `writeImage(outputPath: string, dataUrl: string, options: WriteImageOptions = {mode: 0o755})` |
    | `ProcessUtils` | New method added. | - | `getUid(username: string): number` |
    | `ProcessUtils` | New method added. | - | `getGid(groupName: string): number` |


## [1.0.30] - 2024/6/27
### Changed
- Updated `glob` version from 7.1.6 to 10.4.2.

## [1.0.29] - 2024/4/30
### Changed
- The tmp directory handled by the following tmp file/directory manipulation methods now treats the directory set in the `TMPDIR` environment variable as the tmp directory if the `TMPDIR` environment variable is present.
    - File.getTmpDirectory()
    - File.getTmpPath()
    - File.makeTmpDirectory()

## [1.0.28] - 2024/4/5
### Changed
- Changed the reference timing of [image-size](https://www.npmjs.com/package/image-size) and [sharp](https://sharp.pixelplumbing.com/) packages from the time of importing this package to the time of executing related methods.

## [1.0.27] - 2024/4/4
### Changed
- Updated dependent [sharp](https://sharp.pixelplumbing.com/) package from 0.31.2 to 0.33.3.

## [1.0.26] - 2023/11/15
### Changed
- Image resizing process (Media.resize) no longer creates a temporary file.

## [1.0.25] - 2023/9/2
### Added
- Added validator functions. API details are [here](README.md#api).

## [1.0.24] - 2023/9/1
### Changed
- Update TypeScript version from 4.9.4 to 5.2.2.
- Updated rollup plugins (rollup-plugin-typescript2, @rollup/plugin-commonjs, @rollup/plugin-node-resolve, @rollup/plugin-terser).

## [1.0.23] - 2023/6/8
### Changed
- Media class now supports PDF.

## [1.0.22] - 2023/4/5
### Changed
- Added margin option to image conversion method (Media.convertImageFormat).

## [1.0.21] - 2023/4/4
### Changed
- Added bmp conversion option to the image conversion method (Media.convertImageFormat).

### Fixed
- Delete debug logs.

## [1.0.20] - 2023/3/24
### Fixed
- Fixed a bug in the image format conversion method (Media.convertImageFormat()) that caused an error when loading the converted image dataURL.

## [1.0.19] - 2023/3/24
### Changed
- Changed the format of bmp output by the image format conversion method (Media.convertImageFormat()) from BPM V1 to BMP V3.

## [1.0.18] - 2023/3/16
### Changed
- Delete backup files that are no longer needed.

## [1.0.17] - 2023/3/16
### Changed
- Fix API documentation.

## [1.0.16] - 2023/3/16
### Added
- An image format conversion method was added to the media class.

### Fixed
- Fixed a typo that caused two dots in the extension of temporary images created by GIF-related processing in the media class.

## [1.0.15] - 2023/3/1
### Added
- Added a method to the File class to check if a string is valid as a file system path.

### Changed
- The method for retrieving the first frame of a GIF in the Media class can now also process the Data URL of the image.
- The method to get the number of frames of a GIF in the Media class can now also process the Data URL of the image.
- Added unit tests [here](__tests__/Media.test.js) for a method to convert GIF DataURL to base64 (Media.dataUrlToBase64) and a method to write GID DataURL as an image file (Media.writeDataUrlToFile).
- A unit test for a method to get the type of DataURL (Media.statDataUrl) has been added [here](__tests__/Media.test.js).

## [1.0.14] - 2023/3/1
### Changed
- Fix API reference in README.md.

## [1.0.13] - 2023/3/1
### Added
- Added a method to the Media class to extract and save the first frame of a GIF.
- Added a method to the Media class to get the number of GIF frames.
- Add a method to the File class to recursively copy directories.
- Add a method to the File class to check if it is a directory.

### Changed
- Added unit tests for the newly fixed classes [here](__tests__/Media.test.js).

## [1.0.12] - 2022/12/15
### Changed
- Added changelog and unit test information to README.md.

## [1.0.11] - 2022/12/15
### Added
- Added image merge method.

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

## [1.0.7] - 2022/10/11
### Fixed
- Fixed a bug that prevents writing to files when the data part of SVG in data URL format is base64 (data:image/svg+xml;base64,).

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

### Added
- Added method to get Mime type from DataURL.
- Added method to get extension from DataURL.

## [1.0.3] - 2022/8/3
### Added
- Added a method to the Media class to obtain byte size from data URL or base64.

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
[1.0.17]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.16...v1.0.17
[1.0.18]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.17...v1.0.18
[1.0.19]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.18...v1.0.19
[1.0.20]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.19...v1.0.20
[1.0.21]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.20...v1.0.21
[1.0.22]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.21...v1.0.22
[1.0.23]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.22...v1.0.23
[1.0.24]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.23...v1.0.24
[1.0.25]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.24...v1.0.25
[1.0.26]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.25...v1.0.26
[1.0.27]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.26...v1.0.27
[1.0.28]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.27...v1.0.28
[1.0.29]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.28...v1.0.29
[1.0.30]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.29...v1.0.30
[2.0.0]: https://github.com/takuya-motoshima/nodejs-shared/compare/v1.0.30...v2.0.0