import validator from 'validator';

/**
 * Options for emptiness validation.
 */
interface IsEmptyOptions {
  /**
   * Ignores leading/trailing whitespace if `true`. Defaults to `false`.
   */
  ignoreWhitespace?: boolean;
}

/**
 * Checks if a value is empty.  Considers `null`, `undefined`, `NaN`, empty arrays (`[]`), and `false` as empty.  Optionally ignores leading/trailing whitespace for strings.
 * @param {string} value The value to check.
 * @param {IsEmptyOptions} options Options for emptiness validation.
 * @return {boolean} `true` if the value is empty, `false` otherwise.
 */
export default (value: any, options: IsEmptyOptions = {ignoreWhitespace: false}): boolean => {
  // Handle special cases: null, undefined, NaN, empty arrays, and false.
  if (value === null || value === undefined || (typeof value === 'number' && isNaN(value)) || (Array.isArray(value) && value.length === 0) || value === false)
    return true;

  // Remove whitespace if ignoreWhitespace is true.
  const stringValue = typeof value === 'string' ? value : String(value);
  const trimmedValue = options.ignoreWhitespace ? stringValue.trim() : stringValue;
  return validator.isEmpty(trimmedValue, {ignore_whitespace: options.ignoreWhitespace});
}