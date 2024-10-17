import validator from 'validator';

/**
 * Checks if the given string is a valid HSL color according to the CSS Colors Level 4 specification.
 * Supports comma-separated and space-separated formats, with the exception of some edge cases (e.g., "hsl(200grad+.1%62%/1)").
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid HSL color, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isHSL(value);
}