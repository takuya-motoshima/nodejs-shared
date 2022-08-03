/**
 * Interface for obtaining browser-related information.
 */
export default class {
    /**
     * Analyze browser information from UA.
     */
    static parse(ua: string): {
        platform: string;
        osName: string;
        osVersion: number | null;
        browserName: string;
    };
}
