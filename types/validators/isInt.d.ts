/**
 * Options for integer validation.
 * @interface
 */
export interface IsIntOptions {
    /**
     * Allows leading zeros if `true`. Defaults to `false`.
     */
    allowLeadingZeroes?: boolean;
    /**
     * Minimum value (inclusive).
     */
    min?: number;
    /**
     * Maximum value (inclusive).
     */
    max?: number;
    /**
     * Value must be less than this.
     */
    lt?: number;
    /**
     * Value must be greater than this.
     */
    gt?: number;
}
/**
 * Checks if a string is an integer.
 * @param {string} value The string to validate.
 * @param {IsIntOptions} options Options for integer validation.
 * @return {boolean} `true` if the string is a valid integer, `false` otherwise.
 */
declare const _default: (value: string, options?: IsIntOptions) => boolean;
export default _default;
