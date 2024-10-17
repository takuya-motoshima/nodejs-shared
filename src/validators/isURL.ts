import validator from 'validator';

/**
 * Options for URL validation.
 */
interface IsURLOptions {
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
export default  (value: string, options: IsURLOptions = {
  requireTld: true,
  allowWildcard: false,
  allowFragments: false,
  allowQueryComponents: false,
}): boolean => {
  const validatorOptions = {
    protocols: ['https', 'http'],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    require_port: false,
    require_tld: options.requireTld,
    allow_wildcard: options.allowWildcard,
    allow_fragments: options.allowFragments,
    allow_query_components: options.allowQueryComponents,
  };
  return validator.isURL(value, validatorOptions);
}