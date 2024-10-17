import validator from 'validator';

/**
 * Options for IP address validation.
 */
interface IsIPOptions {
  /**
   * IP version to check (`4`, `6`, `"4"`, or `"6"`). Defaults to `undefined` (allows both versions).
   */
  version?: 4|6|'4'|'6';
  /**
   * Allows IP range input (e.g., "127.0.0.1/24", "2001::/128") if `true`. Defaults to `false`.
   */
  allowRange?: boolean;
}

/**
 * Checks if a string is a valid IP address (v4 or v6).
 * @param {string} value The string to validate.
 * @param {IsIPOptions} options Options for IP address validation.
 * @return {boolean} `true` if the string is a valid IP address (or IP range if allowed), `false` otherwise.
 */
export default  (value: string, options: IsIPOptions = {allowRange: false}): boolean => {
  const {version, allowRange} = options;
  if (!allowRange)
    return validator.isIP(value, version);
  return validator.isIP(value, version) || validator.isIPRange(value, version);
}