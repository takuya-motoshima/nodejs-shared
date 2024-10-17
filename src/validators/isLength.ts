import validator from 'validator';

/**
 * Options for string length validation.
 */
interface IsLengthOptions {
  /**
   * Minimum length. Defaults to 0.
   */
  min?: number;
  /**
   * Maximum length.
   */
  max?: number;
}

/**
 * Checks if the length of a string falls within a specified range.
 * @param {string} value The string to validate.
 * @param {IsLengthOptions} options Options for length validation.
 * @return {boolean} `true` if the string's length is within the range, `false` otherwise.
 */
export default  (value: string, options: IsLengthOptions = {min: 0}): boolean => {
  return validator.isLength(value, options);
}