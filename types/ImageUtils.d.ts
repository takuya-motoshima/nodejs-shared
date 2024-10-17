/**
 * Options for cropping an image.
 */
interface CropOptions {
    /**
     * Left offset for cropping.
     */
    left: number;
    /**
     * Top offset for cropping.
     */
    top: number;
    /**
     * Width of the cropped area.
     */
    width: number;
    /**
     * Height of the cropped area.
     */
    height: number;
}
/**
 * Options for merging multiple images.
 */
interface MergeImagesOptions {
    /**
     * Direction of the merged image ('vertical' or 'horizontal').
     */
    direction: 'vertical' | 'horizontal';
    /**
     * Background color. Can be a string (e.g., "#ffffff", "black", "transparent") or an object with r, g, b, and alpha properties.
     * Default is {alpha: 1, b: 0, g: 0, r: 0}.
     */
    color: string | {
        r?: number;
        g?: number;
        b?: number;
        alpha?: number;
    };
    /**
     * Alignment of the images ('start', 'center', or 'end'). Default is 'start'.
     */
    align: 'start' | 'center' | 'end' | 'start';
    /**
     * Offset in pixels between each image. Default is 0.
     */
    offset: number;
    /**
     * Margin of the result image. Can be a number, a string (CSS shorthand), or an object with top, right, bottom, and left properties.
     */
    margin: number | string | Dimensions;
}
/**
 * Options for resizing an image.
 */
interface ResizeOptions {
    /**
     * Desired width.
     */
    width?: number;
    /**
     * Desired height.
     */
    height?: number;
    /**
     * Output path for the resized image. If not provided, the original file will be overwritten.
     */
    output?: string;
    /**
     * Resize to fit within the specified dimensions, maintaining aspect ratio. If both width and height are provided, the smaller dimension is used as the limit.
     */
    contain?: boolean;
}
/**
 * Represents dimensions with top, right, bottom, and left values.  Useful for padding, margins, etc.
 */
interface Dimensions {
    /**
     * The top dimension.
     */
    top: number;
    /**
     * The right dimension.
     */
    right: number;
    /**
     * The bottom dimension.
     */
    bottom: number;
    /**
     * The left dimension.
     */
    left: number;
}
/**
 * Options for converting image formats.
 */
interface ConvertImageFormatOptions {
    /**
     * The version of the BMP format to use. One of "bmp2", "bmp3", or "bmp4".
     */
    bmpVersion?: 'bmp2' | 'bmp3' | 'bmp4';
    /**
     * If `true`, uses true color for BMP conversion.
     */
    trueColor?: boolean;
    /**
     * Margin around the image (in pixels).
     */
    margin?: number;
    /**
     * Background color (e.g., "#ffffff", "black", "transparent").
     */
    background?: string;
}
/**
 * Provides utility functions for image manipulation.
 */
export default class {
    /**
     * ImageMagick instance.
     * @private
     */
    private static imageMagick;
    /**
     * Crops an image using Sharp.
     * @param {string} inputPath Path to the input image file.
     * @param {string} outputPath Path to save the cropped image.
     * @param {CropOptions} options Cropping options.
     * @param {number} options.left x-coordinate of the top-left corner of the crop area.
     * @param {number} options.top y-coordinate of the top-left corner of the crop area.
     * @param {number} options.width Width of the crop area.
     * @param {number} options.height Height of the crop area.
     * @return {Promise<void>}
     */
    static cropImage(inputPath: string, outputPath: string, options: CropOptions): Promise<void>;
    /**
     * Merges multiple images into a single image using Sharp.
     * @param {string[]} inputPaths An array of paths to the input image files.
     * @param {string} outputPath The path to save the merged image.
     * @param {Partial<MergeImagesOptions>} [options] Optional settings for merging images.
     * @param {'vertical'|'horizontal'} [options.direction='vertical'] The direction to merge the images.
     * @param {MergeImagesOptions['color']} [options.color={alpha: 1, b: 0, g: 0, r: 0}] The background color.
     * @param {'start'|'center'|'end'} [options.align='start'] The alignment of the images.
     * @param {number} [options.offset=0] The offset in pixels between each image.
     * @param {number|string|Dimensions} [options.margin=0] The margin around the merged image.
     * @return {Promise<void>}
     * @throws {TypeError} If inputPaths is not an array or if it's empty.
     */
    static mergeImages(inputPaths: string[], outputPath: string, options?: Partial<MergeImagesOptions>): Promise<void>;
    /**
     * Resizes an image using Sharp.
     * @param {string} inputPath Path to the input image file.
     * @param {ResizeOptions} options Resizing options.
     * @param {number} [options.width] Width after resizing.
     * @param {number} [options.height] Height after resizing.
     * @param {string} [options.output] Output path for the resized image. If not provided, the original file will be overwritten.
     * @param {boolean} [options.contain=false] If true, resizes the image to fit within the dimensions while maintaining aspect ratio. If false, resizes to cover the dimensions, potentially cropping parts of the image.
     * @return {Promise<void>}
     */
    static resizeImage(inputPath: string, options?: ResizeOptions): Promise<void>;
    /**
     * Gets the number of frames in a GIF image using ImageMagick.
     * @param {string} imageInput Path or data URL of the GIF image.
     * @return {Promise<number|null>}  Number of frames, or null if not a GIF or an error occurred.
     * @throws {Error} If input is a file path and the file is not found.
     */
    static getGifFrameCount(imageInput: string): Promise<number | null>;
    /**
     * Extracts and saves the first frame of an animated GIF using ImageMagick.
     * @param {string} imageInput Path or data URL of the animated GIF.
     * @param {string} [outputPath] Output path for the first frame. If not provided, the original file will be overwritten if it is a path; if it's a data URL, outputPath is required.
     * @return {Promise<void>}
     * @throws {Error} If the input file is not found, input is a data URL and no output path is specified, or an error occurs during processing.
     */
    static extractFirstGifFrame(imageInput: string, outputPath?: string): Promise<void>;
    /**
     * Gets image dimensions using the `image-size` npm package.
     * @param {string} filePath Path to the image file.
     * @return {{width: number, height: number}|null} Image dimensions, or `null` if an error occurs or the image is invalid.
     */
    static getImageDimensions(filePath: string): {
        width: number;
        height: number;
    } | null;
    /**
     * Converts between image formats using ImageMagick.
     * @param {string} imageInput Path or data URL of the input image.
     * @param {string} [outputPath] Optional output path for the converted image. If not provided, a temporary file is used.
     * @param {ConvertImageFormatOptions} [options] Conversion options.
     * @param {'bmp2'|'bmp3'|'bmp4'} [options.bmpVersion='bmp3'] BMP version for output (ignored if output is not BMP).
     * @param {boolean} [options.trueColor=true] Use 24-bit color for BMP output.
     * @param {number} [options.margin] Margin size in pixels (top, bottom, left, and right).
     * @param {string} [options.background='white'] Margin background color.
     * @return {Promise<string>} Data URL of the converted image.
     * @throws {Error} If the input file is not found or an error occurs during conversion.
     */
    static convertImageFormat(imageInput: string, outputPath?: string, options?: ConvertImageFormatOptions): Promise<string>;
}
export {};
