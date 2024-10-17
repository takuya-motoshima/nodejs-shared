/**
 * Utility class for handling regular expressions.
 */
export default class {
    /**
     * Escapes RegExp special characters in a string.
     * @example
     * import {Regex} from 'nodejs-shared';
     *
     * Regex.escape('//example.com/?lang=english');// //example\\.com/\\?lang=english
     * @param {string} str The string to escape.
     * @param {Record<string, string>|undefined} replace A map of custom replacement characters.
     * @return {string} The escaped string.
     */
    static escape(str: string, replace?: Record<string, string>): string;
}
