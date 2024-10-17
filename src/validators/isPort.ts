import validator from 'validator';

/**
 * Checks if the given string is a valid port number.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid port number, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isPort(value);
}