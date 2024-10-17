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
declare const _default: (value: string, options?: IsURLOptions) => boolean;
export default _default;
