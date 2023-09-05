import validator from 'validator';
import {merge} from 'deep-fusion';
import IsDecimalOptions from '~/interfaces/IsDecimalOptions';

/**
 * Check if it is a decimal number. For example, 0.1, 0.3, 1.1, 1.00003, 4.0.
 */
export default (value: string, options?: IsDecimalOptions): boolean => {
  // Initialize options.
  options = merge({
    forceDecimal: false,
    decimalDigits: '1,',
  }, options);

  // Returns validation results.
  return validator.isDecimal(value, {
    force_decimal: options?.forceDecimal,
    decimal_digits: options?.decimalDigits,
    locale: 'en-US',
  });
}