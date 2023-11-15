/**
 * Interface for obtaining browser-related information.
 */
export default class {
    /**
     * Analyze browser information from UA.
     * @static
     * @param {string} ua User agent string.
     * @return {{platform: string, osName: string, osVersion: number|null, browserName: string}} Analysis Results.
     */
    static parse(ua: string): {
        platform: string;
        osName: string;
        osVersion: number | null;
        browserName: string;
    };
}
