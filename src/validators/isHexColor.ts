import validator from 'validator';

/**
 * Checks if the given string is a valid hexadecimal color code.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid hexadecimal color code, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isHexColor(value);
}