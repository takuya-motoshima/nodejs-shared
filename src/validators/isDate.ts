import validator from 'validator';

/**
 * Options for date validation.
 * @interface
 */
export interface IsDateOptions {
  /**
   * Expected date format. Defaults to `YYYY/MM/DD`.
   */
  format?: string;
  /**
   * If `true`, rejects input that deviates from the specified format. Defaults to `false`.
   */
  strictMode?: boolean;
  /**
   * Allowed date separators. Defaults to `['/', '-']`.
   */
  delimiters?: string[];
}

/**
 * Checks if a string is a valid date.
 * @param {string} value The string to validate.
 * @param {IsDateOptions} options Options for date validation.
 * @return {boolean} `true` if the string is a valid date, `false` otherwise.
 */
export default (value: string, options: IsDateOptions = {}): boolean => {
  const mergedOptions = {
    format: 'YYYY/MM/DD',
    strictMode: false,
    delimiters: ['/', '-'],
    ...options,
  };
  return validator.isDate(value, mergedOptions);
}