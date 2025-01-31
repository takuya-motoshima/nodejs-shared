/**
 * Options for IP address validation.
 * @interface
 */
export interface IsIPOptions {
    /**
     * IP version to check (`4`, `6`, `"4"`, or `"6"`). Defaults to `undefined` (allows both versions).
     */
    version?: 4 | 6 | '4' | '6';
    /**
     * Allows IP range input (e.g., "127.0.0.1/24", "2001::/128") if `true`. Defaults to `false`.
     */
    allowRange?: boolean;
}
/**
 * Checks if a string is a valid IP address (v4 or v6).
 * @param {string} value The string to validate.
 * @param {IsIPOptions} options Options for IP address validation.
 * @return {boolean} `true` if the string is a valid IP address (or IP range if allowed), `false` otherwise.
 */
declare const _default: (value: string, options?: IsIPOptions) => boolean;
export default _default;
