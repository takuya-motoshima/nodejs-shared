/**
 * Represents the result of browser information retrieval.
 * @interface
 */
export interface BrowserInfoResult {
    /**
     * The platform of the browser (e.g., "Win32", "Linux", "MacIntel").
     * @type {string}
     */
    platform: string;
    /**
     * The operating system name (e.g., "Windows", "Linux", "macOS").
     * @type {string}
     */
    osName: string;
    /**
     * The operating system version.  May be null if unknown.
     * @type {number|null}
     */
    osVersion: number | null;
    /**
     * The name of the browser (e.g., "Chrome", "Firefox", "Safari").
     * @type {string}
     */
    browserName: string;
}
/**
 * Interface for obtaining browser-related information.
 */
export default class {
    /**
     * Parses user agent string to extract browser, OS, and platform information.
     * @example
     * import {Browser} from 'nodejs-shared';
     *
     * Browser.parse('Mozilla/5.0 (Linux; Android 9; Lenovo TB-8505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 Mobile Safari/537.36');
     * // {
     * //   platform: 'mobile',
     * //   osName: 'Android',
     * //   osVersion: 9,
     * //   browserName: 'Chrome'
     * // }
     *
     * Browser.parse('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
     * // {
     * //   platform: 'tablet',
     * //   osName: 'iOS',
     * //   osVersion: 12.2,
     * //   browserName: 'Safari'
     * // }
     * @param {string} ua User agent string.
     * @return {BrowserInfoResult} An object containing parsed browser information. Returns `null` if parsing fails.
     */
    static parse(ua: string): BrowserInfoResult | null;
}
