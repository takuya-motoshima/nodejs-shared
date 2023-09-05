import validator from 'validator';
import {merge} from 'deep-fusion';
import IsIntOptions from '~/interfaces/IsIntOptions';

/**
 * Check if it is an integer.
 */
export default (value: string, options?: IsIntOptions): boolean => {
  // Initialize options.
  options = merge({
    min: undefined,
    max: undefined,
    allowLeadingZeroes: false,
    lt: undefined,
    gt: undefined,
  }, options);

  // Returns validation results.
  return validator.isInt(value, {
    min: options?.min,
    max: options?.max,
    allow_leading_zeroes: options?.allowLeadingZeroes,
    lt: options?.lt,
    gt: options?.gt,
  });
}