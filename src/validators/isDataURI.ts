import validator from 'validator';

/**
 * Check if the data URI format.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isDataURI(value);
}