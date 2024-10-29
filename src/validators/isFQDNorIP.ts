import isFQDN from '~/validators/isFQDN';
import isIP from '~/validators/isIP';

/**
 * Options for FQDN or IP address validation.
 * @interface
 */
export interface IsFQDNorIPOptions {
  /**
   * Requires a Top-Level Domain (TLD) if `true` (FQDN only). Defaults to `true`.
   */
  requireTld?: boolean;
  /**
   * Allows wildcard domains (e.g., `*.example.com`) if `true` (FQDN only). Defaults to `false`.
   */
  allowWildcard?: boolean;
  /**
   * IP version to check.  `4`, `6`, `"4"`, or `"6"`.  Defaults to `undefined` (allows both versions).
   */
  version?: '4'|'6'|4|6;
  /**
   * Allows IP range input (e.g., `127.0.0.1/24`, `2001::/128`) if `true` (IP only). Defaults to `false`.
   */
  allowRange?: boolean;
}

/**
 * Checks if a string is a valid Fully Qualified Domain Name (FQDN) or IP address (v4 or v6).
 * @param {string} value The string to validate.
 * @param {IsFQDNorIPOptions} options Options for validation.
 * @return {boolean} `true` if the string is a valid FQDN or IP address, `false` otherwise.
 */
export default  (value: string, options: IsFQDNorIPOptions = {}): boolean => {
  const mergedOptions = {
    requireTld: true,
    allowWildcard: false,
    allowRange: false,
    ...options,
  };

  const fqdnOptions = {
    requireTld: mergedOptions.requireTld,
    allowWildcard: mergedOptions.allowWildcard,
  };
  const ipOptions = {
    version: mergedOptions.version,
    allowRange: mergedOptions.allowRange,
  };
  return isFQDN(value, fqdnOptions) || isIP(value, ipOptions);
}