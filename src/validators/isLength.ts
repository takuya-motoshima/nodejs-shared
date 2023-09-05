import validator from 'validator';
import {merge} from 'deep-fusion';
import IsLengthOptions from '~/interfaces/IsLengthOptions';

/**
 * Check if the length of the string is within the range.
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