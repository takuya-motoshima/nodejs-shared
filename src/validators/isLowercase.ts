import validator from 'validator';

/**
 * Checks if the given string contains only lowercase characters.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string contains only lowercase characters, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isLowercase(value);
}