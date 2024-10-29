import validator, {DecimalLocale} from 'validator';

/**
 * Options for decimal validation.
 * @interface
 */
export interface IsDecimalOptions {
  /**
   * Requires a decimal point if `true`. Defaults to `false`.
   */
  forceDecimal?: boolean;
  /**
   * Specifies the number of digits after the decimal point.  Can be a range (e.g., `"1,3"`),
   * a specific value (e.g., `"3"`), or a minimum value (e.g., `"1,"`). Defaults to `"1,"`.
   */
  decimalDigits?: string;
}

/**
 * Checks if a string is a decimal number.
 * @param {string} value The string to validate.
 * @param {IsDecimalOptions} options Options for decimal validation.
 * @return {boolean} `true` if the string is a valid decimal, `false` otherwise.  Examples of valid decimals: `"0.1"`, `"0.3"`, `"1.1"`, `"1.00003"`, `"4.0"`.
 */
export default (value: string, options: IsDecimalOptions = {}): boolean => {
  const mergedOptions = {
    forceDecimal: false,
    decimalDigits: '1,',
    ...options,
  };

  // Adapting options for validator.isDecimal
  const validatorOptions = {
    force_decimal: mergedOptions.forceDecimal,
    decimal_digits: mergedOptions.decimalDigits,
    locale: 'en-US' as DecimalLocale,
  };
  return validator.isDecimal(value, validatorOptions);
}