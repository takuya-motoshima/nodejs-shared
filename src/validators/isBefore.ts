import validator from 'validator';

/**
 * Checks if the given date string is before the comparison date.
 * @param {string} value The date string to validate. Must be in a format understood by `validator.isBefore`.
 * @param {string} comparisonDate The date string to compare against. Must be in a format understood by `validator.isBefore`. Defaults to the current date in ISO 8601 format.
 * @return {boolean} True if the value is before the comparison date, false otherwise.
 */
export default (value: string, comparisonDate: string = Date().toString()): boolean => {
  return validator.isBefore(value, comparisonDate);
}