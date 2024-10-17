import validator from 'validator';

/**
 * Options for numeric string validation.
 * @interface
 */
export interface IsNumericOptions {
  /**
   * Rejects strings containing symbols (`+`, `-`, `.`) if `true`. Defaults to `false`.
   */
  noSymbols?: boolean;
}

/**
 * Checks if a string contains only numeric characters.
 * @param {string} value The string to validate.
 * @param {IsNumericOptions} options Options for numeric validation.
 * @return {boolean} `true` if the string contains only numeric characters, `false` otherwise.
 */
export default (value: string, options: IsNumericOptions = {}): boolean => {
  return validator.isNumeric(value, {no_symbols: options.noSymbols});
}