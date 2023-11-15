import validator from 'validator';

/**
 * Check if the data URI format.
 * @param {string} value Value to be validated.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isDataURI(value);
}