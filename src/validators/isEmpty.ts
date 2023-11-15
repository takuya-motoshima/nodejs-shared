import validator from 'validator';
import {merge} from 'deep-fusion';
import IsEmptyOptions from '~/interfaces/IsEmptyOptions';

/**
 * Checks if the length of the string is zero. undefined,null,[],NaN, and false are considered empty.
 * @param {any} value Value to be validated.
 * @param {IsEmptyOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: any, options?: IsEmptyOptions): boolean => {
  // Initialize options.
  options = merge({
    ignoreWhitespace: false,
  }, options);

  // undefined,null,[],NaN are considered empty.
  if (value === null
    || value === undefined
    || (typeof value === 'number' && isNaN(value))
    || (Array.isArray(value) && value.length === 0)
    || value === false)
    return true;

  // Remove whitespace before and after a string. 
  if (options?.ignoreWhitespace && typeof value === 'string')
    value = value.replace(/^[\s　]+|[\s　]+$/g, '');

  // Returns validation results.
  return validator.isEmpty(typeof value === 'string' ? value : String(value), {
    ignore_whitespace: options?.ignoreWhitespace,
  });
}