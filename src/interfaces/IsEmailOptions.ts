/**
 * Email address validate option.
 */
export default interface IsEmailOptions {
  /**
   * If true, the validator will also match Display Name <email-address>. Default is false.
   */
  allowDisplayName?: boolean;

  /**
   * If true, the validator will reject strings without the format Display Name <email-address>. Default is false.
   */
  requireDisplayName?: boolean;

  /**
   * If false, the validator will not allow any non-English UTF8 character in email address' local part. Default is true.
   */
  allowUtf8LocalPart?: boolean;

  /**
   * If false, email addresses without a TLD in their domain will also be matched. Default is true.
   */
  requireTld?: boolean;

  /**
   * If the domain of the input is contained in an array, the validation fails. The default is none (empty array).
   */
  hostBlacklist?: string[];

  /**
   * If the domain of the input is not contained in the array, the validation fails. The default is none (empty array).
   */
  hostWhitelist?: string[];
}