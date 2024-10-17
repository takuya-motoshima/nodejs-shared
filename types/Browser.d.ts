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
     * @param {string} ua User agent string.
     * @return {BrowserInfoResult} An object containing parsed browser information. Returns `null` if parsing fails.
     */
    static parse(ua: string): BrowserInfoResult | null;
}
