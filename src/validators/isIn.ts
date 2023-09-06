import validator from 'validator';

/**
 * Check if the input value is in an array value, string, or object key.
 *
 * @param {string} value Value to be validated.
 * @param {any[]|string|object} values Allowed values.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, values: any[]|string|object): boolean => {
  // Returns validation results.
  return validator.isIn(value, values as any);
}