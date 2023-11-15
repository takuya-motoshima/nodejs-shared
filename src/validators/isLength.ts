import validator from 'validator';
import {merge} from 'deep-fusion';
import IsLengthOptions from '~/interfaces/IsLengthOptions';

/**
 * Check if the length of the string is within the range.
 * @param {string} value Value to be validated.
 * @param {IsLengthOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsLengthOptions): boolean => {
  // Initialize options.
  options = merge({
    min: 0,
    max: undefined,
  }, options);

  // Returns validation results.
  return validator.isLength(value, options);
}