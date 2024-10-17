/**
 * Options for Fully Qualified Domain Name (FQDN) validation.
 */
interface IsFQDNOptions {
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
declare const _default: (value: string, options?: IsFQDNOptions) => boolean;
export default _default;
