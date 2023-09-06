import validator from 'validator';
import {merge} from 'deep-fusion';
import IsAlphaOptions from '~/interfaces/IsAlphaOptions';

/**
 * Check if it is alphabetical (a-zA-Z).
 *
 * @param {string} value Value to be validated.
 * @param {IsAlphaOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsAlphaOptions): boolean => {
  // Initialize options.
  options = merge({
    ignore: undefined,
  }, options);

  // Returns validation results.
  return validator.isAlpha(value, 'en-US', options);
}