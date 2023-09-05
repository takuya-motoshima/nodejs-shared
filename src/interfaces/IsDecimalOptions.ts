/**
 * Decimal validate option.
 */
export default interface IsDecimalOptions {
  /**
   * If true, the decimal point is required. Default is false.
   */
  forceDecimal?: boolean;

  /**
   * The number of digits after the decimal point. Can be a range, such as "1,3", a specific value, such as "3", or a minimum value, such as "1,". Default is "1,".
   */
  decimalDigits?: string;
}