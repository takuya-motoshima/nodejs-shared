import IsFQDNorIPOptions from '~/interfaces/IsFQDNorIPOptions';
/**
 * Check for a fully qualified domain name (e.g. domain.com) or IP (version 4 or 6).
 *
 * @param {string} value Value to be validated.
 * @param {IsFQDNorIPOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, options?: IsFQDNorIPOptions) => boolean;
export default _default;
