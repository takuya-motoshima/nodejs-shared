import validator from 'validator';
import {merge} from 'deep-fusion';
import IsDateOptions from '~/interfaces/IsDateOptions';

/**
 * Check if it is a date (e.g., 2023-09-04, 2023/9/4).
 *
 * @param {string} value Value to be validated.
 * @param {IsDateOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsDateOptions): boolean => {
  // Initialize options.
  options = merge({
    format: 'YYYY/MM/DD',
    strictMode: false,
    delimiters: ['/', '-'],
  }, options);

  // Returns validation results.
  return validator.isDate(value, options);
}