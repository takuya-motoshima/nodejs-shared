import validator from 'validator';
import {merge} from 'deep-fusion';
import IsFloatOptions from '~/interfaces/IsFloatOptions';

/**
 * Check if float.
 * @param {string} value Value to be validated.
 * @param {IsFloatOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsFloatOptions): boolean => {
  // Initialize options.
  options = merge({
    min: undefined,
    max: undefined,
    lt: undefined,
    gt: undefined,
  }, options);

  // NOTE: The options in validator.isFloat are referenced even if the value is invalid, such as undefined, if the key exists, so recreate the options with only keys whose values are valid and pass them to validator.isFloat.
  const newOptions = Object.keys(options as IsFloatOptions).reduce((newOptions: {[key: string]: number|undefined}, key) => {
    if (options && options[key as 'min'|'max'|'lt'|'gt'] != null)
      newOptions[key] = options[key as 'min'|'max'|'lt'|'gt'];
    return newOptions;
  }, {});

  // Returns validation results.
  return validator.isFloat(value, newOptions);
}