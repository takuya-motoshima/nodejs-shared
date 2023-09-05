import validator from 'validator';

/**
 * Check if it is a hexadecimal number.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isHexadecimal(value);
}