import validator from 'validator';

/**
 * Check if the input value is in an array value, string, or object key
 */
export default (value: string, values: any[]|string|object): boolean => {
  // Returns validation results.
  return validator.isIn(value, values as any);
}