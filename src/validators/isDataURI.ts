import validator from 'validator';

/**
 * Checks if the given string is a valid Data URI.  A Data URI is a string that encodes data (typically an image) in a URL-safe format.
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid Data URI, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isDataURI(value);
}