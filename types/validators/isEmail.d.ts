/**
 * Options for email validation.
 */
interface IsEmailOptions {
    /**
     * Allows "Display Name <email-address>" format if `true`. Defaults to `false`.
     */
    allowDisplayName?: boolean;
    /**
     * Requires "Display Name <email-address>" format if `true`. Defaults to `false`.
     */
    requireDisplayName?: boolean;
    /**
     * Allows non-English UTF8 characters in the local part of the email address if `true`. Defaults to `true`.
     */
    allowUtf8LocalPart?: boolean;
    /**
     * Requires a TLD in the domain if `true`. Defaults to `true`.
     */
    requireTld?: boolean;
    /**
     * Rejects emails with domains in this blacklist. Defaults to an empty array.
     */
    hostBlacklist?: string[];
    /**
     * Rejects emails with domains not in this whitelist. Defaults to an empty array.
     */
    hostWhitelist?: string[];
}
/**
 * Checks if a string is a valid email address.
 * @param {string} value The string to validate.
 * @param {IsEmailOptions} options Options for email validation.
 * @return {boolean} `true` if the string is a valid email, `false` otherwise.
 */
declare const _default: (value: string, options?: IsEmailOptions) => boolean;
export default _default;
