import validator from 'validator';

/**
 * Check if it is an before date.
 *
 * @param {string} value Value to be validated.
 * @param {string} comparisonDate Date to compare to. Defaults to Date().toString() (now).
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, comparisonDate?: string): boolean => {
  // Returns validation results.
  return validator.isBefore(value, comparisonDate);
}