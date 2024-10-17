import validator from 'validator';

/**
 * Options for Fully Qualified Domain Name (FQDN) validation.
 * @interface
 */
export interface IsFQDNOptions {
  /**
   * Requires a Top-Level Domain (TLD) if `true`. Defaults to `true`.
   */
  requireTld?: boolean;
  /**
   * Allows wildcard domains (e.g., `*.example.com`) if `true`. Defaults to `false`.
   */
  allowWildcard?: boolean;
}

/**
 * Checks if a string is a Fully Qualified Domain Name (FQDN).
 * @param {string} value The string to validate.
 * @param {IsFQDNOptions} options Options for FQDN validation.
 * @return {boolean} `true` if the string is a valid FQDN, `false` otherwise.  Examples of valid FQDNs: `"domain.com"`, `"subdomain.domain.com"`.
 */
export default (value: string, options: IsFQDNOptions = {
  requireTld: true,
  allowWildcard: false,
}): boolean => {
  const validatorOptions = {
    require_tld: options.requireTld,
    allow_underscores: false, // Fixed to false as per original code
    allow_trailing_dot: false, // Fixed to false as per original code
    allow_numeric_tld: false, // Fixed to false as per original code
    allow_wildcard: options.allowWildcard,
  }
  return validator.isFQDN(value, validatorOptions);
}