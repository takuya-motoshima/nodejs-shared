/**
 * Date validate option.
 */
export default interface IsDateOptions {
  /**
   * Date Format. Defaults to YYYY/MM/DD.
   */
  format?: string;

  /**
   * If set to true, the validator will reject input that differs from the format. Default is false.
   */
  strictMode?: boolean;

  /**
   * An array of available date separators. Default is ['/', '-'].
   */
  delimiters?: string[];
}