import Bowser, {Parser} from 'bowser';

interface BrowserInfoResult {
  platform: string;
  osName: string;
  osVersion: number|null;
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
  public static parse(ua: string): BrowserInfoResult|null {
    try {
      const parser: Parser.Parser = Bowser.getParser(ua);
      const platform = parser.getPlatformType();
      const browserName = parser.getBrowserName();
      let osName = parser.getOSName();  // Get full OS name including version if any
      // let osName = parser.getOSName(true);  // Get full OS name including version if any
      let osVersion: number|null = null;
      const osVersionString = parser.getOSVersion();
      if (osVersionString) {
        const versionNumber = parseFloat(osVersionString);
        osVersion = isNaN(versionNumber) ? null : versionNumber;
      }
      return {
        platform,
        osName,
        osVersion,
        browserName,
      };
    } catch (error) {
      // Handle parsing errors, maybe log them
      console.error("Error parsing UA:", error)
      return null; // Return null to indicate parsing failure
    }
  }
}