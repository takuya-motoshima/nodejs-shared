import IsDateOptions from '~/interfaces/IsDateOptions';
/**
 * Check if it is a date (e.g., 2023-09-04, 2023/9/4).
 * @param {string} value Value to be validated.
 * @param {IsDateOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsDateOptions) => boolean;
export default _default;
