import IsEmptyOptions from '~/interfaces/IsEmptyOptions';
/**
 * Checks if the length of the string is zero. undefined,null,[],NaN, and false are considered empty.
 *
 * @param {any} value Value to be validated.
 * @param {IsEmptyOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: any, options?: IsEmptyOptions) => boolean;
export default _default;
