/**
 * Options for emptiness validation.
 */
interface IsEmptyOptions {
    /**
     * Ignores leading/trailing whitespace if `true`. Defaults to `false`.
     */
    ignoreWhitespace?: boolean;
}
/**
 * Checks if a value is empty.  Considers `null`, `undefined`, `NaN`, empty arrays (`[]`), and `false` as empty.  Optionally ignores leading/trailing whitespace for strings.
 * @param {string} value The value to check.
 * @param {IsEmptyOptions} options Options for emptiness validation.
 * @return {boolean} `true` if the value is empty, `false` otherwise.
 */
declare const _default: (value: any, options?: IsEmptyOptions) => boolean;
export default _default;
