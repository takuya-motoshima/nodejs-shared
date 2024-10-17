import validator from 'validator';

/**
 * Options for alphabetic validation.
 */
interface IsAlphaOptions {
  /**
   * Characters or patterns to ignore during validation. If a string is provided, those specific characters will be ignored.
   * If a RegExp is provided, matching patterns will be ignored.  For example, if `ignore` is `"-"` then spaces and hyphens
   * in the input value will not be considered during validation.  If a RegExp is provided, it should match the characters
   * to be *ignored*, not the alphabetic characters themselves.
   */
  ignore?: string|RegExp;
}

/**
 * Checks if a string is alphabetic (a-zA-Z), optionally ignoring specified characters.
 * @param {string} value The string to validate.
 * @param {IsAlphaOptions} options Validation options, including characters to ignore.
 * @return {boolean} `true` if the string is alphabetic (or contains only ignored characters), `false` otherwise.
 */
export default (value: string, options: IsAlphaOptions = {}): boolean => {
  return validator.isAlpha(value, 'en-US', options);
};
