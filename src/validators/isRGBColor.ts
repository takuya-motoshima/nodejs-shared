import validator from 'validator';
import {merge} from 'deep-fusion';
import IsRGBColorOptions from '~/interfaces/IsRGBColorOptions';

/**
 * Check if it is an RGB or RGBA color code.
 */
export default (value: string, options?: IsRGBColorOptions): boolean => {
  // Initialize options.
  options = merge({
    includePercentValues: true,
  }, options);

  // Returns validation results.
  return validator.isRgbColor(value, options?.includePercentValues);
}