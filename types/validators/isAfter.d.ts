/**
 * Checks if the given date string is after the comparison date.
 * @param {string} value The date string to validate.  Must be in a format understood by `validator.isAfter`.
 * @param {string} comparisonDate The date string to compare against.  Must be in a format understood by `validator.isAfter`. Defaults to the current date in ISO 8601 format.
 * @return {boolean} True if the value is after the comparison date, false otherwise.
 */
declare const _default: (value: string, comparisonDate?: string) => boolean;
export default _default;
