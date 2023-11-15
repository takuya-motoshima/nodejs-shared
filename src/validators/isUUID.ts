import validator from 'validator';

/**
 * Check if it is a UUID (version 1, 2, 3, 4, or 5).
 * @param {string} value Value to be validated.
 * @param {'1'|'2'|'3'|'4'|'5'|'all'|1|2|3|4|5} version? UUID Version. Default is all.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, version: '1'|'2'|'3'|'4'|'5'|'all'|1|2|3|4|5 = 'all'): boolean => {
  // Returns validation results.
  return validator.isUUID(value, version);
}