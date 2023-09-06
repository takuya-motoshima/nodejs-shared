import IsDecimalOptions from '~/interfaces/IsDecimalOptions';
/**
 * Check if it is a decimal number. For example, 0.1, 0.3, 1.1, 1.00003, 4.0.
 *
 * @param {string} value Value to be validated.
 * @param {IsDecimalOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsDecimalOptions) => boolean;
export default _default;
