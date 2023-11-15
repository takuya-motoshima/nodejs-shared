import validator from 'validator';

/**
 * Check if it is a hexadecimal number.
 * @param {string} value Value to be validated.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isHexadecimal(value);
}