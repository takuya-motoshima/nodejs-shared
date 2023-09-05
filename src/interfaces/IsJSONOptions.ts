/**
 * JSON validate option.
 */
export default interface IsJSONOptions {
  /**
   * If true, the primitives 'true', 'false' and 'null' are accepted as valid JSON values. Default is false.
   */
  allowPrimitives?: boolean;
}