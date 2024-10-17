import validator from 'validator';

/**
 * Checks if the given string contains only uppercase characters.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string contains only uppercase characters, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isUppercase(value);
}