import validator from 'validator';

/**
 * Check if the color is an HSL color based on the CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isHSL(value);
}