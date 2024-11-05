/**
 * Checks if the given string is a valid UUID (Universally Unique Identifier).
 * @param {string} value The string to validate.
 * @param {'1'|'2'|'3'|'4'|'5'|'all'|1|2|3|4|5} version The UUID version to check against (1, 2, 3, 4, 5, 'all', null, or undefined). Defaults to 'all'.
 * @return {boolean} True if the string is a valid UUID, false otherwise.
 */
declare const _default: (value: string, version?: "1" | "2" | "3" | "4" | "5" | "all" | 1 | 2 | 3 | 4 | 5) => boolean;
export default _default;
