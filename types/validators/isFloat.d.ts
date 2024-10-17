/**
 * Options for float validation.
 * @interface
 */
export interface IsFloatOptions {
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
 * Checks if a string is a float.
 * @param {string} value The string to validate.
 * @param {IsFloatOptions} options Validation options.
 * @return {boolean} `true` if the string is a valid float, `false` otherwise.
 */
declare const _default: (value: string, options?: IsFloatOptions) => boolean;
export default _default;
