import IsFQDNOptions from '~/interfaces/IsFQDNOptions';
/**
 * Check if the domain name is fully qualified (e.g. domain.com).
 *
 * @param {string} value Value to be validated.
 * @param {IsFQDNOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsFQDNOptions) => boolean;
export default _default;
