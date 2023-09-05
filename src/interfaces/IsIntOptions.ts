/**
 * Integer validate option.
 */
export default interface IsIntOptions {
  /**
   * To check the integer min boundary. The default is none (undefined).
   */
  min?: number;

  /**
   * To check the integer max boundary. The default is none (undefined).
   */
  max?: number;

  /**
   * If false, integers containing leading zeros are not permitted. Default is false.
   */
  allowLeadingZeroes?: boolean;

  /**
   * Enforce integers being greater than the value provided. The default is none (undefined).
   */
  lt?: number;

  /**
   * Enforce integers being less than the value provided. The default is none (undefined).
   */
  gt?: number;
}