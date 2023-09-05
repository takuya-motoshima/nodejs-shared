import validator from 'validator';

/**
 * Check if it is a hexadecimal color code.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isHexColor(value);
}