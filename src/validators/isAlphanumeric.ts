import validator from 'validator';
import {merge} from 'deep-fusion';
import IsAlphanumericOptions from '~/interfaces/IsAlphanumericOptions';

/**
 * Check if alphanumeric (a-zA-Z0-9).
 */
export default (value: string, options?: IsAlphanumericOptions): boolean => {
  // Initialize options.
  options = merge({
    ignore: undefined,
  }, options);

  // Returns validation results.
  return validator.isAlphanumeric(value, 'en-US', options);
}