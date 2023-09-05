import validator from 'validator';

/**
 * Check for lowercase letters.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isLowercase(value);
}