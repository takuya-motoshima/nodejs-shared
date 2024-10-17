interface BrowserInfoResult {
    platform: string;
    osName: string;
    osVersion: number | null;
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
export {};
