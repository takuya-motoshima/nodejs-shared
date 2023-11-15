import IsIPOptions from '~/interfaces/IsIPOptions';
/**
 * Check for IP (version 4 or 6).
 * @param {string} value Value to be validated.
 * @param {IsIPOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsIPOptions) => boolean;
export default _default;
