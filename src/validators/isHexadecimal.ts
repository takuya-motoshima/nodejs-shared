import validator from 'validator';

/**
 * Checks if the given string is a valid hexadecimal number.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid hexadecimal number, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isHexadecimal(value);
}