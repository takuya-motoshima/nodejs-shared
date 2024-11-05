/**
 * Options for JSON validation.
 * @interface
 */
export interface IsJSONOptions {
    /**
     * Accepts primitive JSON values (`true`, `false`, `null`) if `true`. Defaults to `false`.
     */
    allowPrimitives?: boolean;
}
/**
 * Checks if a string is valid JSON.
 * @param {string} value The string to validate.
 * @param {IsJSONOptions} options Options for JSON validation.
 * @return {boolean} `true` if the string is valid JSON, `false` otherwise.
 */
declare const _default: (value: string, options?: IsJSONOptions) => boolean;
export default _default;
