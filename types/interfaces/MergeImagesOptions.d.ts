import Dim from '~/interfaces/Dim';
export default interface MergeImagesOptions {
    /**
     * Direction of the merged image.
     */
    direction: 'vertical' | 'horizontal';
    /**
     * Default background color represented by RGBA hex value.
     * Default is {alpha: 1., b: 0, g: 0, r: 0}.
     */
    color: string | {
        r?: number;
        g?: number;
        b?: number;
        alpha?: number;
    };
    /**
     * Aligning of given images.
     * If the images are not all the same size, images will be sorted to largest image.
     * Possible values are start, center and end. Default is start.
     */
    align: 'start' | 'center' | 'end' | 'start';
    /**
     * Offset in pixels between each image. Default is 0.
     */
    offset: number;
    /**
     * Margin of the result image.
     * If Number or String is passed, it will be considered as standard css shorthand properties (e.g. '40 40 0 10').
     * An Object entry can have following options:
     * - top Number (optional) - Margin on top side of result image. Default is 0.
     * - right Number (optional) - Margin on right side of result image. Default is 0.
     * - bottom Number (optional) - Margin on bottom side of result image. Default is 0.
     * - left Number (optional) - Margin on left side of result image. Default is 0.
     */
    margin: number | string | Dim;
}
