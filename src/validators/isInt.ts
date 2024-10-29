import validator from 'validator';

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
export default (value: string, options: IsIntOptions = {}): boolean => {
  const mergedOptions = {
    allowLeadingZeroes: false,
    ...options,
  };
  const validatorOptions = Object.entries(mergedOptions)
    .filter(([, v]) => v != null)
    .reduce((acc, [k, v]) => {
      // Convert allowLeadingZeroes to allow_leading_zeroes for validator compatibility.
      const adjustedKey = k === 'allowLeadingZeroes' ? 'allow_leading_zeroes' : k;
      return {...acc, [adjustedKey]: v};
    }, {});
  return validator.isInt(value, validatorOptions);
}
