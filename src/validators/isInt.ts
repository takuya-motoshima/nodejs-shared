import validator from 'validator';
import {merge} from 'deep-fusion';
import IsIntOptions from '~/interfaces/IsIntOptions';

/**
 * Check if it is an integer.
 *
 * @param {string} value Value to be validated.
 * @param {IsIntOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsIntOptions): boolean => {
  // Initialize options.
  options = merge({
    allowLeadingZeroes: false,
    min: undefined,
    max: undefined,
    lt: undefined,
    gt: undefined,
  }, options);

  // NOTE: The options in validator.isFloat are referenced even if the value is invalid, such as undefined, if the key exists, so recreate the options with only keys whose values are valid and pass them to validator.isFloat.
  const newOptions = Object.keys(options as IsIntOptions).reduce((newOptions: {[key: string]: boolean|number|undefined}, key) => {
    if (options && options[key as 'allowLeadingZeroes'|'min'|'max'|'lt'|'gt'] != null)
      if (key === 'allowLeadingZeroes')
        newOptions['allow_leading_zeroes'] = options[key as 'allowLeadingZeroes'];
      else
        newOptions[key] = options[key as 'min'|'max'|'lt'|'gt'];
    return newOptions;
  }, {});

  // Returns validation results.
  return validator.isInt(value, newOptions);
}