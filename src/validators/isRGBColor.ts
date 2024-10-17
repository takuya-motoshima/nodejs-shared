import validator from 'validator';

/**
 * Options for RGB color validation.
 */
interface IsRGBColorOptions {
  /**
   * Allows percentage values (e.g., `rgb(5%, 5%, 5%)`) if `true`. Defaults to `true`.
   */
  includePercentValues?: boolean;
}

/**
 * Checks if a string is a valid RGB or RGBA color code.
 * @param {string} value The string to validate.
 * @param {IsRGBColorOptions} options Options for RGB color validation.
 * @return {boolean} `true` if the string is a valid RGB/RGBA color, `false` otherwise.  Examples: `"rgb(0, 0, 0)"`, `"rgba(0, 0, 0, 0.5)"`, `"rgb(5%, 5%, 5%)"` (if `includePercentValues` is `true`).
 */
export default (value: string, options: IsRGBColorOptions = {includePercentValues: true}): boolean => {
  return validator.isRgbColor(value, options.includePercentValues);
}