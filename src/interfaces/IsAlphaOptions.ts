/**
 * Alphabet validate option.
 */
export default interface IsAlphaOptions {
  /**
   * String to ignore, or RegExp, e.g. if the option is "-" then spaces and hyphens in the input value will not cause an input error.
   */
  ignore?: string|RegExp;
}