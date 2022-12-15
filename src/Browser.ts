import Bowser from 'bowser';

/**
 * Interface for obtaining browser-related information.
 */
export default class {
  /**
   * Analyze browser information from UA.
   *
   * @static
   * @param {string} ua User agent string.
   * @return {{platform: string, osName: string, osVersion: number|null, browserName: string}} Analysis Results.
   */
  public static parse(ua: string): {platform: string, osName: string, osVersion: number|null, browserName: string} {
    const parser = Bowser.getParser(ua);
    const platform = parser.getPlatformType();
    const browserName = parser.getBrowserName();
    let osName = parser.getOSName();
    let osVersion: string|number|null = parser.getOSVersion();
    const matched = osVersion.match(/^([A-Za-z]+)\s+([\d.]+)$/);
    if (matched) {
      osName += ` ${matched[1]}`;
      osVersion = matched[2];
    }
    osVersion = <number>parseFloat(osVersion);
    if(isNaN(osVersion))
      osVersion = null;
    return {
      platform,
      osName,
      osVersion,
      browserName
    };
  }
}