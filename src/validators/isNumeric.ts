import validator from 'validator';
import {merge} from 'deep-fusion';
import IsNumericOptions from '~/interfaces/IsNumericOptions';

/**
 * Check if it contains only numbers.
 *
 * @param {string} value Value to be validated.
 * @param {IsNumericOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsNumericOptions): boolean => {
  // Initialize options.
  options = merge({
    noSymbols: false,
  }, options);

  // Returns validation results.
  return validator.isNumeric(value, {
    no_symbols: options?.noSymbols,
  });
}