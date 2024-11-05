/**
 * Options for numeric string validation.
 * @interface
 */
export interface IsNumericOptions {
    /**
     * Rejects strings containing symbols (`+`, `-`, `.`) if `true`. Defaults to `false`.
     */
    noSymbols?: boolean;
}
/**
 * Checks if a string contains only numeric characters.
 * @param {string} value The string to validate.
 * @param {IsNumericOptions} options Options for numeric validation.
 * @return {boolean} `true` if the string contains only numeric characters, `false` otherwise.
 */
declare const _default: (value: string, options?: IsNumericOptions) => boolean;
export default _default;
