import validator from 'validator';

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
export default (value: string, options: IsFloatOptions = {}): boolean => {
  // Filter out null or undefined options to prevent issues with validator.isFloat
  const validatorOptions = Object.entries(options)
    .filter(([, v]) => v != null) // Removing entries where the value is null or undefined
    .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
  return validator.isFloat(value, validatorOptions);
}