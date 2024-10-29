import validator from 'validator';

/**
 * Options for URL validation.
 * @interface
 */
export interface IsURLOptions {
  /**
   * Requires a Top-Level Domain (TLD) if `true`. Defaults to `true`.
   */
  requireTld?: boolean;
  /**
   * Allows wildcard domains (e.g., `*.example.com`) if `true`. Defaults to `false`.
   */
  allowWildcard?: boolean;
  /**
   * Allows URL fragments (e.g., `#fragment`) if `true`. Defaults to `false`.
   */
  allowFragments?: boolean;
  /**
   * Allows query components (e.g., `?query=value`) if `true`. Defaults to `false`.
   */
  allowQueryComponents?: boolean;
}

/**
 * Checks if a string is a valid URL.
 * @param {string} value The string to validate.
 * @param {IsURLOptions} options Options for URL validation.
 * @return {boolean} `true` if the string is a valid URL, `false` otherwise.
 */
export default  (value: string, options: IsURLOptions = {}): boolean => {
  const mergedOptions = {
    requireTld: true,
    allowWildcard: false,
    allowFragments: false,
    allowQueryComponents: false,
    ...options,
  };
  const validatorOptions = {
    protocols: ['https', 'http'],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    require_port: false,
    require_tld: mergedOptions.requireTld,
    allow_wildcard: mergedOptions.allowWildcard,
    allow_fragments: mergedOptions.allowFragments,
    allow_query_components: mergedOptions.allowQueryComponents,
  };
  return validator.isURL(value, validatorOptions);
}