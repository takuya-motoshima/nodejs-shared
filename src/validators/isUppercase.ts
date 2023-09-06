import validator from 'validator';

/**
 * Check for uppercase letters.
 *
 * @param {string} value Value to be validated.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isUppercase(value);
}