/**
 * Options for boolean validation.
 * @interface
 */
export interface IsBooleanOptions {
    /**
     * If `false` (default), the validator strictly matches `['true', 'false', '0', '1']`.
     * If `true`, the validator also matches `'yes'`, `'no'`, and case-insensitive versions of `'true'` and `'false'` (e.g., `'True'`, `'TRUE'`).
     */
    loose?: boolean;
}
/**
 * Checks if a string represents a boolean value.
 * @param {string} value The string to validate.
 * @param {IsBooleanOptions} options Validation options.
 * @return {boolean} `true` if the string is a valid boolean representation, `false` otherwise.
 */
declare const _default: (value: string, options?: IsBooleanOptions) => boolean;
export default _default;
