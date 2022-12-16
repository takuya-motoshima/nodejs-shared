/**
 * Utility class for handling regular expressions.
 */
export default class {
    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|" in `string`.
     *
     * @static
     * @param {string} str String.
     * @param {{[key: string]: string}} replace? Custom replacement characters. The default is none (undefined).
     * @return {string} Escaped string.
     * @example
     * // Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|" in `string`.
     * Regex.escape('https://example.jp/?tag=TypeScript');// 'https://example\\.jp/\\?tag=TypeScript'
     *
     * // When using your own wildcard, you can follow the metacharacters with the regular expression wildcard.
     * var strRegex = Regex.escape('https://example.jp?tag=*', {'*': '.*?'});
     * var regex = new RegExp(strRegex);
     * regex.test('https://example.jp?tag=TypeScript');// true
     * regex.test('https://example.jp?tag=JavaScript');// true
     * regex.test('https://example.jp?name=JavaScript');// false
     */
    static escape(str: string, replace?: {
        [key: string]: string;
    }): string;
}
