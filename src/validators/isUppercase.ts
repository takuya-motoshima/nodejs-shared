import validator from 'validator';

/**
 * Check for uppercase letters.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isUppercase(value);
}