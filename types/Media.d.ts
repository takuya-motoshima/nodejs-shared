import MergeImagesOptions from '~/interfaces/MergeImagesOptions';
export default class Media {
    /**
     * Write data URL to a file.
     * If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.
     * This method returns the path to the written file.
     *
     * @static
     * @param {string} outputPath Output file path.
     * @param {string} dataUrl Data URL.
     * @param {number} permission File permissions. Default is 0o755.
     * @return {string} Path of the written file.
     * @memberof Media
     */
    static writeDataUrlToFile(outputPath: string, dataUrl: string, permission?: number): string;
    /**
     * Convert data URL to blob data in base64 format.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {string} Base 64 strings.
     * @memberof Media
     */
    static dataUrlToBase64(dataUrl: string): string;
    /**
     * Check if the string is in data URL format.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {boolean} True if it is a data URL.
     * @memberof Media
     */
    static isDataUrl(dataUrl: string): boolean;
    /**
     * Get the MIME type and base64 from the data URL string.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {{blob: string, type: string}|undefined} Data URL Analysis Results.
     * @memberof Media
     */
    static statDataUrl(dataUrl: string): {
        blob: string;
        type: string;
    } | undefined;
    /**
     * Get the dimensions (pixels) of the image.
     *
     * @static
     * @param {string} filePath Image file path.
     * @return {{width: number, height: number }|null} Width and height (in pixels) of the image.
     * @memberof Media
     */
    static getDimensions(filePath: string): {
        width: number;
        height: number;
    } | null;
    /**
     * Crop from image.
     *
     * @static
     * @param {string} inputPath Original image file path.
     * @param {string} outputPath Image path after cropping.
     * @param {number} options.left x-coordinate position (pixels) to crop.
     * @param {number} options.top y-coordinate position to crop to (in pixels).
     * @param {number} options.width Width to crop (pixels).
     * @param {number} options.height The height (in pixels) to crop.
     * @return {Promise<void>}
     * @memberof Media
     */
    static crop(inputPath: string, outputPath: string, { left, top, width, height }: {
        left: number;
        top: number;
        width: number;
        height: number;
    }): Promise<void>;
    /**
     * Resize the image.
     * If the output option is omitted, the original image is overwritten.
     *
     * @static
     * @param {string} inputPath The image file path from which to resize.
     * @param {number} width Width after resizing.
     * @param {number} height Height after resizing.
     * @param {number} output Image file path after resizing. The default is none, which will overwrite the original image.
     * @param {boolean} contain If true, resizes the image so that the entire original image is visible. If false, it is stretched to fit the height or width and cropped to fill the area. Default is false.
     * @return {Promise<void>}
     * @memberof Media
     */
    static resize(inputPath: string, { width, height, output, contain }: {
        width?: number;
        height?: number;
        output?: string;
        contain?: boolean;
    }): Promise<void>;
    /**
     * Get the byte size of data URL.
     *
     * x = (n * (3/4)) - y
     * Where:
     * 1. x is the size of a file in bytes
     * 2. n is the length of the Base64 String
     * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {number} Byte Size.
     * @memberof Media
     */
    static dataUrlByteSize(dataUrl: string): number;
    /**
     * Get base64 byte size.
     *
     * x = (n * (3/4)) - y
     * Where:
     * 1. x is the size of a file in bytes
     * 2. n is the length of the Base64 String
     * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
     *
     * @static
     * @param {string} base64 Base 64 strings.
     * @return {number} Byte Size.
     * @memberof Media
     */
    static base64ByteSize(base64: string): number;
    /**
     * Get Mime type from data URL.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {string|null} Mime Type.
     * @memberof Media
     */
    static getMimeTypeFromDataUrl(dataUrl: string): string | null;
    /**
     * Get extension from data URL.
     *
     * @static
     * @param {string} dataUrl Data URL.
     * @return {string|null} File extension.
     * @memberof Media
     */
    static getExtensionFromDataUrl(dataUrl: string): string | null;
    /**
     * Merge images.
     *
     * @static
     * @param {string[]} inputPaths Path list of image files to merge.
     * @param {string} outputPath File path of the merged image.
     * @param {'vertical'|'horizontal'} options.direction Direction of the merged image.
     * @param {string|{r: number, g: number, b: number, alpha: number}} options.color
     *  Default background color represented by RGBA hex value.
     *  Default is {alpha: 1., b: 0, g: 0, r: 0}.
     * @param {'start'|'center'|'end'|'start'} options.align Aligning of given images.
     *  If the images are not all the same size, images will be sorted to largest image.
     *  Possible values are start, center and end. Default is start.
     * @param {number} offset Offset in pixels between each image. Default is 0.
     * @param {number|string|{top: number, right: number, bottom: number, left: number}} options.margin
     *  Margin of the result image.
     *  If Number or String is passed, it will be considered as standard css shorthand properties (e.g. '40 40 0 10').
     *  An Object entry can have following options:
     *  - top Number (optional) - Margin on top side of result image. Default is 0.
     *  - right Number (optional) - Margin on right side of result image. Default is 0.
     *  - bottom Number (optional) - Margin on bottom side of result image. Default is 0.
     *  - left Number (optional) - Margin on left side of result image. Default is 0.
     * @return {Promise<void>}
     * @memberof Media
     */
    static mergeImages(inputPaths: string[], outputPath: string, options?: Partial<MergeImagesOptions>): Promise<void>;
    /**
     * Extract and save the first frame of the animated GIF.
     *
     * @static
     * @param {string} inputPath Input image path.
     * @param {string?} outputPath Output image path. If not specified, the first frame image is overwritten in the original file.
     */
    static extractFirstFrameOfGif(inputPath: string, outputPath?: string): Promise<void>;
    /**
     * Get the number of GIF frames.
     *
     * @static
     * @param {string} inputPath Input image path.
     * @return {Promise<number|null>} Number of frames in the image.
     * @memberof Media
     */
    static getNumberOfGifFrames(inputPath: string): Promise<number | null>;
}
