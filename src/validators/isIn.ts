import validator from 'validator';

/**
 * Checks if the given value is present in the provided array, string, or object keys.
 * @param {string} value The value to search for.
 * @param {any[]|string|object} values The allowed values to check against.  If a string is provided, it is checked against individual characters. If an object is provided, its keys are used for comparison.
 * @return {boolean} True if the value is found, false otherwise.
 */
export default (value: string, values: any[]|string|object): boolean => {
  return validator.isIn(value, values as any);
}