/**
 * Utility class for handling regular expressions.
 */
export default class {
    /**
     * Escapes RegExp special characters in a string.
     * @param {string} str The string to escape.
     * @param {Record<string, string>|undefined} replace A map of custom replacement characters.
     * @return {string} The escaped string.
     * @example
     * // Escapes RegExp special characters.
     * Regex.escape('https://example.jp/?tag=TypeScript'); // 'https://example\\.jp/\\?tag=TypeScript'
     *
     * // Using custom wildcards.
     * const strRegex = Regex.escape('https://example.jp?tag=*', {'*': '.*?'});
     * const regex = new RegExp(strRegex);
     * regex.test('https://example.jp?tag=TypeScript'); // true
     * regex.test('https://example.jp?tag=JavaScript'); // true
     * regex.test('https://example.jp?name=JavaScript'); // false
     */
    static escape(str: string, replace?: Record<string, string>): string;
}
