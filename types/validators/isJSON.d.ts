import IsJSONOptions from '~/interfaces/IsJSONOptions';
/**
 * Check for valid JSON (using JSON.parse).
 *
 * @param {string} value Value to be validated.
 * @param {IsJSONOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsJSONOptions) => boolean;
export default _default;
