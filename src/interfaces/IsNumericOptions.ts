/**
 * Numeric validate option.
 */
export default interface IsNumericOptions {
  /**
    * If true, rejects numeric strings containing symbols (`+`, `-`, `. `). Default is false.
    */
  noSymbols?: boolean | undefined;
}