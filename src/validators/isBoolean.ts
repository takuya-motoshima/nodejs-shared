import validator from 'validator';
import {merge} from 'deep-fusion';
import IsBooleanOptions from '~/interfaces/IsBooleanOptions';

/**
 * Check if it is a boolean value.
 * @param {string} value Value to be validated.
 * @param {IsBooleanOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsBooleanOptions): boolean => {
  // Initialize options.
  options = merge({
    loose: false,
  }, options);

  // Returns validation results.
  return validator.isBoolean(value, options);
}