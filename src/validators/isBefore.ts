import validator from 'validator';

/**
 * Check if it is an before date.
 */
export default (value: string, comparisonDate?: string): boolean => {
  // Returns validation results.
  return validator.isBefore(value, comparisonDate);
}